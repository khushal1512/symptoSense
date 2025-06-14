'use server';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function analyzeAllergyResponses(
    questions: { text: string; category: string }[],
    answers: boolean[],
    additionalInfo?: string
) {
    try {
        const supabase = createClientComponentClient<Database>();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            throw new Error('No session found');
        }

        // Get user's API key from Supabase
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('gemini_api_key')
            .eq('id', session.user.id)
            .single();

        if (userError || !userData?.gemini_api_key) {
            throw new Error('No API key found');
        }

        const genAI = new GoogleGenerativeAI(userData.gemini_api_key);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Create a prompt that includes the questions, answers, and additional info
        const prompt = `
            Based on the following allergy questionnaire responses and additional information, analyze the potential allergies and provide recommendations:

            Questions and Answers:
            ${questions.map((q, i) => `${i + 1}. ${q.text} (Category: ${q.category})
            Answer: ${answers[i] ? 'Yes' : 'No'}`).join('\n')}

            ${additionalInfo ? `Additional Information: ${additionalInfo}` : ''}

            Please provide:
            1. A list of predicted allergies based on the responses
            2. The overall severity level (Mild, Moderate, or Severe)
            3. Recommended precautions and next steps

            Format the response as a JSON object with the following structure:
            {
                "predictedAllergies": ["allergy1", "allergy2", ...],
                "severity": "Mild|Moderate|Severe",
                "precautions": ["precaution1", "precaution2", ...]
            }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Parse the JSON response
        const analysis = JSON.parse(text);

        return {
            predictedAllergies: analysis.predictedAllergies,
            severity: analysis.severity,
            precautions: analysis.precautions
        };
    } catch (error) {
        console.error('Error analyzing allergy responses:', error);
        throw error;
    }
} 