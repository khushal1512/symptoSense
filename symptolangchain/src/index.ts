import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { questions } from './questions.js';
import { generatePrompt } from './prompt.js';
import { askQuestion, closeReadline } from './questionHandler.js';
import { Response, LLMConfig } from './types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

if (!process.env.GOOGLE_API_KEY) {
    console.error("Error: GOOGLE_API_KEY is not set in environment");
    process.exit(1);
}

const llmconfig: LLMConfig = {
    model: "gemini-2.0-flash-001",
    temperature: 1.9,
    maxRetries: 2,
    maxTokens: 4000,
    apiKey: process.env.GOOGLE_API_KEY
};

const llm = new ChatGoogleGenerativeAI(llmconfig);

async function main(): Promise<void> {
    console.log("Welcome to SymptoSense! ");
    console.log("Please answer the following questions with 'yes' or 'no'.\n");

    const responses: Response[] = [];
    for (const question of questions) {
        const response = await askQuestion(question);
        responses.push(response);
    }

    const prompt = generatePrompt(responses, questions);

    try {
        const result = await llm.invoke(prompt);
        console.log("\nAnalysis Results:");
        console.log(result.content);
    } catch (error) {
        console.error("Error getting prediction:", error instanceof Error ? error.message : 'Unknown error');
    }
    closeReadline();
}

main().catch((error: Error) => {
    console.error("error:", error.message);
    process.exit(1);
}); 