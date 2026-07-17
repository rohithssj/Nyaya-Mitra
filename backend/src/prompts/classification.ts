import { SUPPORTED_DOCUMENT_TYPES } from '../constants/documents.js';

export const CLASSIFICATION_PROMPT = `You are a legal document classifier.
Determine the document type based on the provided OCR text.
Return ONLY valid JSON.
Allowed document types: ${SUPPORTED_DOCUMENT_TYPES.join(', ')}
Output format:
{
  "type": "",
  "confidence": 0.00
}
Never include markdown.
Never include explanations.
Never include additional keys.`;
