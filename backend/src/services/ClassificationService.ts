import { aiService } from './AIService.js';
import type { ClassificationResult } from '../types/document.js';
import { AI_CONFIG } from '../config/ai.js';
import { CLASSIFICATION_PROMPT } from '../prompts/classification.js';
import { SUPPORTED_DOCUMENT_TYPES } from '../constants/documents.js';

export class ClassificationService {
    static async performClassification(ocrText: string, documentId: string): Promise<ClassificationResult> {
        const startTime = Date.now();
        
        try {
            console.log('\n========== Classification ==========');
            console.log(`Model:\n${AI_CONFIG.classificationModel}`);
            
            const prompt = `${CLASSIFICATION_PROMPT}\n\nDOCUMENT TEXT:\n${ocrText}`;
            console.log(`Prompt:\n${prompt}`);

            const result = await aiService.generate(
                [AI_CONFIG.classificationModel],
                prompt,
                undefined,
                { temperature: 0 }
            );

            console.log(`Raw Response:\n${result.text}`);

            const processingTime = Date.now() - startTime;
            
            let parsedJson;
            try {
                const cleanText = result.text.replace(/```json/gi, '').replace(/```/g, '').trim();
                parsedJson = JSON.parse(cleanText);
                console.log(`Parsed JSON:\n${JSON.stringify(parsedJson, null, 2)}`);
            } catch (e: any) {
                console.error(`\nParsing Error:\n${e.message}\n${e.stack}`);
                console.error(`Raw Response that failed parsing:\n${result.text}`);
                throw e; // Throw to trigger the outer catch for debugging
            }

            const typeValue = parsedJson.type;
            const confidenceValue = typeof parsedJson.confidence === 'number' ? parsedJson.confidence : 0;
            
            const isValidType = SUPPORTED_DOCUMENT_TYPES.includes(typeValue as any);

            console.log('Finished\n');

            return {
                type: isValidType ? typeValue : 'Unknown',
                confidence: isValidType ? confidenceValue : 0,
                model: result.modelUsed,
                processingTime,
                processedAt: new Date().toISOString()
            };

        } catch (error: any) {
            console.error(`\nAPI/Execution Error:\nStatus: ${error.status || 'N/A'}`);
            console.error(`Provider Error: ${JSON.stringify(error.details || {})}`);
            console.error(`Message: ${error.message}`);
            console.error(`Stack: ${error.stack}`);
            
            // Restore graceful fallback as requested (after logging)
            return {
                type: 'Unknown',
                confidence: 0,
                model: 'none',
                processingTime: Date.now() - startTime,
                processedAt: new Date().toISOString()
            };
        }
    }
}
