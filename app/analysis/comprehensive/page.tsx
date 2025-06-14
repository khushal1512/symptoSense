'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Space_Grotesk } from 'next/font/google';
import { questions } from '../../../questions/comprehensive';
import { analyzeAllergyResponses } from '../../actions/analyzeAllergyResponses';
import { Question } from '../../types';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function ComprehensiveAnalysisPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<{
        predictedAllergies: string[];
        severity: 'Mild' | 'Moderate' | 'Severe';
        precautions: string[];
    } | null>(null);
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleAnswer = (answer: boolean) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
            setShowAdditionalInfo(false);
        }
    };

    const handleNextQuestion = () => {
        if (answers[currentQuestion] !== undefined) {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
            } else {
                setShowAdditionalInfo(true);
            }
        }
    };

    const handleSubmit = async () => {
        if (showAdditionalInfo && answers[questions.length - 1] !== undefined) {
            setIsSubmitting(true);
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    router.push('/auth/login');
                    return;
                }
                const result = await analyzeAllergyResponses(questions, answers, additionalInfo, session.access_token);
                const analysisResult = {
                    ...result,
                    severity: result.severity as 'Mild' | 'Moderate' | 'Severe'
                };
                // setAnalysisResult(analysisResult);
                
                // Store result in sessionStorage before navigation
                sessionStorage.setItem('analysisResult', JSON.stringify(analysisResult));
                
                // Add a small delay to ensure storage is complete
                await new Promise(resolve => setTimeout(resolve, 200));
                
                // Navigate to results page
                router.push('/analysis/result');
            } catch (error) {
                console.error('Error submitting answers:', error);
                // TODO: Show error message to user
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <>
                    <div className="mb-8">
                        <button
                            onClick={() => router.push('/analysis')}
                            className="text-white/60 hover:text-white transition-colors w-fit font-bold font-space-grotesk"
                        >
                            <span className="text-emerald-500">←</span> Back to Allergy Categories
                        </button>
                    </div>

                    <div className="w-full h-1 bg-white/10 rounded-full mb-4">
                        <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                            style={{
                                width: `${((currentQuestion + 1) / questions.length) * 100}%`
                            }}
                        />
                    </div>

                    <div className="text-sm text-white/60 font-space-grotesk mb-8 text-center">
                        Question {currentQuestion + 1} of {questions.length}
                    </div>

                    <div className="flex justify-between items-center mb-8 max-w-3xl mx-auto">
                        <button
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestion === 0}
                            className="flex items-center gap-2 text-white/60 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-space-grotesk"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                            </svg>
                            Previous
                        </button>
                        <button
                            onClick={handleNextQuestion}
                            disabled={currentQuestion === questions.length - 1 && answers[currentQuestion] !== undefined && !showAdditionalInfo}
                            className="flex items-center gap-2 text-white/60 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-space-grotesk"
                        >
                            Next
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </button>
                    </div>

                    {questions.length > 0 && !showAdditionalInfo && (
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-8 lg:p-12 max-w-3xl mx-auto h-[400px] flex flex-col"
                        >
                            <h2 className="text-xl lg:text-2xl font-semibold text-white mb-8 font-space-grotesk flex-1">
                                {questions[currentQuestion].text}
                            </h2>
                            <div className="flex gap-4 mt-auto">
                                <button
                                    onClick={() => {
                                        handleAnswer(true);
                                        if (currentQuestion < questions.length - 1) {
                                            handleNextQuestion();
                                        } else {
                                            setShowAdditionalInfo(true);
                                        }
                                    }}
                                    className={`flex-1 px-6 py-3 font-medium rounded-lg transition-colors font-space-grotesk ${answers[currentQuestion] === true ? 'bg-emerald-600' : 'bg-emerald-600/60 hover:bg-emerald-600/80'} text-white`}
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => {
                                        handleAnswer(false);
                                        if (currentQuestion < questions.length - 1) {
                                            handleNextQuestion();
                                        } else {
                                            setShowAdditionalInfo(true);
                                        }
                                    }}
                                    className={`flex-1 px-6 py-3 font-medium rounded-lg transition-colors font-space-grotesk ${answers[currentQuestion] === false ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'} text-white`}
                                >
                                    No
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {showAdditionalInfo && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-8 lg:p-12 max-w-3xl mx-auto h-[400px] flex flex-col"
                        >
                            <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4 font-space-grotesk">
                                Do you have anything else to share?
                            </h2>
                            <p className="text-gray-400 mb-6 font-space-grotesk">
                                Feel free to share any additional symptoms, concerns, or information that might help us better understand your situation.
                            </p>
                            <textarea
                                value={additionalInfo}
                                onChange={(e) => setAdditionalInfo(e.target.value)}
                                placeholder="Type your additional information here..."
                                className="flex-1 w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none font-space-grotesk"
                            />
                            <div className="mt-6">
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors font-space-grotesk disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Analysis'}
                                </button>
                            </div>
                        </motion.div>
                    )}
        </>
    );
} 