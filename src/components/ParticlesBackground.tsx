"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// The tsparticles bundle is only downloaded once a canvas is actually needed.
const ParticlesCanvas = dynamic(() => import("@/components/ParticlesCanvas"), {
  ssr: false,
});

// Phones / touch devices and reduced-motion users get no particles:
// the hover effects don't work on touch, and the animation costs a lot of CPU
// on low-end phones (this is what PageSpeed's mobile test measures).
const DISABLED_QUERY =
  "(max-width: 767px), (pointer: coarse), (prefers-reduced-motion: reduce)";

function whenIdle(cb: () => void) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(cb, { timeout: 3000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(cb, 1500);
  return () => clearTimeout(id);
}

export default function ParticlesBackground({
  id = "tsparticles",
}: {
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  // Stays true once the canvas has been shown, so scrolling back doesn't re-init.
  const [mounted, setMounted] = useState(false);

  // Start only on capable devices, after the page has finished its main work.
  useEffect(() => {
    if (window.matchMedia(DISABLED_QUERY).matches) return;
    return whenIdle(() => setEnabled(true));
  }, []);

  // Track visibility so off-screen canvases are not mounted / are paused.
  useEffect(() => {
    if (!enabled || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: "200px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 pointer-events-none">
      {mounted && (
        <div className="absolute inset-0 pointer-events-auto">
          <ParticlesCanvas id={id} active={visible} />
        </div>
      )}
    </div>
  );
}
