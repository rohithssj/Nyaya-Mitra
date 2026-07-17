import { DocumentIdGenerator } from './DocumentIdGenerator'

export interface OCRResult {
  rawText: string
  language: string
  confidence: number
  pageCount: number
  processingTime: number
  fullResponse: any
}

export interface ClassificationResult {
  type: string
  confidence: number
  model: string
  processingTime: number
  processedAt: string
}

export interface ExtractedDate {
  type: string
  value: string
}

export interface ExtractionResult {
  documentType: string | null
  court: string | null
  policeStation: string | null
  caseNumber: string | null
  firNumber: string | null
  crimeNumber: string | null
  judge: string | null
  complainant: string | null
  accused: string | null
  advocate: string | null
  sections: string[]
  acts: string[]
  dates: ExtractedDate[]
  addresses: string[]
  offences: string[]
  importantPersons: string[]
  importantOrganizations: string[]
  processingTime: number
  model: string
  processedAt: string
}

export interface RuleEngineResult {
  sections: string[]
  rights: string[]
  deadlines: string[]
  warnings: string[]
  facts: string[]
}

export interface Document {
  id: string
  file: File
  fileName: string
  uploadedAt: string
  size: number
  extension: string
  previewUrl: string | null

  ocr?: OCRResult
  classification?: ClassificationResult
  extraction?: ExtractionResult
  ruleEngine?: RuleEngineResult
}

export class DocumentStore {
  private static documents: Map<string, Document> = new Map()

  static async initializeDocument(file: File): Promise<Document> {
    const id = DocumentIdGenerator.generate()
    
    let previewUrl: string | null = null
    if (file.type.startsWith('image/')) {
      previewUrl = URL.createObjectURL(file)
    }

    const extension = file.name.split('.').pop() || ''
    
    const doc: Document = {
      id,
      file,
      fileName: file.name,
      extension,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      previewUrl
    }

    this.documents.set(id, doc)
    return doc
  }

  static getDocument(id: string): Document | undefined {
    return this.documents.get(id)
  }

  static updateDocument(id: string, updates: Partial<Document>): Document {
    const doc = this.documents.get(id)
    if (!doc) throw new Error('Document not found')
    
    const updatedDoc = { ...doc, ...updates }
    this.documents.set(id, updatedDoc)
    return updatedDoc
  }

  static updateOCR(id: string, ocrData: OCRResult): Document {
    return this.updateDocument(id, { ocr: ocrData })
  }

  static removeDocument(id: string): void {
    const doc = this.documents.get(id)
    if (!doc) return
    if (doc.previewUrl) {
      URL.revokeObjectURL(doc.previewUrl)
    }
    this.documents.delete(id)
  }
}
