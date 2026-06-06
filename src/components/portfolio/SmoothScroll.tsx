"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register the scroll monitoring plugin with the core GSAP engine
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Initialize Lenis with modern 2025/2026 ergonomic scrolling parameters
    const lenis = new Lenis({
      duration: 1.2,                     // Time duration for the smooth translation slide (in seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // High-end cinematic inertia equation
      orientation: "vertical",           // Standard up-down vertical user inputs tracking
      smoothWheel: true,                 // Smooth layout movement translations for mouse wheels
    });

    // 2. Synchronize ScrollTrigger execution passes with every Lenis scroll step
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Drive Lenis' RequestAnimationFrame loop directly inside the GSAP engine frame tick handler
    const updateGsapTicker = (time: number) => {
      lenis.raf(time * 1000); // Feed milliseconds into the calculation matrix
    };
    
    gsap.ticker.add(updateGsapTicker);
    
    // Disable lag smoothing to ensure animations don't stutter after long idle periods
    gsap.ticker.lagSmoothing(0);

    // 4. Memory cleanup on component unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateGsapTicker);
    };
  }, []);

  return <>{children}</>;
}