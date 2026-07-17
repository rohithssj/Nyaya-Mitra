import { aiService } from './AIService.js';
import { SUMMARY_SYSTEM_PROMPT, buildSummaryPrompt } from '../prompts/summary.js';
import { AI_CONFIG } from '../config/ai.js';

export class SummaryService {
    static async generateSummary(ocrText: string, documentId: string): Promise<string | null> {
        if (!ocrText || ocrText.trim() === '') {
            return null;
        }

        const prompt = SUMMARY_SYSTEM_PROMPT + '\n\n' + buildSummaryPrompt(ocrText);
        
        try {
            const rawResponse = await aiService.generate(
                [AI_CONFIG.summaryModel],
                prompt,
                undefined,
                { temperature: 0.1 }
            );

            console.log(`[SummaryService] Raw Response for ${documentId}:`, rawResponse);
            
            // Clean up the response in case it contains markdown formatting
            const jsonMatch = rawResponse.text.match(/\{[\s\S]*\}/);
            const cleanJson = jsonMatch ? jsonMatch[0] : rawResponse.text;
            
            const parsed = JSON.parse(cleanJson);
            
            if (parsed && parsed.summary) {
                return parsed.summary;
            }
            return null;
        } catch (error) {
            console.error(`[SummaryService] Failed to generate summary for ${documentId}:`, error);
            return null;
        }
    }
}
