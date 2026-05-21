export interface AIService {
    generate(prompt: string): Promise<string>;
}