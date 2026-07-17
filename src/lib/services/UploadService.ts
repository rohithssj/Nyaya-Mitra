import { DocumentIdGenerator } from './DocumentIdGenerator'

export interface UploadedFile {
  id: string
  file: File
  fileName: string
  extension: string
  size: number
  uploadTime: string
  previewUrl: string | null
}

export class UploadService {
  private static files: Map<string, UploadedFile> = new Map()

  static async storeFile(file: File): Promise<UploadedFile> {
    const id = DocumentIdGenerator.generate()
    
    // Generate preview URL if it's an image
    let previewUrl: string | null = null
    if (file.type.startsWith('image/')) {
      previewUrl = URL.createObjectURL(file)
    }

    const extension = file.name.split('.').pop() || ''
    
    const uploadedFile: UploadedFile = {
      id,
      file,
      fileName: file.name,
      extension,
      size: file.size,
      uploadTime: new Date().toISOString(),
      previewUrl
    }

    this.files.set(id, uploadedFile)
    
    // Simulate slight delay for processing/saving locally
    await new Promise(resolve => setTimeout(resolve, 500))

    return uploadedFile
  }

  static getFile(id: string): UploadedFile | undefined {
    return this.files.get(id)
  }

  static removeFile(id: string): void {
    const fileRecord = this.files.get(id)
    if (fileRecord?.previewUrl) {
      URL.revokeObjectURL(fileRecord.previewUrl)
    }
    this.files.delete(id)
  }
}
