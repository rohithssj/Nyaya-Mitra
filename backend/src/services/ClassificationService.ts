import { aiService } from './AIService.js';
import type { ClassificationResult } from '../types/document.js';
import { AI_CONFIG } from '../config/ai.js';
import { CLASSIFICATION_PROMPT } from '../prompts/classification.js';
import { SUPPORTED_DOCUMENT_TYPES } from '../constants/documents.js';

export class ClassificationService {
    static async performClassification(ocrText: string, documentId: string): Promise<ClassificationResult> {
        const startTime = Date.now();
        
        try {
            console.log('\nClassification Started\n');
            console.log(`Model:\n${AI_CONFIG.classificationModel}\n`);
            console.log(`Document:\n${documentId}\n`);
            console.log(`Cache:\nMISS\n`);

            const prompt = `${CLASSIFICATION_PROMPT}\n\nDOCUMENT TEXT:\n${ocrText}`;
            console.log('\n--- DEBUG: PROMPT SENT ---\n', prompt.substring(0, 500) + '... [truncated]', '\n--------------------------\n');

            const result = await aiService.generate(
                [AI_CONFIG.classificationModel],
                prompt,
                undefined,
                { temperature: 0 }
            );

            console.log('\n--- DEBUG: RAW AI RESPONSE ---\n', result.text, '\n------------------------------\n');

            const processingTime = Date.now() - startTime;
            const tokens = result.usage ? `Prompt: ${result.usage.promptTokens}, Output: ${result.usage.completionTokens}, Total: ${result.usage.totalTokens}` : 'Unavailable';

            console.log(`Processing:\n${processingTime} ms\n`);
            console.log(`Tokens:\n${tokens}\n`);
            console.log('Finished\n');

            let parsedJson;
            try {
                const cleanText = result.text.replace(/```json/gi, '').replace(/```/g, '').trim();
                parsedJson = JSON.parse(cleanText);
                console.log('\n--- DEBUG: PARSED JSON ---\n', parsedJson, '\n--------------------------\n');
            } catch (e) {
                console.error('\n--- DEBUG: PARSING EXCEPTION ---\n', e, '\n--------------------------------\n');
                console.error("Failed to parse classification JSON:", result.text);
                parsedJson = { type: 'Unknown', confidence: 0 };
            }

            const typeValue = parsedJson.type;
            const confidenceValue = typeof parsedJson.confidence === 'number' ? parsedJson.confidence : 0;
            
            const isValidType = SUPPORTED_DOCUMENT_TYPES.includes(typeValue as any);

            return {
                type: isValidType ? typeValue : 'Unknown',
                confidence: isValidType ? confidenceValue : 0,
                model: result.modelUsed,
                processingTime,
                processedAt: new Date().toISOString()
            };

        } catch (error: any) {
            console.error('\n--- DEBUG: CAUGHT EXCEPTION IN CLASSIFICATION SERVICE ---\n');
            console.dir(error, { depth: null });
            console.error('\n-------------------------------------------------------\n');
            
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
