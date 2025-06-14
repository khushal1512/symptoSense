'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import { foodDrugAllergies } from '../../../questions/food-drug';
import { contactPlantAllergies } from '../../../questions/contact-plant';
import { insectEnvironmentalAllergies } from '../../../questions/insect-environmental';
import { use } from 'react';
import { Space_Grotesk } from 'next/font/google';
import { analyzeAllergyResponses } from '../../actions/analyzeAllergyResponses';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

interface AllergyData {
  name: string;
  description: string;
  questions: Array<{
    id: number;
    text: string;
    category: string;
  }>;
}

export default function CategoryAnalysisPage({ params }: { params: { category: string } }) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
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
  const category = use(Promise.resolve(params.category));

  const subCategories = {
    food: ['Shellfish', 'Peanuts', 'Tree Nuts', 'Dairy', 'Eggs', 'Soy', 'Wheat'],
    insect: ['Bees', 'Wasps', 'Ants', 'Mosquitoes'],
    environmental: ['Pollen', 'Dust Mites', 'Pet Dander', 'Mold'],
    // Add more categories and sub-categories as needed
  };

  const questions = selectedSubCategory ? [
    { text: `Do you experience any symptoms related to ${selectedSubCategory}?`, category: selectedSubCategory },
    { text: `Have you been diagnosed with any conditions related to ${selectedSubCategory}?`, category: selectedSubCategory },
    { text: `Do you take any medications for ${selectedSubCategory}?`, category: selectedSubCategory },
    // Add more questions as needed
  ] : [];

  const handleSubCategorySelect = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowAdditionalInfo(false);
  };

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
        
        // Store result in sessionStorage before navigation
        sessionStorage.setItem('analysisResult', JSON.stringify(analysisResult));
        
        // Add a small delay to ensure storage is complete
        await new Promise(resolve => setTimeout(resolve, 100));
        
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

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (!session) {
          router.push('/auth');
          return;
        }
      } catch (error) {
        console.error('Error:', error);
        router.push('/auth');
      }
    };

    checkSession();
  }, [router, supabase]);

  const handleStartTest = (allergyName: string) => {
    // TODO: Navigate to test page with specific allergy
    console.log('Starting test for:', allergyName);
  };

  if (analysisResult) {
    return (
      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="flex items-center justify-between h-16">
              {/* Glass effect container */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-lg border-b border-white/10" />
              
              {/* Content */}
              <div className="relative flex justify-between items-center w-full">
                <div className="flex items-center">
                  <Link href="/analysis" className="flex items-center gap-2 text-white hover:text-emerald-400 font-space-grotesk text-lg font-semibold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-24">
          <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-24 xl:px-32 2xl:px-40">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white font-space-grotesk">
                {category.charAt(0).toUpperCase() + category.slice(1)} Allergies
              </h1>
              <p className="mt-2 text-gray-400 font-space-grotesk">
                Select a specific allergy to test for
              </p>
            </div>

            {/* Allergy Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subCategories[category as keyof typeof subCategories]?.map((subCategory) => (
                <motion.div
                  key={subCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-white mb-2 font-space-grotesk">
                    {subCategory}
                  </h3>
                  <button
                    onClick={() => handleSubCategorySelect(subCategory)}
                    className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors font-space-grotesk"
                  >
                    Test Now
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Glass effect container */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-lg border-b border-white/10" />
            
            {/* Content */}
            <div className="relative flex justify-between items-center w-full">
              <div className="flex items-center">
                <Link href="/analysis" className="flex items-center gap-2 text-white hover:text-emerald-400 font-space-grotesk text-lg font-semibold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Back to Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-24 xl:px-32 2xl:px-40">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white font-space-grotesk">
              {category.charAt(0).toUpperCase() + category.slice(1)} Allergies
            </h1>
            <p className="mt-2 text-gray-400 font-space-grotesk">
              Select a specific allergy to test for
            </p>
          </div>

          {/* Allergy Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subCategories[category as keyof typeof subCategories]?.map((subCategory) => (
              <motion.div
                key={subCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-2 font-space-grotesk">
                  {subCategory}
                </h3>
                <button
                  onClick={() => handleSubCategorySelect(subCategory)}
                  className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors font-space-grotesk"
                >
                  Test Now
                </button>
              </motion.div>
            ))}
          </div>

          {/* <div className="w-full h-1 bg-white/10 rounded-full mb-4">
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
                Please provide any additional information that might help in analyzing your condition.
              </p>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg p-4 text-white font-space-grotesk resize-none"
                placeholder="Enter additional information here..."
              />
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mt-4 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg transition-colors font-space-grotesk hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </motion.div>
          )}
        </div> */}
        </div>
      </main>
    </div>
  );
} 