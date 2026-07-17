export interface AIResponse {
    text: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    modelUsed: string;
}

export interface GenerateConfig {
    temperature?: number;
    maxTokens?: number;
}

export interface BaseProvider {
    generate(
        model: string,
        prompt: string,
        inlineData?: { mimeType: string; data: string },
        config?: GenerateConfig
    ): Promise<AIResponse>;
}
