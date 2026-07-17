import { aiService } from './AIService.js';
import { RIGHTS_SYSTEM_PROMPT, buildRightsPrompt } from '../prompts/rights.js';
import { AI_CONFIG } from '../config/ai.js';
import type { RightsResult } from '../types/document.js';

export class RightsService {
    static async generateRights(
        ocrText: string,
        documentId: string,
        classification: any,
        extraction: any,
        ruleEngine: any,
        timeline: any
    ): Promise<RightsResult | null> {
        if (!ocrText || ocrText.trim() === '') {
            return null;
        }

        const prompt = RIGHTS_SYSTEM_PROMPT + '\n\n' + buildRightsPrompt(ocrText, classification, extraction, ruleEngine, timeline);
        
        try {
            const rawResponse = await aiService.generate(
                [AI_CONFIG.summaryModel], // Utilizing the summaryModel for this task as it's structurally similar.
                prompt,
                undefined,
                { temperature: 0.1 }
            );

            console.log(`[RightsService] Raw Response for ${documentId}:`, rawResponse);
            
            const jsonMatch = rawResponse.text.match(/\{[\s\S]*\}/);
            const cleanJson = jsonMatch ? jsonMatch[0] : rawResponse.text;
            
            const parsed = JSON.parse(cleanJson);
            
            return {
                rightsSummary: parsed.rightsSummary || 'The document does not provide this information.',
                nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps : [],
                documentsToKeep: Array.isArray(parsed.documentsToKeep) ? parsed.documentsToKeep : [],
                warnings: Array.isArray(parsed.warnings) ? parsed.warnings : []
            };
        } catch (error) {
            console.error(`[RightsService] Failed to generate rights for ${documentId}:`, error);
            return null;
        }
    }
}
