"use client";
import React, { useEffect, useRef, useState } from "react";
import AnimatedButton from "@/components/AnimatedButton";
import eigenlayer from "../assets/M-Eigen.svg";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section1() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background gradient
      const animatedBg = sectionRef.current?.querySelector(".animated-bg");
      if (animatedBg) {
        gsap.to(animatedBg, {
          backgroundPosition: "200% 200%",
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      }

      // Floating background elements
      const floatingElements =
        sectionRef.current?.querySelectorAll(".floating-element");
      floatingElements?.forEach((el, index) => {
        gsap.to(el, {
          y: -40 + index * 25,
          x: 30 - index * 20,
          rotation: 15 - index * 8,
          duration: 5 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Main headline animation with text reveal
      const headlineElement = headlineRef.current;
      if (headlineElement) {
        gsap.fromTo(
          headlineElement,
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: headlineElement,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // CTA buttons with enhanced animations
      const ctaElement = ctaRef.current;
      if (ctaElement) {
        gsap.fromTo(
          ctaElement,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaElement,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Particle system animation
      const particles = sectionRef.current?.querySelectorAll(".particle");
      particles?.forEach((particle, index) => {
        gsap.to(particle, {
          y: -200,
          x: Math.random() * 400 - 200,
          opacity: 0,
          duration: 5 + Math.random() * 3,
          repeat: -1,
          delay: index * 0.1,
          ease: "power1.out",
        });
      });

      // Interactive text effects
      const textElements =
        sectionRef.current?.querySelectorAll(".interactive-text");
      textElements?.forEach((text, index) => {
        gsap.fromTo(
          text,
          { opacity: 0, y: 30, rotationX: 45 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
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

      // Mouse follower animation
      const mouseFollower =
        sectionRef.current?.querySelector(".mouse-follower");
      if (mouseFollower) {
        gsap.set(mouseFollower, {
          x: mousePosition.x,
          y: mousePosition.y,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });

    // Update mouse follower position
    const mouseFollower = sectionRef.current?.querySelector(
      ".mouse-follower"
    ) as HTMLElement;
    if (mouseFollower) {
      gsap.to(mouseFollower, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.1,
        ease: "power2.out",
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);

    // Animate floating elements on hover
    const floatingElements =
      sectionRef.current?.querySelectorAll(".floating-element");
    floatingElements?.forEach((el, index) => {
      gsap.to(el, {
        scale: 1.2,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    // Reset floating elements
    const floatingElements =
      sectionRef.current?.querySelectorAll(".floating-element");
    floatingElements?.forEach((el) => {
      gsap.to(el, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated background */}
      <div className="animated-bg absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#1a1a1a] bg-[length:400%_400%]"></div>

      {/* Floating background elements */}
      <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-[#5047FF]/10 rounded-full blur-2xl"></div>
      <div className="floating-element absolute top-40 right-20 w-40 h-40 bg-[#F8FF7C]/10 rounded-full blur-3xl"></div>
      <div className="floating-element absolute bottom-40 left-1/4 w-24 h-24 bg-[#5047FF]/5 rounded-full blur-xl"></div>
      <div className="floating-element absolute top-1/2 right-1/4 w-20 h-20 bg-[#F8FF7C]/5 rounded-full blur-lg"></div>
      <div className="floating-element absolute bottom-20 right-1/3 w-28 h-28 bg-[#5047FF]/8 rounded-full blur-2xl"></div>

      {/* Particle system */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-[#5047FF]/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Mouse follower */}
      <div
        className="mouse-follower fixed w-10 h-10 bg-[#5047FF]/20 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      />

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#2a2a2a] z-50">
        <div className="progress-bar h-full bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] w-0"></div>
      </div>

      {/* Sticky Left Corner Element - Enhanced */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
        <div className="text-white text-xs sm:text-sm font-medium flex items-center gap-2 sm:gap-3 p-4 rounded-2xl border border-[#2a2a2a] bg-gradient-to-r from-[#1a1a1a]/80 to-[#252525]/80 backdrop-blur-sm hover:border-[#5047FF]/50 transition-all duration-300 group cursor-pointer">
          <span className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-[#5047FF] transition-colors duration-300">
            {"{"}
          </span>
          <div>
            <span className="block text-lg sm:text-xl md:text-2xl group-hover:text-[#F8FF7C] transition-colors duration-300">
              Powered by
            </span>
          </div>
          <Image
            src={eigenlayer}
            alt="Eigenlayer"
            width={100}
            height={100}
            className="md:w-20 md:h-20 border p-2 sm:p-3 rounded-full group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-[#5047FF] transition-colors duration-300">
            {"}"}
          </span>
        </div>
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16">
        {/* Main Headline - Enhanced with interactive elements */}
        <div
          ref={headlineRef}
          className="text-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4 relative"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-tight tracking-tight">
            <span className="interactive-text block tracking-wide mb-2 sm:mb-3 relative group cursor-pointer">
              <span className="relative z-10">Effortless Blockchain</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#5047FF]/20 to-[#F8FF7C]/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </span>
            <span className="interactive-text block tracking-wide relative group cursor-pointer">
              <span className="relative z-10 bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] bg-clip-text text-transparent">
                Automation
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#5047FF]/20 to-[#F8FF7C]/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </span>
            <span className="interactive-text block tracking-wide mt-4 relative group cursor-pointer">
              <span className="relative z-10">.Limitless Potential.</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#F8FF7C]/20 to-[#5047FF]/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </span>
          </h1>

          {/* Subtitle with animation */}
          <p className="text-[#A2A2A2] text-lg md:text-xl max-w-3xl mx-auto mt-8 interactive-text">
            Transform your Web3 projects with decentralized automation that
            scales across multiple chains
          </p>
        </div>

        {/* CTA Buttons - Enhanced with interactive effects */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6"
        >
          <div className="group relative">
            <AnimatedButton
              href="#"
              variant="outline"
              size="md"
              className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 relative z-10 hover:scale-105 transition-transform duration-300"
            >
              Start Building
            </AnimatedButton>
            <div className="absolute inset-0 bg-gradient-to-r from-[#5047FF]/20 to-[#F8FF7C]/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="group relative">
            <AnimatedButton
              href="#"
              variant="outline"
              size="md"
              className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 relative z-10 hover:scale-105 transition-transform duration-300"
            >
              Let&apos;s talk
            </AnimatedButton>
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8FF7C]/20 to-[#5047FF]/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Interactive stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {[
            { number: "100%", label: "Decentralized", color: "#5047FF" },
            { number: "∞", label: "Possibilities", color: "#F8FF7C" },
            { number: "24/7", label: "Active", color: "#5047FF" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl border border-[#2a2a2a] bg-gradient-to-br from-[#1a1a1a]/50 to-[#252525]/50 backdrop-blur-sm hover:border-[#5047FF]/50 transition-all duration-300 group cursor-pointer"
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
                className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                style={{ color: stat.color }}
              >
                {stat.number}
              </div>
              <div className="text-[#A2A2A2] text-sm group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Floating X element with enhanced animations */}
        <div className="flex justify-center pointer-events-none relative px-4 group cursor-pointer">
          <div className="relative">
            <Image
              src="/letters/x.png"
              alt="X"
              width={120}
              height={120}
              className="w-auto h-24 sm:h-28 md:h-32 lg:h-36 drop-shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
            />
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5047FF]/30 via-[#F8FF7C]/30 to-[#5047FF]/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-[#A2A2A2] text-sm animate-bounce">
          <span>Scroll to explore</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
