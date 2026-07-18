import { aiService } from './AIService.js';
import { CHAT_SYSTEM_PROMPT, buildChatPrompt } from '../prompts/chat.js';
import { AI_CONFIG } from '../config/ai.js';
import type { Document } from '../types/document.js';

export class ChatService {
    static async handleChat(document: Document, message: string, history: any[]) {
        // Build minimal context omitting massive raw texts if necessary, but JSON is quite small.
        // The prompt dictates reusing context
        const contextData = {
            classification: document.classification,
            extraction: document.extraction,
            ruleEngine: document.ruleEngine,
            timeline: document.timeline,
            rights: document.rights
        };

        // Combine prompt with history and message
        const prompt = CHAT_SYSTEM_PROMPT + '\n\n' + buildChatPrompt(contextData, history, message);

        try {
            const rawResponse = await aiService.generate(
                [AI_CONFIG.chatModel || AI_CONFIG.summaryModel], // Fallback to summaryModel if chat isn't explicit
                prompt,
                undefined,
                { temperature: 0.1 }
            );

            return {
                text: rawResponse.text.trim(),
                disclaimer: "This is AI-generated legal information and should not replace professional legal advice."
            };
        } catch (error: any) {
            console.error(`[ChatService] Error processing chat for ${document.id}:`, error);
            throw new Error('Failed to generate chat response.');
        }
    }
}
