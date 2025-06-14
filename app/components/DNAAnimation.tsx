'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'maath';

const DNAAnimation = () => {
  const ref = useRef<THREE.Points>(null);
  
  // Generate points in a double helix pattern
  const points = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const radius = 1.5;
    const height = 3;
    
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const x = Math.cos(t) * radius;
      const y = (i / count) * height - height / 2;
      const z = Math.sin(t) * radius;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group>
      <Points
        ref={ref}
        positions={points}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#00ff00"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default DNAAnimation; 