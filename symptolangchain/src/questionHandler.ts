import readline from 'readline';
import { Question, Response } from './types/index.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const askQuestion = async (question: Question): Promise<Response> => {
    return new Promise((resolve) => {
        rl.question(`${question.text} (yes/no): `, (answer) => {
            resolve({
                questionId: question.id,
                answer: answer.toLowerCase() === 'yes'
            });
        });
    });
};

export const closeReadline = (): void => {
    rl.close();
}; 