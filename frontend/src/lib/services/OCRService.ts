import { DocumentStore, type OCRResult } from './DocumentStore'

export class OCRService {
  static async processDocument(documentId: string): Promise<OCRResult> {
    const doc = DocumentStore.getDocument(documentId)
    if (!doc) throw new Error('Document not found for OCR processing')

    const startTime = Date.now()
    const formData = new FormData()
    formData.append('document', doc.file)

    try {
      const response = await fetch('http://localhost:3000/api/ocr', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      const ocrResult: OCRResult = {
        rawText: result.ocr?.rawText || result.text || 'Not Available',
        language: result.ocr?.language || result.language || 'Unknown',
        confidence: result.confidence || 0,
        pageCount: result.pageCount || 1,
        processingTime: result.ocr?.processingTime || Date.now() - startTime,
        fullResponse: result.fullResponse || null
      }

      DocumentStore.updateOCR(documentId, ocrResult)

      return ocrResult
    } catch (error: unknown) {
      console.error("OCR Service Error:", error)
      throw new Error((error as Error).message || 'Failed to process document')
    }
  }
}
