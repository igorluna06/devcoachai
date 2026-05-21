import { AIGenerationError } from "../../errors/AIError";
import { AIService } from "../AIService";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export class GroqProvider implements AIService {

    async generate(prompt: string): Promise<string> {
        try {
            const completion = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                temperature: 0.7,
        });

            return completion.choices[0].message.content || "";

        } catch (error) {
            throw new AIGenerationError();
        }
    }
}