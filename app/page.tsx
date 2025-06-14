'use client';

import Image from "next/image";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import FeatureCard from './components/FeatureCard';

const Scene = dynamic(() => import('./components/Scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 opacity-20" />
});

const features = [
  {
    title: "AI-Powered Allergy Detection",
    description: "Advanced machine learning algorithms analyze your symptoms and medical history to provide accurate allergy predictions"
  },
  {
    title: "Cost-Effective Diagnosis",
    description: "Save up to 80% compared to traditional allergy testing methods while getting comprehensive results"
  },
  {
    title: "Personalized Recommendations",
    description: "Get detailed guidance on allergens to avoid and recommended medications based on your specific condition"
  },
  {
    title: "Comprehensive Questionnaire",
    description: "Our detailed symptom assessment covers all aspects of your condition, from environmental triggers to food sensitivities"
  },
  {
    title: "Real-time Results",
    description: "Get instant allergy predictions and recommendations without waiting for lab results or doctor appointments"
  },
  {
    title: "Expert-Backed Analysis",
    description: "Our AI system is trained on millions of verified allergy cases and validated by medical professionals"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Neon gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 opacity-20 animate-gradient" />
      
      {/* DNA Animation */}
      <Scene />
      
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center">
        {/* Logo placeholder - replace with your actual logo */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg font-space-grotesk tracking-tight">
            SymptoSense
          </h1>
        </div>

        {/* Slogan */}
        <h2 className="text-2xl md:text-4xl font-light text-white mb-12 tracking-wide drop-shadow-lg font-outfit">
          Changing Diagnosis Forever
        </h2>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/auth" className="px-8 py-3 bg-white text-emerald-600 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 font-inter">
            Get Started
          </Link>
          <button className="px-8 py-3 border-2 border-white text-white hover:text-black rounded-full font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105 font-inter">
            Learn More
          </button>
        </div>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
