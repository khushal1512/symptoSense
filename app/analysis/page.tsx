"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import CategoryCard from "../components/CategoryCard";
import ComprehensiveTestButton from "../components/ComprehensiveTestButton";
import { categories, categorySlugs } from "../data/categories";

export default function AnalysisPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (!session) {
          router.push("/auth");
          return;
        }
      } catch (error) {
        console.error("Error:", error);
        router.push("/auth");
      }
    };

    checkSession();
  }, [router, supabase]);

  return (
    <div className="min-h-screen bg-black">
      <main className="flex-1 pt-12">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white transition-colors duration-200"
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
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </Link>
              <h1 className="text-3xl font-bold text-white font-space-grotesk">Allergy Analysis</h1>
            </div>
            <p className="mt-2 text-gray-400 font-space-grotesk">Choose a category to start your allergy assessment</p>
          </div>

          {/* Comprehensive Test Button */}
          <ComprehensiveTestButton />

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                description={category.description}
                icon={category.icon}
                count={category.count}
                slug={categorySlugs[category.name]}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 