import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FloatingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={150}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00FFFF" size={0.03} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

const Scene3DCanvas = () => (
  <div className="w-full h-full absolute inset-0 pointer-events-none">
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      dpr={[1, 1.5]}
    >
      <FloatingParticles />
    </Canvas>
  </div>
);

export default Scene3DCanvas;
