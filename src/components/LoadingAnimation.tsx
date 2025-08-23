"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

const LoadingAnimation = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLDivElement | null)[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // Add loading classes to body and html
    document.body.classList.add("loading-active");
    document.documentElement.classList.add("loading-active");

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
        console.log(
          "Initial letter animation completed, setting up scroll trigger"
        );
        setupScrollTrigger();
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
        duration: 0.5,
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

    return () => {
      tl.kill();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, []);

  const setupScrollTrigger = () => {
    console.log("Setting up GSAP ScrollTrigger...");

    // Create a scrollable container if needed
    const scrollContainer = document.createElement("div");
    scrollContainer.id = "scroll-trigger-container";
    scrollContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 200vh;
      pointer-events: none;
      z-index: -1;
    `;
    document.body.appendChild(scrollContainer);

    // Create ScrollTrigger for the zoom out animation
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: scrollContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        console.log("Scroll progress:", progress);

        // Trigger zoom out when scroll progress reaches 0.1 (10%)
        if (progress > 0.1 && !isZoomedOut) {
          console.log("Scroll threshold reached, triggering zoom out");
          triggerZoomOut();
        }
      },
      onEnter: () => {
        console.log("ScrollTrigger entered");
      },
      onLeave: () => {
        console.log("ScrollTrigger left");
      },
      onEnterBack: () => {
        console.log("ScrollTrigger entered back");
      },
      onLeaveBack: () => {
        console.log("ScrollTrigger left back");
      },
    });

    // Alternative trigger using wheel events with GSAP
    const wheelTrigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // This will trigger on any scroll movement
        if (!isZoomedOut) {
          console.log("Wheel scroll detected, triggering zoom out");
          triggerZoomOut();
        }
      },
      onEnter: () => {
        if (!isZoomedOut) {
          console.log("Wheel trigger entered, triggering zoom out");
          triggerZoomOut();
        }
      },
    });

    // Auto-trigger after 5 seconds if no scroll interaction
    setTimeout(() => {
      if (!isZoomedOut) {
        console.log("Auto-triggering after timeout");
        triggerZoomOut();
      }
    }, 5000);

    // Cleanup function
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      if (wheelTrigger) {
        wheelTrigger.kill();
      }
      const container = document.getElementById("scroll-trigger-container");
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  };

  const triggerZoomOut = () => {
    console.log("triggerZoomOut called, isZoomedOut:", isZoomedOut);
    if (isZoomedOut) return;

    console.log("Starting X letter zoom out animation");
    setIsZoomedOut(true);

    // Clean up ScrollTrigger
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    // Clean up scroll trigger container
    const scrollContainer = document.getElementById("scroll-trigger-container");
    if (scrollContainer && scrollContainer.parentNode) {
      scrollContainer.parentNode.removeChild(scrollContainer);
    }

    // Remove loading classes
    document.body.classList.remove("loading-active");
    document.documentElement.classList.remove("loading-active");
    console.log("Removed loading classes");

    // Quick removal of all letters except X
    lettersRef.current.forEach((letter, index) => {
      if (letter && index !== 7) {
        // Keep X letter (index 7)
        gsap.to(letter, {
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: "power2.inOut",
          delay: index * 0.05,
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
        delay: 0.5,
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

      // Dispatch completion event when animation finishes
      tl.call(() => {
        window.dispatchEvent(new CustomEvent("loadingAnimationComplete"));
      });
    }
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
        isComplete
          ? "opacity-0 pointer-events-none"
          : "opacity-100 pointer-events-auto"
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

      {/* Scroll indicator */}
      {!isZoomedOut && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="text-white/60 text-sm animate-pulse text-center">
            Scroll to trigger X letter animation
          </div>
          <div className="text-white/40 text-xs text-center">
            (Use mouse wheel or touch to scroll)
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingAnimation;
