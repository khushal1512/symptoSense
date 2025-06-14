'use server';

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Question } from "../types";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

interface AnalysisResponse {
    predictedAllergies: string[];
    severity: 'Mild' | 'Moderate' | 'Severe';
    precautions: string[];
}

export async function analyzeAllergyResponses(questions: Question[], answers: boolean[]): Promise<AnalysisResponse> {
    const supabase = createServerComponentClient({ cookies });
    
    // Get the current user's session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        throw new Error('No session found');
    }

    // Get the user's API key from their profile
    const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('api_key')
        .eq('id', session.user.id)
        .single();

    if (profileError || !profile?.api_key) {
        throw new Error('No API key found. Please add your Gemini API key in your profile settings.');
    }

    const llm = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash-001",
        temperature: 1.9,
        maxRetries: 2,
        apiKey: profile.api_key
    });

    const responses = questions.map((question, index) => ({
        question: question.text,
        answer: answers[index] ? 'yes' : 'no'
    }));

    const prompt = `Based on the following responses to allergy-related questions, provide a concise analysis in this exact format:

1. Predicted/Likely Allergies (list only the most likely ones based on yes responses):
- [List 1-3 most likely allergies]

2. Severity Assessment (choose one):
- Mild
- Moderate
- Severe

3. Recommended Precautions (list 5-10 specific, actionable points):
- [List 5-10 specific precautions]

Keep each section brief and to the point. Focus only on the most relevant information based on the yes responses.

Responses: ${JSON.stringify(responses)}
Questions: ${JSON.stringify(questions)}`;

    try {
        const result = await llm.invoke(prompt);
        const content = result.content as string;

        // Parse the response into structured data
        const lines = content.split('\n');
        const predictedAllergies: string[] = [];
        let severity: 'Mild' | 'Moderate' | 'Severe' = 'Mild';
        const precautions: string[] = [];

        let currentSection = '';
        for (const line of lines) {
            if (line.includes('Predicted/Likely Allergies')) {
                currentSection = 'allergies';
                continue;
            } else if (line.includes('Severity Assessment')) {
                currentSection = 'severity';
                continue;
            } else if (line.includes('Recommended Precautions')) {
                currentSection = 'precautions';
                continue;
            }

            if (line.trim().startsWith('-')) {
                const item = line.trim().substring(1).trim();
                if (currentSection === 'allergies') {
                    predictedAllergies.push(item);
                } else if (currentSection === 'precautions') {
                    precautions.push(item);
                }
            } else if (currentSection === 'severity' && line.trim()) {
                const severityText = line.trim();
                if (severityText === 'Mild' || severityText === 'Moderate' || severityText === 'Severe') {
                    severity = severityText;
                }
            }
        }

        return {
            predictedAllergies,
            severity,
            precautions
        };
    } catch (error) {
        console.error("Error analyzing responses:", error);
        throw new Error("Failed to analyze allergy responses");
    }
} 