import type { BaseProvider, AIResponse, GenerateConfig } from '../providers/BaseProvider.js';
import { OpenRouterProvider } from '../providers/OpenRouterProvider.js';
import { AI_CONFIG } from '../config/ai.js';

export class AIService {
    private provider: BaseProvider;
    private queue: (() => Promise<void>)[] = [];
    private activeRequests = 0;

    constructor() {
        if (AI_CONFIG.provider === 'openrouter') {
            this.provider = new OpenRouterProvider();
        } else {
            throw new Error(`Unsupported AI Provider: ${AI_CONFIG.provider}`);
        }
    }

    private async processQueue() {
        if (this.activeRequests >= AI_CONFIG.maxConcurrentRequests || this.queue.length === 0) {
            return;
        }

        this.activeRequests++;
        const task = this.queue.shift();
        if (task) {
            try {
                await task();
            } finally {
                this.activeRequests--;
                this.processQueue();
            }
        }
    }

    async generate(
        models: (string | undefined)[],
        prompt: string,
        inlineData?: { mimeType: string; data: string },
        config?: GenerateConfig
    ): Promise<AIResponse> {
        return new Promise((resolve, reject) => {
            const task = async () => {
                let lastError: Error | null = null;

                for (const model of models) {
                    if (!model) continue;
                    
                    try {
                        const response = await this.provider.generate(model, prompt, inlineData, config);
                        return resolve(response);
                    } catch (error: any) {
                        lastError = error;
                        // If it's a permanent error like 404 (model unavailable), try the next model in fallback array
                        if (error.status === 404 || error.status === 400) {
                            console.warn(`[AIService] Model ${model} failed (${error.status}). Trying fallback...`);
                            continue;
                        }
                        // Other errors (429, 401, 5xx) either fail fast or have already been retried
                        break;
                    }
                }

                if (lastError) {
                    const status = (lastError as any).status;
                    if (status === 429) {
                        reject(new Error('AI service is temporarily busy. Please try again shortly.'));
                    } else if (status === 401 || status === 403) {
                        reject(new Error('AI authentication failed.'));
                    } else if (status === 404 || status === 400) {
                        reject(new Error('Configured AI model is unavailable.'));
                    } else {
                        reject(new Error(lastError.message || 'Unexpected AI service error.'));
                    }
                } else {
                    reject(new Error('No valid models configured for this task.'));
                }
            };

            this.queue.push(task);
            this.processQueue();
        });
    }
}

export const aiService = new AIService();
