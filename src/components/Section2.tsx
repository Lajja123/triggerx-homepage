"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Boxdata from "./data/Boxdata";
import Image from "next/image";
import { Typography, H1, H3, Body } from "./ui/Typography";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section2() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main title animation
      const titleElement = titleRef.current;
      if (titleElement) {
        gsap.fromTo(
          titleElement,
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: titleElement,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleCardHover = (index: number) => {
    setActiveIndex(index);

    // Animate the hovered card

    // Blur and dim other cards
    cardsRef.current.forEach((card, i) => {
      if (i !== index && card) {
        gsap.to(card, {
          scale: 0.95,
          filter: "blur(2px)",
          opacity: 0.4,
          zIndex: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  };

  const handleCardLeave = () => {
    setActiveIndex(null);

    // Reset all cards
    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.to(card, {
          scale: 1,
          filter: "blur(0px)",
          opacity: 1,
          zIndex: 1,
          duration: 0.4,
          ease: "power2.out",
        });

        // Remove glow effect
        const cardElement = card.querySelector(".grid-card");
        if (cardElement) {
          gsap.to(cardElement, {
            boxShadow: "0 0 10px rgba(var(--brand-d-rgb), 0.1)",
            duration: 0.3,
          });
        }
      }
    });
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);

    // Enhanced click animation with ripple effect
    const element = cardsRef.current[index];
    if (element) {
      // Click animation
      gsap.to(element, {
        scale: 1.1,
        duration: 0.15,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });

      // Ripple effect
      const ripple = document.createElement("div");
      ripple.className =
        "absolute inset-0 rounded-2xl bg-[var(--brand-d)]/20 scale-0";
      element.appendChild(ripple);
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden "
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <section className="relative z-10 w-[90%] max-w-[1600px] mx-auto py-20">
        {/* Main title section */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="relative inline-block">
            <H1 className="mb-6 flex items-center justify-center gap-4">
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Trigger
                </span>
              </span>
              <div className="relative">
                <Image
                  src="/letters/x.png"
                  alt="X"
                  width={100}
                  height={100}
                  className="w-16 h-16 lg:w-20 lg:h-20 inline-block animate-pulse"
                />
              </div>
              <span
                className="relative inline-block animate-bounce text-[var(--brand-c)]"
                style={{ animationDelay: "0.5s" }}
              >
                ?
              </span>
            </H1>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="relative">
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Boxdata.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="relative group cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={handleCardLeave}
                onClick={() => handleCardClick(index)}
              >
                {/* Grid Card */}
                <div
                  className={`grid-card relative p-6 rounded-2xl border-2 transition-all duration-500 backdrop-blur-md h-full ${
                    activeIndex === index
                      ? "border-[var(--brand-d)] bg-gradient-to-br from-[var(--brand-d)]/20 via-[var(--brand-a)]/15 to-[var(--brand-d)]/10 shadow-2xl shadow-[var(--brand-d)]/30"
                      : "border-[#2a2a2a] bg-gradient-to-br from-[#1a1a1a]/90 via-[#252525]/80 to-[#1a1a1a]/90 hover:border-[var(--brand-d)]/50 hover:shadow-lg hover:shadow-[var(--brand-d)]/20"
                  }`}
                >
                  {/* Enhanced Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                      activeIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background: `radial-gradient(circle at center, var(--brand-d)30 0%, transparent 70%)`,
                    }}
                  />

                  {/* Animated border */}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                      activeIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div className="relative z-10">
                    {/* Enhanced Header */}
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          activeIndex === index
                            ? "bg-gradient-to-br from-[var(--brand-d)] to-[var(--brand-a)] text-white shadow-lg"
                            : "bg-gradient-to-br from-[#2a2a2a] to-[#3a3a3a] text-gray-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {activeIndex === index && (
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 bg-[var(--brand-d)] rounded-full animate-ping"
                            style={{ animationDelay: "0s" }}
                          />
                          <div
                            className="w-2 h-2 bg-[var(--brand-a)] rounded-full animate-ping"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="w-2 h-2 bg-[var(--brand-d)] rounded-full animate-ping"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`transition-all duration-500 ${
                        activeIndex === index ? "opacity-100" : "opacity-80"
                      }`}
                    >
                      <H3
                        className={`mb-3 transition-colors duration-300 ${
                          activeIndex === index
                            ? "text-[var(--brand-d)] text-xl font-bold"
                            : "text-white text-lg"
                        }`}
                      >
                        {item.title}
                      </H3>
                      <Body
                        color="secondary"
                        className="text-sm leading-relaxed transition-all duration-500 text-gray-300"
                      >
                        {item.description}
                      </Body>
                    </div>

                    {/* Interactive indicator */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
