import { DocumentStore, type Document } from './DocumentStore'

export interface OCRResult {
  documentId: string
  rawText: string
  language: string
  confidence: number
  pageCount: number
  processingTime: number
}

export class OCRService {
  static async processDocument(documentId: string): Promise<OCRResult> {
    const doc = DocumentStore.getDocument(documentId)
    if (!doc) throw new Error('Document not found for OCR processing')

    const startTime = Date.now()

    // Simulate OCR processing steps and delay for network/backend
    await new Promise(resolve => setTimeout(resolve, 3500))

    // Mock OCR Response for now.
    // In production, this would send FormData to our backend,
    // which securely calls Google Cloud Vision API and returns this data.
    const mockResult: OCRResult = {
      documentId,
      rawText: "FIR No. 143/2025\nPolice Station: Madhapur\nSection 41A CrPC\n\nThis is a mock extracted text block simulating Google Cloud Vision API output. The document appears to contain details regarding a bailable offense.",
      language: "English",
      confidence: 0.97,
      pageCount: 1,
      processingTime: Date.now() - startTime
    }

    // Update the Document object as requested by the architecture pattern
    DocumentStore.updateDocument(documentId, {
      rawText: mockResult.rawText,
      language: mockResult.language,
      confidence: mockResult.confidence,
      pageCount: mockResult.pageCount,
      ocrProcessingTime: mockResult.processingTime
    })

    return mockResult
  }
}
