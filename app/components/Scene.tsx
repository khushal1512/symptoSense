'use client';

import { Canvas } from '@react-three/fiber';
import DNAAnimation from './DNAAnimation';

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <DNAAnimation />
      </Canvas>
    </div>
  );
} 