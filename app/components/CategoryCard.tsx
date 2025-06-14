import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

interface CategoryCardProps {
  name: string;
  description: string;
  icon: string;
  count: number;
  slug: string;
  index: number;
}

export default function CategoryCard({ name, description, icon, count, slug, index }: CategoryCardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-6 hover:border-emerald-500/50 transition-colors duration-200 ${spaceGrotesk.className}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <p className="text-sm text-emerald-400">{count} tests available</p>
        </div>
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <button
        onClick={() => router.push(`/analysis/${slug}`)}
        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      >
        Test {name}
      </button>
    </motion.div>
  );
} 