import { Question, Response } from './types/index.js';

export const generatePrompt = (responses: Response[], questions: Question[]): string => {
    return `Based on the following responses to allergy-related questions, provide a concise analysis in this exact format:

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
}; 