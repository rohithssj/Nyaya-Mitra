export interface OCRResult {
    rawText: string;
    language: string;
    processingTime: number;
}

export interface Document {
    id: string;
    uploadedAt: string;
    fileName: string;
    mimeType: string;
    size: number;
    ocr: OCRResult;
}
