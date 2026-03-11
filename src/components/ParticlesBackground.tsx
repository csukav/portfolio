"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 120,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: ["grab", "bubble"],
      },
      onClick: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      grab: {
        distance: 160,
        links: {
          opacity: 0.5,
        },
      },
      bubble: {
        distance: 120,
        size: 6,
        duration: 0.4,
        opacity: 0.85,
      },
      repulse: {
        distance: 200,
        duration: 0.6,
      },
    },
  },
  particles: {
    color: {
      value: ["#0071e3", "#42a5f5", "#a8c8fa", "#d2d2d7"],
    },
    links: {
      color: "#0071e3",
      distance: 140,
      enable: true,
      opacity: 0.12,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: true,
      speed: 0.8,
      straight: false,
    },
    number: {
      density: { enable: true, width: 1920, height: 1080 },
      value: 80,
    },
    opacity: {
      value: { min: 0.15, max: 0.55 },
      animation: {
        enable: true,
        speed: 0.8,
        sync: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3.5 },
      animation: {
        enable: true,
        speed: 2,
        sync: false,
      },
    },
  },
  detectRetina: true,
};

export default function ParticlesBackground({ id = "tsparticles" }: { id?: string }) {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  if (!engineReady) return null;

  return (
    <Particles
      id={id}
      className="absolute inset-0 w-full h-full"
      options={options}
    />
  );
}
