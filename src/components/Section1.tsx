"use client";
import React, { useEffect, useRef, useState } from "react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/Typography";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section1() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeHeadlineIndex, setActiveHeadlineIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const button1Ref = useRef<HTMLDivElement>(null);
  const button2Ref = useRef<HTMLDivElement>(null);
  const poweredRef = useRef<HTMLDivElement>(null);
  const sec1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Track small screens to tone down animations/interactions
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsSmallScreen(mq.matches);
    update();
    mq.addEventListener("change", update);

    const ctx = gsap.context(() => {
      const poweredElement = poweredRef.current;
      if (poweredElement) {
        gsap.fromTo(
          poweredElement,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
      }
      const sec1Element = sec1Ref.current;

      if (sec1Element) {
        gsap.fromTo(
          sec1Element,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
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

      // Progress indicator
    }, sectionRef);

    return () => {
      ctx.revert();
      mq.removeEventListener("change", update);
    };
  }, []);

  // Scroll detection to hide scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        // Hide after scrolling 50px
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Typewriter effect for EIGENLAYER text - Infinite loop
  useEffect(() => {
    const targetText = "EIGENLAYER";
    const typewriterSpeed = 150; // milliseconds per character

    if (typewriterIndex < targetText.length) {
      const timer = setTimeout(() => {
        setTypewriterText(targetText.slice(0, typewriterIndex + 1));
        setTypewriterIndex(typewriterIndex + 1);
      }, typewriterSpeed);

      return () => clearTimeout(timer);
    } else {
      // Reset to start the loop again after a pause
      const resetTimer = setTimeout(() => {
        setTypewriterText("");
        setTypewriterIndex(0);
      }, 2000); // 2 second pause before restarting

      return () => clearTimeout(resetTimer);
    }
  }, [typewriterIndex]);

  // Rotate gradient highlight across headline phrases every 5 seconds
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveHeadlineIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSmallScreen) return;
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
    if (isSmallScreen) return;
    // Animate floating elements on hover
    const floatingElements =
      sectionRef.current?.querySelectorAll(".floating-element");
    floatingElements?.forEach((el) => {
      gsap.to(el, {
        scale: 1.2,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  };

  const handleMouseLeave = () => {
    if (isSmallScreen) return;
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
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-3 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-12 md:pt-16 max-w-[1200px] mx-auto">
        {/* Main Headline - Enhanced with GSAP text animation */}
        <div className="text-center mb-6 sm:mb-10 md:mb-12 px-1 sm:px-4 relative max-w-[92%] sm:max-w-[85%] mx-auto">
          {/* Main text layer */}
          <h1
            ref={sec1Ref}
            className="text-xl  xs:2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl font-bold text-white leading-[1.15] sm:leading-tight tracking-tight relative z-10"
          >
            <span
              className={`block tracking-wide mb-2 sm:mb-3 ${
                activeHeadlineIndex === 0
                  ? "bg-gradient-to-r from-[#82FBD0] to-[#fbf197] bg-clip-text text-transparent"
                  : ""
              }`}
            >
              Effortless Blockchain
            </span>
            <span
              className={`block tracking-wide mt-1 sm:mt-0 ${
                activeHeadlineIndex === 1
                  ? "bg-gradient-to-r from-[#82FBD0] to-[#fbf197] bg-clip-text text-transparent"
                  : ""
              }`}
            >
              Automation
            </span>
            <span
              className={`block tracking-wide mt-3 sm:mt-4 ${
                activeHeadlineIndex === 2
                  ? "bg-gradient-to-r from-[#82FBD0] to-[#fbf197] bg-clip-text text-transparent"
                  : ""
              }`}
            >
              .Limitless Potential.
            </span>
          </h1>
        </div>

        {/* Powered By Section - Enhanced branding above CTA */}
        <div
          ref={poweredRef}
          className="text-center mb-5 sm:mb-8 group cursor-pointer"
        >
          <div className="inline-flex items-center space-x-2 relative">
            <span className="text-[#A2A2A2] text-sm sm:text-xl  ">{"{"}</span>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-sm sm:text-xl  text-white ">
                POWERED BY {""}
                <span className="typewriter-text font-bold inline-block bg-gradient-to-r from-[#82FBD0] to-[#fbf197] bg-clip-text text-transparent">
                  {typewriterText}
                  <span className="animate-pulse text-white">|</span>
                </span>
              </span>
            </div>
            <span className="text-[#A2A2A2] text-sm sm:text-xl   transition-colors duration-300">
              {"}"}
            </span>
            {/* Glow effect on hover */}
          </div>
        </div>

        {/* CTA Buttons - Enhanced with interactive effects */}
        <div
          ref={ctaRef}
          className="flex flex-col  sm:flex-row gap-3 sm:gap-6 md:gap-8 lg:gap-10 mb-10 sm:mb-16 md:mb-20 px-3 sm:px-6 justify-center"
        >
          <div
            ref={button1Ref}
            className="group relative "
            onMouseMove={(e) => handleButtonMouseMove(e, button1Ref)}
            onMouseLeave={() => handleButtonMouseLeave(button1Ref)}
          >
            <AnimatedButton
              href="https://app.triggerx.network/"
              variant="outline"
              className="w-50  md:px-6 md:py-3 md:text-lg px-5 py-2.5 text-base"
            >
              <Button color="white">Start Building</Button>
            </AnimatedButton>
          </div>

          <div
            ref={button2Ref}
            className="group relative"
            onMouseMove={(e) => handleButtonMouseMove(e, button2Ref)}
            onMouseLeave={() => handleButtonMouseLeave(button2Ref)}
          >
            <AnimatedButton
              href="#contact"
              variant="outline"
              className="w-50  md:px-6 md:py-3 md:text-lg px-5 py-2.5 text-base"
            >
              <Button color="white"> Let&apos;s talk</Button>
            </AnimatedButton>
          </div>
        </div>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-[#A2A2A2] text-sm group cursor-pointer transition-opacity duration-500">
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
        )}
      </section>
    </div>
  );
}
