"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Boxdata from "./Boxdata";
import Image from "next/image";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section2() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background elements
      const bgElements = sectionRef.current?.querySelectorAll(".bg-element");
      bgElements?.forEach((el, index) => {
        gsap.to(el, {
          y: -50 + index * 30,
          x: 20 - index * 15,
          rotation: 10 - index * 5,
          duration: 4 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

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

      // Animated background gradient
      const animatedBg = sectionRef.current?.querySelector(".animated-bg");
      if (animatedBg) {
        gsap.to(animatedBg, {
          backgroundPosition: "200% 200%",
          duration: 25,
          repeat: -1,
          ease: "none",
        });
      }

      // Interactive cards with enhanced animations
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Initial card animation
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 150,
            scale: 0.7,
            rotationY: 45,
            rotationX: 15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 1,
            delay: index * 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Mouse move 3D effect
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 15;
          const rotateY = (centerX - x) / 15;

          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        // Reset rotation on mouse leave
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });

      // Particle system
      const particles = sectionRef.current?.querySelectorAll(".particle");
      particles?.forEach((particle, index) => {
        gsap.to(particle, {
          y: -150,
          x: Math.random() * 300 - 150,
          opacity: 0,
          duration: 4 + Math.random() * 3,
          repeat: -1,
          delay: index * 0.2,
          ease: "power1.out",
        });
      });

      // Progress indicator
      const progressBar = sectionRef.current?.querySelector(".progress-bar");
      if (progressBar) {
        gsap.to(progressBar, {
          width: "100%",
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleCardHover = (index: number) => {
    setHoveredCard(index);

    // Animate the hovered card
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleCardLeave = (index: number) => {
    setHoveredCard(null);

    // Reset the card
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);

    // Enhanced click animation
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background */}
      <div className="animated-bg absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#1a1a1a] bg-[length:400%_400%]"></div>

      {/* Floating background elements */}
      <div className="bg-element absolute top-20 left-10 w-24 h-24 bg-[#5047FF]/10 rounded-full blur-xl"></div>
      <div className="bg-element absolute top-40 right-20 w-32 h-32 bg-[#F8FF7C]/10 rounded-full blur-2xl"></div>
      <div className="bg-element absolute bottom-40 left-1/4 w-20 h-20 bg-[#5047FF]/5 rounded-full blur-lg"></div>
      <div className="bg-element absolute top-1/2 right-1/4 w-16 h-16 bg-[#F8FF7C]/5 rounded-full blur-md"></div>

      {/* Particle system */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-[#5047FF]/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Mouse follower */}
      <div
        className="fixed w-4 h-4 bg-[#5047FF]/20 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${hoveredCard !== null ? 2 : 1})`,
        }}
      />

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#2a2a2a] z-50">
        <div className="progress-bar h-full bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] w-0"></div>
      </div>

      <section className="relative z-10 w-[90%] max-w-[1600px] mx-auto py-20">
        {/* Main title section */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="relative inline-block">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              <span className="relative">
                <span className="relative z-10">Trigger</span>
                <div className="absolute inset-0 bg-[#5047FF]/20 blur-xl rounded-full scale-150"></div>
              </span>
              <div className="relative">
                <Image
                  src="/letters/x.png"
                  alt="X"
                  width={100}
                  height={100}
                  className="w-16 h-16 lg:w-20 lg:h-20 inline-block animate-pulse"
                />
                <div className="absolute inset-0 bg-[#F8FF7C]/20 blur-lg rounded-full scale-150"></div>
              </div>
              <span
                className="relative inline-block animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                ?
                <div className="absolute inset-0 bg-[#5047FF]/20 blur-lg rounded-full scale-150"></div>
              </span>
            </h1>
            <p className="text-[#A2A2A2] text-lg md:text-xl max-w-2xl mx-auto">
              Discover the power of decentralized automation across multiple
              chains
            </p>
          </div>
        </div>

        {/* Interactive cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {Boxdata.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`group cursor-pointer relative p-8 rounded-2xl border transition-all duration-300 ${
                activeIndex === index
                  ? "border-[#5047FF] shadow-2xl shadow-[#5047FF]/20 bg-gradient-to-br from-[#1a1a1a] to-[#252525]"
                  : "border-[#2a2a2a] bg-gradient-to-br from-[#1a1a1a] to-[#252525] hover:border-[#5047FF]/50"
              }`}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardLeave(index)}
              onClick={() => handleCardClick(index)}
            >
              {/* Card background glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${
                    activeIndex === index ? "#5047FF" : "#F8FF7C"
                  }20 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                {/* Media section with enhanced styling */}
                <div className="mb-6 relative overflow-hidden rounded-xl">
                  {item.mediaType === "video" && (
                    <div className="relative group">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                      >
                        <source src={item.imageSrc} type="video/webm" />
                      </video>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4 w-8 h-8 bg-[#5047FF]/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content section */}
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-[#5047FF] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>

                {/* Interactive indicator */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#5047FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#5047FF]/30 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive stats section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "100%", label: "Decentralized", color: "#5047FF" },
            { number: "24/7", label: "Active Monitoring", color: "#F8FF7C" },
            { number: "∞", label: "Possibilities", color: "#5047FF" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl border border-[#2a2a2a] bg-gradient-to-br from-[#1a1a1a] to-[#252525] hover:border-[#5047FF]/50 transition-all duration-300 group cursor-pointer"
              onClick={() => {
                gsap.to(`[data-stat="${index}"]`, {
                  scale: 1.1,
                  duration: 0.2,
                  ease: "power2.out",
                  yoyo: true,
                  repeat: 1,
                });
              }}
              data-stat={index}
            >
              <div
                className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                style={{ color: stat.color }}
              >
                {stat.number}
              </div>
              <div className="text-[#A2A2A2] text-lg group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl border border-[#2a2a2a] bg-gradient-to-r from-[#1a1a1a] to-[#252525] hover:border-[#5047FF]/50 transition-all duration-300 group cursor-pointer">
            <div className="w-12 h-12 bg-[#5047FF]/20 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#5047FF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg">
                Ready to get started?
              </div>
              <div className="text-[#A2A2A2] text-sm">
                Explore our documentation and start building
              </div>
            </div>
            <svg
              className="w-5 h-5 text-[#5047FF] group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
