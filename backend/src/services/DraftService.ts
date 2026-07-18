import { aiService } from './AIService.js';
import { DRAFT_SYSTEM_PROMPT, buildDraftPrompt } from '../prompts/draft.js';
import { AI_CONFIG } from '../config/ai.js';
import type { Document } from '../types/document.js';

export class DraftService {
    static async generateDraft(document: Document, draftType: string) {
        const contextData = {
            classification: document.classification,
            extraction: document.extraction,
            ruleEngine: document.ruleEngine,
            timeline: document.timeline,
            rights: document.rights
        };

        const prompt = DRAFT_SYSTEM_PROMPT + '\n\n' + buildDraftPrompt(contextData, draftType);

        try {
            const rawResponse = await aiService.generate(
                [AI_CONFIG.draftModel || AI_CONFIG.summaryModel], // Fallback if draftModel isn't defined
                prompt,
                undefined,
                { temperature: 0.1 }
            );

            const jsonMatch = rawResponse.text.match(/\{[\s\S]*\}/);
            const cleanJson = jsonMatch ? jsonMatch[0] : rawResponse.text;
            
            return JSON.parse(cleanJson);
        } catch (error: any) {
            console.error(`[DraftService] Error processing draft for ${document.id}:`, error);
            throw new Error('Failed to generate draft.');
        }
    }
}
