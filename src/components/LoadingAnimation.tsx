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
    const tl = gsap.timeline({
      onComplete: () => {
        // Set up scroll listener for zoom out
        setupScrollListener();

        // Also check if page is scrollable and add fallback
        setTimeout(() => {
          checkScrollability();
        }, 1000);
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

    return () => {
      tl.kill();
    };
  }, []);

  const checkScrollability = () => {
    // Check if the page is scrollable
    const isScrollable =
      document.documentElement.scrollHeight > window.innerHeight;
    console.log("Page scrollable:", isScrollable);

    if (!isScrollable) {
      // If page is not scrollable, add a temporary scrollable element
      const tempDiv = document.createElement("div");
      tempDiv.style.height = "200vh";
      tempDiv.style.position = "absolute";
      tempDiv.style.top = "0";
      tempDiv.style.left = "0";
      tempDiv.style.width = "100%";
      tempDiv.style.pointerEvents = "none";
      tempDiv.style.zIndex = "-1";
      document.body.appendChild(tempDiv);

      // Remove it after animation
      setTimeout(() => {
        if (tempDiv.parentNode) {
          tempDiv.parentNode.removeChild(tempDiv);
        }
      }, 10000);
    }
  };

  const setupScrollListener = () => {
    let hasTriggered = false;

    const triggerIfNotAlready = (eventType: string) => {
      console.log(`Trigger attempt from: ${eventType}`);
      if (!hasTriggered && !isZoomedOut) {
        console.log(`Triggering zoom out from: ${eventType}`);
        hasTriggered = true;
        triggerZoomOut();
        // Clean up all listeners
        cleanupListeners();
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener("scroll", () => triggerIfNotAlready("scroll"));
      window.removeEventListener("mousemove", () =>
        triggerIfNotAlready("mousemove")
      );
      window.removeEventListener("click", () => triggerIfNotAlready("click"));
      window.removeEventListener("keydown", () =>
        triggerIfNotAlready("keydown")
      );
      window.removeEventListener("touchstart", () =>
        triggerIfNotAlready("touchstart")
      );
      window.removeEventListener("wheel", () => triggerIfNotAlready("wheel"));
    };

    // Multiple trigger methods for better reliability
    window.addEventListener("scroll", () => triggerIfNotAlready("scroll"), {
      passive: true,
    });
    window.addEventListener(
      "mousemove",
      () => triggerIfNotAlready("mousemove"),
      { passive: true }
    );
    window.addEventListener("click", () => triggerIfNotAlready("click"), {
      passive: true,
    });
    window.addEventListener("keydown", () => triggerIfNotAlready("keydown"), {
      passive: true,
    });
    window.addEventListener(
      "touchstart",
      () => triggerIfNotAlready("touchstart"),
      { passive: true }
    );
    window.addEventListener("wheel", () => triggerIfNotAlready("wheel"), {
      passive: true,
    });

    // Auto-trigger after 3 seconds if no interaction
    setTimeout(() => {
      if (!hasTriggered && !isZoomedOut) {
        console.log("Auto-triggering after timeout");
        hasTriggered = true;
        triggerZoomOut();
        cleanupListeners();
      }
    }, 3000);

    // Also trigger on any DOM change or resize
    const observer = new MutationObserver(() => {
      if (!hasTriggered && !isZoomedOut) {
        console.log("Triggering from DOM mutation");
        hasTriggered = true;
        triggerZoomOut();
        cleanupListeners();
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup function
    return cleanupListeners;
  };

  const triggerZoomOut = () => {
    if (isZoomedOut) return;

    setIsZoomedOut(true);

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

      {/* Scroll indicator */}
      {!isZoomedOut && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="text-white/60 text-sm animate-pulse text-center">
            Scroll, click, or press any key to continue
          </div>
          <button
            onClick={() => {
              if (!isZoomedOut) {
                triggerZoomOut();
              }
            }}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default LoadingAnimation;
