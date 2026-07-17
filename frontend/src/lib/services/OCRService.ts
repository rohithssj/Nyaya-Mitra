import { DocumentStore, type OCRResult } from './DocumentStore'

export class OCRService {
  static async processDocument(documentId: string): Promise<OCRResult> {
    console.log('[DEBUG Frontend] 1. Processing starts for doc:', documentId)
    const doc = DocumentStore.getDocument(documentId)
    if (!doc) throw new Error('Document not found for OCR processing')

    const startTime = Date.now()
    const formData = new FormData()
    formData.append('document', doc.file)

    try {
      console.log('[DEBUG Frontend] 2. Sending OCR request to backend...')
      const response = await fetch('http://localhost:3000/api/ocr', {
        method: 'POST',
        body: formData
      })

      console.log('[DEBUG Frontend] 3. Backend response received. Status:', response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      console.log('[DEBUG Frontend] 4. Parsing response...')
      const result = await response.json()
      console.log('[DEBUG Frontend] 4.1 Parsed backend response:', result)
      
      const ocrResult: OCRResult = {
        rawText: result.ocr?.rawText || result.text || 'Not Available',
        language: result.ocr?.language || result.language || 'Unknown',
        confidence: result.confidence || 0,
        pageCount: result.pageCount || 1,
        processingTime: result.ocr?.processingTime || Date.now() - startTime,
        fullResponse: result.fullResponse || null
      }

      console.log('[DEBUG Frontend] 5. Storing data...')
      DocumentStore.updateDocument(documentId, { 
        ocr: ocrResult,
        classification: result.classification,
        extraction: result.extraction,
        ruleEngine: result.ruleEngine,
        summary: result.summary,
        rights: result.rights,
        timeline: result.timeline
      })

      console.log('[DEBUG Frontend] 5.1 Storage complete.')
      return ocrResult
    } catch (error: unknown) {
      console.error("[DEBUG Frontend] OCR Service Error:", error)
      throw new Error((error as Error).message || 'Failed to process document')
    }
  }
}
