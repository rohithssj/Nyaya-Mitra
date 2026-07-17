import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import { OCRService } from './src/services/OCRService.js';
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
        }
      });
    }

    // Process with OCR Service
    const ocrResult = await OCRService.performOCR(filePath, mimeType);

    // Create Document Object
    const documentId = crypto.randomUUID();
    const document: Document = {
      id: documentId,
      uploadedAt: new Date().toISOString(),
      fileName: originalName,
      mimeType,
      size: fileSize,
      ocr: ocrResult
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
      }
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

