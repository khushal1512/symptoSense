'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Note from '../components/Note';
import QuickActionsCard from '../components/QuickActionsCard';
import DashboardCard from '../components/DashboardCard';
import WelcomeCard from '../components/WelcomeCard';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (!session) {
          router.push("/auth");
          return;
        }

        // Fetch user's full name from user_profiles table
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          setUserName('');
        } else {
          setUserName(profile.full_name || '');
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
      
      {/* Main Content */}
      <div className="w-full p-6 pt-16">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white font-space-grotesk">Dashboard</h1>
        </div>

        {/* Notification Card */}
        <div className="mb-8 text-center">
          <Note type='warning'>
            Complete your profile for a better experience
          </Note>
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <WelcomeCard userName={userName} />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <DashboardCard
            title="Profile"
            description="Manage your personal information and preferences"
            actionText="View Profile"
            onClick={() => router.push('/dashboard/profile')}
          />

          {/* API Key Card */}
          <DashboardCard
            title="API Key"
            description="Your Gemini API key for AI-powered analysis"
            actionText="Manage API Key"
            onClick={() => router.push('/dashboard/profile')}
          />

          {/* Quick Actions Card */}
          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
} 