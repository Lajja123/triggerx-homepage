"use client";
import React, { useEffect, useRef, useState } from "react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import eigenlayer from "../assets/HeaderHerosection svgs/Eigenlayer.svg";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/Typography";

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
  const button1Ref = useRef<HTMLDivElement>(null);
  const button2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  const handleButtonMouseMove = (
    e: React.MouseEvent,
    buttonRef: React.RefObject<HTMLDivElement | null>
  ) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleButtonMouseLeave = (
    buttonRef: React.RefObject<HTMLDivElement | null>
  ) => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
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
      {/* Mouse follower */}
      <div className="mouse-follower fixed w-10 h-10 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out flex items-center justify-center">
        <Image
          src="/letters/x.png"
          alt="TriggerX"
          width={20}
          height={20}
          className="w-5 h-5 opacity-80"
        />
      </div>

      {/* Sticky Left Corner Element - Enhanced */}
      <div className="fixed left-0 top-0 h-full z-50">
        <div className="h-full w-16  flex flex-row items-center justify-center group cursor-pointer ">
          <div className="transform -rotate-90 text-white text-sm font-medium tracking-wider group-hover:text-[#c07af6] transition-colors duration-300">
            <span className="block text-xs opacity-70 mb-2">POWERED BY</span>
            <span className="block text-lg font-bold">EIGENLAYER</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8ab4ff]/20 to-[#fbf197]/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>

      {/* Dynamic Background Gradient */}
      <div
        className="absolute inset-0 bg-gradient-radial from-[#c07af6]/10 via-transparent to-transparent pointer-events-none"
        style={{
          backgroundPosition: `${mousePosition.x}px ${mousePosition.y}px`,
          transition: "background-position 0.1s ease-out",
        }}
      />

      {/* Secondary gradient layer */}
      <div
        className="absolute inset-0 bg-gradient-radial from-[#fbf197]/5 via-transparent to-transparent pointer-events-none"
        style={{
          backgroundPosition: `${mousePosition.x * 0.5}px ${
            mousePosition.y * 0.5
          }px`,
          transition: "background-position 0.2s ease-out",
        }}
      />

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16">
        {/* Main Headline - Enhanced with interactive elements */}
        <div
          ref={headlineRef}
          className="text-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4 relative"
        >
          {/* 3D Text Layers */}
          <div className="relative">
            {/* Background shadow layer */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-black/20 leading-tight tracking-tight absolute inset-0 transform translate-x-2 translate-y-2 blur-sm">
              <span className="block tracking-wide mb-2 sm:mb-3">
                Effortless Blockchain
              </span>
              <span className="block tracking-wide">Automation</span>
              <span className="block tracking-wide mt-4">
                .Limitless Potential.
              </span>
            </h1>

            {/* Main text layer */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-tight tracking-tight relative z-10">
              <span className="interactive-text block tracking-wide mb-2 sm:mb-3 relative group cursor-pointer glitch-text">
                <span className="relative z-10">Effortless Blockchain</span>
                <span
                  className="glitch-layer absolute inset-0 text-[#c07af6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ transform: "translate(2px, 0)" }}
                >
                  Effortless Blockchain
                </span>
                <span
                  className="glitch-layer absolute inset-0 text-[#fbf197] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ transform: "translate(-2px, 0)" }}
                >
                  Effortless Blockchain
                </span>
              </span>
              <span className="interactive-text block tracking-wide relative group cursor-pointer glitch-text">
                <span className="relative z-10 bg-gradient-to-r from-[#c07af6] to-[#fbf197] bg-clip-text text-transparent">
                  Automation
                </span>
                <span
                  className="glitch-layer absolute inset-0 text-[#c07af6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ transform: "translate(2px, 0)" }}
                >
                  Automation
                </span>
                <span
                  className="glitch-layer absolute inset-0 text-[#fbf197] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ transform: "translate(-2px, 0)" }}
                >
                  Automation
                </span>
              </span>
              <span className="interactive-text block tracking-wide mt-4 relative group cursor-pointer glitch-text">
                <span className="relative z-10">.Limitless Potential.</span>
                <span
                  className="glitch-layer absolute inset-0 text-[#c07af6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ transform: "translate(2px, 0)" }}
                >
                  .Limitless Potential.
                </span>
                <span
                  className="glitch-layer absolute inset-0 text-[#fbf197] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ transform: "translate(-2px, 0)" }}
                >
                  .Limitless Potential.
                </span>
              </span>
            </h1>

            {/* Highlight layer */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white/10 leading-tight tracking-tight absolute inset-0 transform -translate-x-1 -translate-y-1">
              <span className="block tracking-wide mb-2 sm:mb-3">
                Effortless Blockchain
              </span>
              <span className="block tracking-wide">Automation</span>
              <span className="block tracking-wide mt-4">
                .Limitless Potential.
              </span>
            </h1>
          </div>
        </div>

        {/* CTA Buttons - Enhanced with interactive effects */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6"
        >
          <div
            ref={button1Ref}
            className="group relative"
            onMouseMove={(e) => handleButtonMouseMove(e, button1Ref)}
            onMouseLeave={() => handleButtonMouseLeave(button1Ref)}
          >
            <AnimatedButton
              href="#"
              variant="outline"
              size="md"
              className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 relative z-10 hover:scale-105 transition-transform duration-300"
            >
              <Button color="white">Start Building</Button>
            </AnimatedButton>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8ab4ff]/20 to-[#fbf197]/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div
            ref={button2Ref}
            className="group relative"
            onMouseMove={(e) => handleButtonMouseMove(e, button2Ref)}
            onMouseLeave={() => handleButtonMouseLeave(button2Ref)}
          >
            <AnimatedButton
              href="#"
              variant="outline"
              size="md"
              className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 relative z-10 hover:scale-105 transition-transform duration-300"
            >
              <Button color="white"> Let&apos;s talk</Button>
            </AnimatedButton>
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff282]/20 to-[#82fbd0]/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-[#A2A2A2] text-sm group cursor-pointer">
          <span className="group-hover:text-white transition-colors duration-300">
            Scroll to explore
          </span>
          <div className="relative">
            <svg
              className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 animate-bounce"
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
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#c07af6]/20 to-[#fbf197]/20 blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          {/* Progress line */}
          <div className="w-px h-8 bg-gradient-to-b from-[#A2A2A2] to-transparent group-hover:from-white transition-colors duration-300"></div>
        </div>
      </section>
    </div>
  );
}
