import { aiService } from './AIService.js';
import type { OCRResult } from '../types/document.js';
import { AI_CONFIG } from '../config/ai.js';
import { OCR_PROMPT } from '../prompts/ocr.js';
import fs from 'fs/promises';

export class OCRService {
    static async performOCR(filePath: string, mimeType: string): Promise<OCRResult> {
        const startTime = Date.now();
        
        // Convert file to base64
        const fileBuffer = await fs.readFile(filePath);
        const base64Content = fileBuffer.toString('base64');

        try {
            console.log('\nAI Request Started\n');
            console.log(`Provider:\n${AI_CONFIG.provider}\n`);
            console.log(`Task:\nOCR\n`);
            console.log(`Cache:\nMISS\n`);

            const result = await aiService.generate(
                [AI_CONFIG.ocrModel, AI_CONFIG.ocrFallbackModel],
                OCR_PROMPT,
                { mimeType, data: base64Content },
                { temperature: 0 }
            );

            const processingTime = Date.now() - startTime;
            const tokens = result.usage ? `Prompt: ${result.usage.promptTokens}, Output: ${result.usage.completionTokens}, Total: ${result.usage.totalTokens}` : 'Unavailable';

            console.log(`Model:\n${result.modelUsed}\n`);
            console.log(`Processing:\n${processingTime} ms\n`);
            console.log(`Tokens:\n${tokens}\n`);
            console.log('Finished\n');

            return {
                rawText: result.text.trim(),
                language: 'en',
                processingTime
            };

        } catch (error: any) {
            // Do not console.error here to avoid raw traces leaking unnecessarily, handled by server.ts
            throw error;
        }
    }
}
