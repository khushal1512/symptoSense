export interface Question {
    id: number;
    text: string;
    category: AllergyCategory;
}

export interface Response {
    questionId: number;
    answer: boolean;
}

export interface AnalysisResult {
    predictedAllergies: string[];
    severity: Severity;
    precautions: string[];
}

export type Severity = 'Mild' | 'Moderate' | 'Severe';

export type AllergyCategory = 
    | 'Environmental'
    | 'Food'
    | 'Medication'
    | 'Skin'
    | 'Respiratory'
    | 'Chemical'
    | 'Insect';

export interface LLMConfig {
    model: string;
    temperature: number;
    maxRetries: number;
    maxTokens: number;
    apiKey: string;
} 