import type { BaseProvider, AIResponse, GenerateConfig } from './BaseProvider.js';
import { AI_CONFIG } from '../config/ai.js';

export class OpenRouterProvider implements BaseProvider {
    private apiKey: string;
    private baseUrl = 'https://openrouter.ai/api/v1/chat/completions';

    constructor() {
        const key = process.env.OPENROUTER_API_KEY;
        if (!key) {
            throw new Error('OPENROUTER_API_KEY is not configured in .env');
        }
        this.apiKey = key;
    }

    async generate(
        model: string,
        prompt: string,
        inlineData?: { mimeType: string; data: string },
        config?: GenerateConfig
    ): Promise<AIResponse> {
        let retries = 0;
        const maxRetries = 3;

        while (retries <= maxRetries) {
            try {
                let content: any = prompt;
                if (inlineData) {
                    content = [
                        { type: 'text', text: prompt },
                        { type: 'image_url', image_url: { url: `data:${inlineData.mimeType};base64,${inlineData.data}` } }
                    ];
                }

                const payload = {
                    model,
                    messages: [{ role: 'user', content }],
                    temperature: config?.temperature ?? AI_CONFIG.temperature,
                    max_tokens: config?.maxTokens ?? AI_CONFIG.maxTokens
                };

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.timeoutMs);

                const response = await fetch(this.baseUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'HTTP-Referer': 'http://localhost:3000',
                        'X-Title': 'Nyaya Mitra',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorText = await response.text();
                    let errorJson;
                    try { errorJson = JSON.parse(errorText); } catch { /* ignore */ }
                    
                    const error = new Error(`OpenRouter Error: ${response.status} ${response.statusText}`);
                    (error as any).status = response.status;
                    (error as any).details = errorJson;
                    throw error;
                }

                const data = await response.json();
                
                return {
                    text: data.choices[0]?.message?.content || '',
                    ...(data.usage ? {
                        usage: {
                            promptTokens: data.usage.prompt_tokens,
                            completionTokens: data.usage.completion_tokens,
                            totalTokens: data.usage.total_tokens
                        }
                    } : {}),
                    modelUsed: data.model || model
                };

            } catch (error: any) {
                if (error.name === 'AbortError') {
                    throw new Error('AI service request timed out.');
                }

                const status = error.status;
                const isTransient = status === 429 || (status >= 500 && status < 600);

                if (isTransient && retries < maxRetries) {
                    retries++;
                    const delay = Math.pow(2, retries - 1) * 1000; // 1s, 2s, 4s
                    console.warn(`[OpenRouterProvider] Transient error (${status}). Retrying in ${delay}ms... (Attempt ${retries}/${maxRetries})`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }

                throw error;
            }
        }
        throw new Error('Exceeded maximum retries for OpenRouter API');
    }
}
