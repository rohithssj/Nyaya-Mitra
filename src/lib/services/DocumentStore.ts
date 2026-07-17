import { DocumentIdGenerator } from './DocumentIdGenerator'

export interface ExtractedData {
  [key: string]: any
}

export interface Rights {
  title: string
  description: string
  type: 'gold' | 'maroon' | 'muted'
}

export interface TimelineEvent {
  date: string
  title: string
  description: string
}

export interface Document {
  id: string;
  file: File;
  fileName: string;
  uploadedAt: string;
  size: number;
  extension: string;
  previewUrl: string | null;

  // OCR
  rawText?: string;
  language?: string;
  confidence?: number;
  pageCount?: number;
  ocrProcessingTime?: number;

  // Future phases
  documentType?: string;
  extractedData?: ExtractedData;
  summary?: string;
  rights?: Rights[];
  timeline?: TimelineEvent[];
}

export class DocumentStore {
  private static documents: Map<string, Document> = new Map()

  static async initializeDocument(file: File): Promise<Document> {
    const id = DocumentIdGenerator.generate()
    
    // Generate preview URL if it's an image
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
    
    // Simulate slight delay for processing/saving locally
    await new Promise(resolve => setTimeout(resolve, 300))

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

  static removeDocument(id: string): void {
    const doc = this.documents.get(id)
    if (!doc) return
    if (doc.previewUrl) {
      URL.revokeObjectURL(doc.previewUrl)
    }
    doc.file = null as unknown as File // Help GC
    this.documents.delete(id)
  }
}
