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
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIsComplete(true);
          loadingComplete = true;
          // Notify all waiting callbacks
          loadingCallbacks.forEach((callback) => callback());
          loadingCallbacks.length = 0; // Clear the array
        }, 2000);
      },
    });

    // Create particle effects
    createParticles();

    // Staggered letter reveal with unique effects
    tl.to(
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

    // Add floating animation to letters
    lettersRef.current.forEach((letter, index) => {
      if (letter) {
        gsap.to(letter, {
          y: -10,
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.1,
        });
      }
    });

    // Add rotation effects to specific letters
    tl.to(
      lettersRef.current[2],
      {
        // 'i' letter
        rotation: 360,
        duration: 1.5,
        ease: "power2.out",
      },
      2
    );

    tl.to(
      lettersRef.current[6],
      {
        // 'r' letter
        rotation: -360,
        duration: 1.5,
        ease: "power2.out",
      },
      2.2
    );

    // Add scale pulse to X letter
    tl.to(
      lettersRef.current[7],
      {
        // 'x' letter
        scale: 1.1,
        duration: 0.8,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      },
      3
    );

    // Add 3D perspective effects
    tl.to(
      containerRef.current,
      {
        perspective: 1000,
        duration: 1,
      },
      0
    );

    // Add tilt effect to container
    tl.to(
      containerRef.current,
      {
        rotationX: 5,
        rotationY: 5,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      },
      2
    );

    return () => {
      tl.kill();
    };
  }, []);

  const createParticles = () => {
    if (!particlesRef.current) return;

    // Create particle elements
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 bg-white rounded-full opacity-60";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particlesRef.current.appendChild(particle);

      // Animate particles
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: 0,
        duration: 3 + Math.random() * 2,
        ease: "power2.out",
        repeat: -1,
        delay: Math.random() * 2,
      });
    }
  };

  const resetAnimation = () => {
    setIsComplete(false);
    loadingComplete = false;
    gsap.killTweensOf(lettersRef.current);
    gsap.killTweensOf(containerRef.current);

    // Reset all elements
    gsap.set(lettersRef.current, {
      scale: 0,
      rotation: 180,
      opacity: 0,
      y: 100,
    });

    gsap.set(containerRef.current, {
      perspective: 0,
      rotationX: 0,
      rotationY: 0,
    });

    // Clear particles
    if (particlesRef.current) {
      particlesRef.current.innerHTML = "";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 transition-all duration-1000" />

      {/* Particle effects */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Letters container */}
      <div className="flex gap-4 items-end h-[230px] relative z-10">
        {letters.map((letter, index) => (
          <div
            key={index}
            ref={(el) => {
              lettersRef.current[index] = el;
            }}
            className="w-max h-[230px] relative opacity-0 scale-0"
            style={{
              width: "auto",
              height: "100%",
              zIndex: index === 7 ? 10 : 1, // X letter in front
              transform: "scale(0) rotate(180deg) translateY(100px)",
            }}
          >
            <div className="h-full relative overflow-hidden rounded-lg  transition-colors duration-300 flex items-center justify-center">
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
