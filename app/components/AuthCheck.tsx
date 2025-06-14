'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCheck() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // If user is on landing page and is authenticated, redirect to dashboard
        if (session && pathname === '/') {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('api_key')
            .eq('id', session.user.id)
            .single();

          if (profile?.api_key) {
            router.push('/dashboard');
          } else {
            router.push('/onboarding');
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };

    checkAuth();
  }, [pathname, router]);

  return null;
} 