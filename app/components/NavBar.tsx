import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import SignOutButton from './SignOutButton';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

interface NavBarProps {
    title?: string;
    onSignOut?: () => Promise<void>;
}

export default function NavBar({ title = "SymptoSense", onSignOut }: NavBarProps) {
    const router = useRouter();
    const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/auth');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-lg border-b border-white/10 mx-2">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-2xl font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
                            {title}
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <SignOutButton onSignOut={() => Promise.resolve(handleSignOut())} />
                    </div>
                </div>
            </div>
        </header>
    );
} 