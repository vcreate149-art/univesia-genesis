import { useMemo } from "react";

// Lightweight CSS particles for light theme
const particlePositions = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 37 + 13) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  delay: `${(i * 0.7) % 4}s`,
  size: `${2 + (i % 3)}px`,
}));

export const Scene3D = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {particlePositions.map((p, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-primary/10 float-animation"
        style={{
          left: p.left,
          top: p.top,
          width: p.size,
          height: p.size,
          animationDelay: p.delay,
        }}
      />
    ))}
  </div>
);
