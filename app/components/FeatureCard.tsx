'use client';

import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ title, description, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="p-6 bg-black bg-opacity-40 backdrop-blur-lg rounded-xl border border-white/10 hover:bg-opacity-50 transition-all duration-300"
    >
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
        className="text-xl font-semibold text-white mb-2 drop-shadow-lg font-space-grotesk"
      >
        {title}
      </motion.h3>
      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        className="text-white/90 font-inter"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default FeatureCard; 