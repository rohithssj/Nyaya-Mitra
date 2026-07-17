import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import vision from '@google-cloud/vision';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Ensure GOOGLE_APPLICATION_CREDENTIALS is set in production
// For now, we instantiate the client. If no credentials are found, it might fail unless deployed.
const client = new vision.ImageAnnotatorClient();

app.post('/api/ocr', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No document uploaded' });
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;

    let fullResponse: any = null;
    let text = '';
    let language = 'Unknown';
    let confidence = 0;
    let pageCount = 1;

    // Direct Image OCR using Google Vision (synchronous)
    if (mimeType.startsWith('image/')) {
      const [result] = await client.documentTextDetection(filePath);
      fullResponse = result;
      
      text = result.fullTextAnnotation?.text || '';
      
      // Calculate average confidence from pages
      const pages = result.fullTextAnnotation?.pages || [];
      if (pages.length > 0) {
        let totalConfidence = 0;
        let blockCount = 0;
        pages.forEach(page => {
          page.blocks?.forEach(block => {
            totalConfidence += block.confidence || 0;
            blockCount++;
          });
          
          if (page.property?.detectedLanguages && page.property.detectedLanguages.length > 0) {
             language = page.property.detectedLanguages[0]?.languageCode || 'Unknown';
          }
        });
        
        confidence = blockCount > 0 ? totalConfidence / blockCount : 0;
      }
    } else if (mimeType === 'application/pdf') {
      // For MVP: Return a dummy or require GCS setup if real PDF is sent
      // Since Google Vision sync API doesn't support PDFs natively, 
      // in production we would extract pages to images here or use asyncbatchannotate
      return res.status(400).json({ error: 'PDF processing requires Google Cloud Storage or converting pages to images first (not fully implemented in MVP).' });
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    // Clean up file if we want, but keeping it simple for now
    
    // Normalize text
    const normalizedText = text.replace(/\n{3,}/g, '\n\n').trim();

    return res.json({
      text: normalizedText,
      language,
      confidence,
      pageCount,
      fullResponse
    });

  } catch (error: any) {
    console.error('OCR Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
