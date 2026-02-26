import { useMemo, lazy, Suspense } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Stable positions to avoid CLS from random values
const particlePositions = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 37 + 13) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  delay: `${(i * 0.7) % 3}s`,
  duration: `${2 + (i * 1.3) % 4}s`,
}));

// CSS-only particle fallback for mobile (no WebGL)
const CSSParticles = () => (
  <div className="w-full h-full absolute inset-0 pointer-events-none overflow-hidden">
    {particlePositions.map((p, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
        style={{
          left: p.left,
          top: p.top,
          animationDelay: p.delay,
          animationDuration: p.duration,
        }}
      />
    ))}
  </div>
);

// Lazy-loaded 3D scene (only imported on desktop)
const LazyScene = lazy(() => import("@/components/Scene3DCanvas"));

export const Scene3D = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <CSSParticles />;
  }

  return (
    <Suspense fallback={<CSSParticles />}>
      <LazyScene />
    </Suspense>
  );
};
