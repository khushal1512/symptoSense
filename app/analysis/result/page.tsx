'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function ResultPage() {
    const [results, setResults] = useState<{
        predictedAllergies: string[];
        severity: 'Mild' | 'Moderate' | 'Severe';
        precautions: string[];
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Get results from sessionStorage
        const storedResults = sessionStorage.getItem('analysisResult');
        if (!storedResults) {
            router.push('/analysis');
            return;
        }

        try {
            const parsedResults = JSON.parse(storedResults);
            setResults(parsedResults);
        } catch (error) {
            console.error('Error parsing results:', error);
            router.push('/analysis');
        } finally {
            setLoading(false);
        }

    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!results) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-3xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-8"
                >
                    <h1 className="text-2xl font-bold text-white mb-6 font-space-grotesk">
                        Analysis Results
                    </h1>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4 font-space-grotesk">
                            Predicted Allergies
                        </h2>
                        <ul className="space-y-2">
                            {results.predictedAllergies.map((allergy, index) => (
                                <li key={index} className="text-gray-300 font-space-grotesk">
                                    • {allergy}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4 font-space-grotesk">
                            Severity Level
                        </h2>
                        <p className={`text-lg font-space-grotesk ${
                            results.severity === 'Severe' ? 'text-red-400' :
                            results.severity === 'Moderate' ? 'text-yellow-400' :
                            'text-emerald-400'
                        }`}>
                            {results.severity}
                        </p>
                    </div>

                    <h2 className="text-xl font-semibold text-white mb-4 font-space-grotesk">
                        Recommended Precautions
                    </h2>
                    <ul className="space-y-2">
                        {results.precautions.map((precaution, index) => (
                            <li key={index} className="text-gray-300 font-space-grotesk">
                                • {precaution}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8">
                        <button
                            onClick={() => router.push('/analysis')}
                            className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors font-space-grotesk"
                        >
                            Back to Analysis
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
} 