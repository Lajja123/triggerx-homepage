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

    // Add scale pulse to X letter (limited duration)
    masterTimeline.to(
      lettersRef.current[7],
      {
        // 'x' letter
        scale: 1.1,
        duration: 0.8,
        ease: "power2.inOut",
        repeat: 3, // Limited repeats
        yoyo: true,
      },
      3
    );

    // Phase 2: Automatic transition to zoom out after 4 seconds
    masterTimeline.call(
      () => {
        triggerZoomOut();
      },
      [],
      4
    ); // Start zoom out after 6 seconds

    return () => {
      masterTimeline.kill();
    };
  }, []);

  const triggerZoomOut = () => {
    if (isZoomedOut) return;

    console.log("Starting automatic zoom out");
    setIsZoomedOut(true);

    // Quick removal of all letters except X
    lettersRef.current.forEach((letter, index) => {
      if (letter && index !== 7) {
        // Keep X letter (index 7)
        gsap.to(letter, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          ease: "power2.inOut",
          delay: index * 0.01,
        });
      }
    });

    // Smooth transition for X letter
    const xLetter = lettersRef.current[7];
    if (xLetter) {
      // Calculate the scale needed for X
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const letterRect = xLetter.getBoundingClientRect();
      const scaleX = screenWidth / letterRect.width;
      const scaleY = screenHeight / letterRect.height;
      const maxScale = Math.max(scaleX, scaleY) * 0.4;

      // Move X to center of screen
      const centerX = screenWidth / 2 - letterRect.width / 2;
      const centerY = screenHeight / 2 - letterRect.height / 2;
      const currentX = letterRect.left;
      const currentY = letterRect.top;
      const moveX = centerX - currentX;
      const moveY = centerY - currentY;

      // Smooth animation for X
      const tl = gsap.timeline();

      // Phase 1: Move to center and start zoom
      tl.to(xLetter, {
        x: moveX,
        y: moveY,
        scale: maxScale * 0.5,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0.2,
      });

      // Phase 2: Full zoom with glow effect
      tl.to(
        xLetter,
        {
          scale: maxScale,
          duration: 2,
          ease: "power2.out",
        },
        "-=1"
      );

      // Phase 3: Add rotation
      tl.to(
        xLetter,
        {
          rotation: 360,
          duration: 2.5,
          ease: "power2.inOut",
        },
        "-=2"
      );

      // Phase 4: Fade out
      tl.to(
        xLetter,
        {
          opacity: 0,
          scale: maxScale * 1.1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "-=1"
      );

      // Add particle trail effect for X
      createParticleTrail(xLetter, moveX, moveY, maxScale);
    }

    // After X completes its animation, fade out container
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 1,
      ease: "power2.inOut",
      delay: 2.5, // Wait for X's animation to complete
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

  // Enhanced particle trail effect
  const createParticleTrail = (
    targetElement: HTMLElement,
    moveX: number,
    moveY: number,
    maxScale: number
  ) => {
    if (!particlesRef.current) return;

    const rect = targetElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create multiple particle trails
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 bg-white rounded-full opacity-80";
      particle.style.left = centerX + "px";
      particle.style.top = centerY + "px";
      particlesRef.current.appendChild(particle);

      // Animate particles following the zoom path
      gsap.to(particle, {
        x: moveX + (Math.random() - 0.5) * 100,
        y: moveY + (Math.random() - 0.5) * 100,
        scale: maxScale * 0.1,
        opacity: 0,
        duration: 2 + Math.random(),
        ease: "power2.out",
        delay: Math.random() * 0.5,
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
              zIndex: index === 7 ? 10 : 1, // X letter in front
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
