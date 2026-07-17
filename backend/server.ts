import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import { OCRService } from './src/services/OCRService.js';
import { ClassificationService } from './src/services/ClassificationService.js';
import { ExtractionService } from './src/services/ExtractionService.js';
import { RuleEngineService } from './src/services/RuleEngineService.js';
import { SummaryService } from './src/services/SummaryService.js';
import { TimelineService } from './src/services/TimelineService.js';
import { DocumentStore } from './src/storage/DocumentStore.js';
import fs from 'fs/promises';
import crypto from 'crypto';
import type { Document } from './src/types/document.js';

dotenv.config({ override: true });

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/api/ocr', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No document uploaded' });
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    const originalName = req.file.originalname;
    const fileSize = req.file.size;

    console.log(`Processing started for file: ${originalName} (${mimeType}, ${fileSize} bytes)`);

    // Generate SHA-256 hash for caching
    const fileHash = await DocumentStore.calculateHash(filePath);

    // Check cache
    const cachedDoc = DocumentStore.getCachedDocument(fileHash);
    if (cachedDoc) {
      console.log('\nGemini OCR\n\nCache HIT\n\nNo API request performed.\n');
      
      let classification = cachedDoc.classification;
      if (!classification) {
          classification = await ClassificationService.performClassification(cachedDoc.ocr.rawText, cachedDoc.id);
          cachedDoc.classification = classification;
      } else {
          console.log('\nClassification\n\nCache HIT\n\nNo AI request performed.\n');
      }

      let extraction = cachedDoc.extraction;
      if (!extraction) {
          extraction = await ExtractionService.performExtraction(cachedDoc.ocr.rawText, cachedDoc.id, classification?.type) || undefined;
          if (extraction) {
              cachedDoc.extraction = extraction;
          }
      } else {
          console.log('\nExtraction\n\nCache HIT\n\nReturning cached entities.\n');
      }

      let ruleEngine = cachedDoc.ruleEngine;
      if (!ruleEngine) {
          const sections = extraction?.sections || [];
          const documentType = extraction?.documentType || classification?.type;
          ruleEngine = await RuleEngineService.analyzeSections(sections, documentType);
          cachedDoc.ruleEngine = ruleEngine;
      }
      
      let summary = cachedDoc.summary;
      if (!summary) {
          summary = await SummaryService.generateSummary(cachedDoc.ocr.rawText, cachedDoc.id) || undefined;
          if (summary) cachedDoc.summary = summary;
      }
      
      let timeline = cachedDoc.timeline;
      if (!timeline) {
          timeline = TimelineService.generateTimeline(classification, extraction, ruleEngine);
          cachedDoc.timeline = timeline;
      }

      DocumentStore.saveDocument(fileHash, cachedDoc);

      // Clean up uploaded file since we used cache
      await fs.unlink(filePath).catch(console.error);

      return res.json({
        success: true,
        documentId: cachedDoc.id,
        cached: true,
        ocr: {
          rawText: cachedDoc.ocr.rawText,
          language: cachedDoc.ocr.language,
          processingTime: cachedDoc.ocr.processingTime
        },
        classification,
        ...(extraction ? { extraction } : { extraction: null }),
        ruleEngine,
        summary: summary || null,
        timeline
      });
    }

    // Process with OCR Service
    console.log('\n========== OCR ==========');
    console.log('OCR Started');
    const ocrResult = await OCRService.performOCR(filePath, mimeType);
    console.log('OCR Finished\n');

    // Create Document Object
    const documentId = crypto.randomUUID();

    // Perform classification using the newly generated OCR text
    console.log('\n--- DEBUG (api/ocr): ABOUT TO CALL ClassificationService.performClassification ---\n');
    const classification = await ClassificationService.performClassification(ocrResult.rawText, documentId);
    console.log('\n--- DEBUG (api/ocr): CLASSIFICATION COMPLETED ---\n');

    const extraction = await ExtractionService.performExtraction(ocrResult.rawText, documentId, classification.type) || undefined;
    
    // Process Rule Engine
    console.log('\n--- DEBUG (api/ocr): ABOUT TO CALL RuleEngineService.analyzeSections ---\n');
    const sections = extraction?.sections || [];
    const docType = extraction?.documentType || classification.type;
    const ruleEngine = await RuleEngineService.analyzeSections(sections, docType);
    console.log('\n--- DEBUG (api/ocr): RULE ENGINE COMPLETED ---\n');
    
    // Process Summary & Timeline Concurrently
    console.log('\n--- DEBUG (api/ocr): ABOUT TO CALL Summary and Timeline ---\n');
    const [summary, timeline] = await Promise.all([
        SummaryService.generateSummary(ocrResult.rawText, documentId),
        Promise.resolve(TimelineService.generateTimeline(classification, extraction, ruleEngine))
    ]);
    console.log('\n--- DEBUG (api/ocr): SUMMARY AND TIMELINE COMPLETED ---\n');

    const document: Document = {
      id: documentId,
      uploadedAt: new Date().toISOString(),
      fileName: originalName,
      mimeType,
      size: fileSize,
      ocr: ocrResult,
      classification,
      ...(extraction ? { extraction } : {}),
      ruleEngine,
      ...(summary ? { summary } : {}),
      timeline
    };

    // Store in cache
    DocumentStore.saveDocument(fileHash, document);

    // Clean up uploaded file
    await fs.unlink(filePath).catch(console.error);

    return res.json({
      success: true,
      documentId: document.id,
      cached: false,
      ocr: {
        rawText: ocrResult.rawText,
        language: ocrResult.language,
        processingTime: ocrResult.processingTime
      },
      classification,
      extraction: extraction || null,
      ruleEngine,
      summary: summary || null,
      timeline
    });

  } catch (error: any) {
    console.error("OCR Route Error:");
    console.dir(error, { depth: null });

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

