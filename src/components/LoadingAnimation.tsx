"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

// Import letter images
const letters = [
  "/letters/t.png",
  "/letters/r.png",
  "/letters/i.png",
  "/letters/g.png",
  "/letters/g.png",
  "/letters/e.png",
  "/letters/r.png",
  "/letters/x.png",
];

// Global state for loading completion
let loadingComplete = false;
const loadingCallbacks: (() => void)[] = [];

export const onLoadingComplete = (callback: () => void) => {
  if (loadingComplete) {
    callback();
  } else {
    loadingCallbacks.push(callback);
  }
};

const LoadingAnimation = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLDivElement | null)[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP
    gsap.set(lettersRef.current, {
      scale: 0,
      rotation: 180,
      opacity: 0,
      y: 100,
      transformOrigin: "center center",
    });

    // Create timeline for the entire animation
    const masterTimeline = gsap.timeline({
      onComplete: () => {
        console.log("Master timeline completed");
      },
    });

    // Create particle effects
    createParticles();

    // Phase 1: Letter reveal animation
    masterTimeline.to(
      lettersRef.current,
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        stagger: {
          each: 0.15,
          from: "start",
        },
      },
      0.5
    );

    // Add floating animation to letters (parallel)
    lettersRef.current.forEach((letter, index) => {
      if (letter) {
        gsap.to(letter, {
          y: -10,
          duration: 2,
          ease: "power2.inOut",
          repeat: 3, // Limited repeats instead of infinite
          yoyo: true,
          delay: index * 0.1,
        });
      }
    });

    // Add rotation effects to specific letters
    masterTimeline.to(
      lettersRef.current[2],
      {
        // 'i' letter
        rotation: 360,
        duration: 1.5,
        ease: "power2.out",
      },
      2
    );

    masterTimeline.to(
      lettersRef.current[6],
      {
        // 'r' letter
        rotation: -360,
        duration: 1.5,
        ease: "power2.out",
      },
      2.2
    );

    // Phase 2: Automatic transition to zoom out after 4 seconds
    masterTimeline.call(
      () => {
        triggerZoomOut();
      },
      [],
      4
    ); // Start zoom out after 4 seconds

    return () => {
      masterTimeline.kill();
    };
  }, []);

  const triggerZoomOut = () => {
    if (isZoomedOut) return;

    console.log("Starting automatic zoom out");
    setIsZoomedOut(true);

    // Remove all letters
    lettersRef.current.forEach((letter, index) => {
      if (letter) {
        gsap.to(letter, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          ease: "power2.inOut",
          delay: index * 0.01,
        });
      }
    });

    // After letters fade out, fade out container
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0,
      ease: "power2.inOut",
      delay: 1, // Wait for letters to fade out
      onComplete: () => {
        setIsComplete(true);
        loadingComplete = true;
        console.log("Loading animation completed");
        // Notify all waiting callbacks
        loadingCallbacks.forEach((callback) => callback());
        loadingCallbacks.length = 0;
      },
    });
  };

  const createParticles = () => {
    if (!particlesRef.current) return;

    // Create particle elements
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 bg-white rounded-full opacity-60";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particlesRef.current.appendChild(particle);

      // Animate particles with limited duration
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: 0,
        duration: 3 + Math.random() * 2,
        ease: "power2.out",
        repeat: 2, // Limited repeats instead of infinite
        delay: Math.random() * 2,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ zIndex: 50 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 transition-all duration-1000" />

      {/* Particle effects */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Letters container */}
      <div className="flex gap-4 items-end h-[230px] letters-container relative">
        {letters.map((letter, index) => (
          <div
            key={index}
            ref={(el) => {
              lettersRef.current[index] = el;
            }}
            className="w-max h-[230px] relative opacity-0 scale-0 letter-item"
            style={{
              width: "auto",
              height: "100%",
              zIndex: 1, // All letters have same z-index now
              transform: "scale(0) rotate(180deg) translateY(100px)",
              transformOrigin: "center center",
            }}
          >
            <div className="h-full relative overflow-hidden rounded-lg transition-colors duration-300 flex items-center justify-center">
              <Image
                src={letter}
                alt={`Letter ${letter
                  .charAt(letter.lastIndexOf("/") + 1)
                  .toUpperCase()}`}
                width={230}
                height={230}
                className="h-full w-auto transition-opacity duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingAnimation;
