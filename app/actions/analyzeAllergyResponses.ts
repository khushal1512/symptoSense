'use server';

import { createClient } from '@supabase/supabase-js';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export async function analyzeAllergyResponses(
    questions: { text: string; category: string }[],
    answers: boolean[],
    additionalInfo?: string,
    accessToken?: string
) {
    try {
        if (!accessToken) {
            throw new Error('No access token provided');
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                global: {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            }
        );

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
            console.error('Error getting user:', userError);
            throw new Error('Failed to get user');
        }

        if (!user) {
            console.error('No user found');
            throw new Error('No user found');
        }

        const { data: userData, error: apiKeyError } = await supabase
            .from('user_profiles')
            .select('api_key')
            .eq('id', user.id)
            .single();

        if (apiKeyError) {
            console.error('Error fetching API key:', apiKeyError);
            throw new Error('Failed to fetch API key');
        }

        if (!userData?.api_key) {
            console.error('No API key found for user:', user.id);
            throw new Error('No API key found');
        }

        console.log('Using API Key:', userData.api_key);

        const llmconfig = {
            model: "gemini-2.0-flash-001",
            temperature: 1.9,
            maxRetries: 2,
            maxTokens: 4000,
            apiKey: userData.api_key
        };

        const llm = new ChatGoogleGenerativeAI(llmconfig);

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

Responses: ${JSON.stringify(questions.map((q, i) => ({ questionId: i + 1, answer: answers[i] })))}
Questions: ${JSON.stringify(questions)}
${additionalInfo ? `Additional Information: ${additionalInfo}` : ''}`;

        const result = await llm.invoke(prompt);
        console.log('Gemini Response:', result.content);

        // Parse the response into structured format
        const content = typeof result.content === 'string' ? result.content : JSON.stringify(result.content);
        const lines = content.split('\n');
        
        let currentSection = '';
        const predictedAllergies: string[] = [];
        let severity = 'Mild';
        const precautions: string[] = [];

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
        console.error('Error analyzing allergy responses:', error);
        throw error;
    }
} 