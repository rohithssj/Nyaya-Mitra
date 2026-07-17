import dotenv from 'dotenv';

dotenv.config({ override: true });

export const AI_CONFIG = {
    provider: process.env.AI_PROVIDER || 'openrouter',
    maxConcurrentRequests: 2,
    timeoutMs: 60000,
    
    get ocrModel() { return process.env.OCR_MODEL; },
    get ocrFallbackModel() { return process.env.OCR_FALLBACK_MODEL; },
    get classificationModel() { return process.env.CLASSIFICATION_MODEL; },
    get summaryModel() { return process.env.SUMMARY_MODEL; },
    get entityModel() { return process.env.ENTITY_MODEL; },
    get chatModel() { return process.env.CHAT_MODEL; },
    get draftModel() { return process.env.DRAFT_MODEL; },

    temperature: 0,
    maxTokens: 4096
};
