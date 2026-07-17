import type { ExtractionResult } from './extraction.js';

export interface OCRResult {
    rawText: string;
    language: string;
    processingTime: number;
}

export interface ClassificationResult {
    type: string;
    confidence: number;
    model: string;
    processingTime: number;
    processedAt: string;
}

export interface Document {
    id: string;
    uploadedAt: string;
    fileName: string;
    mimeType: string;
    size: number;
    ocr: OCRResult;
    classification?: ClassificationResult;
    extraction?: ExtractionResult;
    ruleEngine?: import('./rules.js').RuleEngineResult;
    summary?: string;
    timeline?: any;
}
