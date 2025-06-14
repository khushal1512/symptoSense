import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function ComprehensiveTestButton() {
  const router = useRouter();

  return (
    <div className="mb-8">
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${spaceGrotesk.className}`}
        onClick={() => {
          router.push('/analysis/comprehensive');
        }}
      >
        <span className="text-2xl">🔍</span>
        <span>Start Comprehensive Allergy Test</span>
      </motion.button>
    </div>
  );
} 