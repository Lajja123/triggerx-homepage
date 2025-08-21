import React, { useEffect, useRef } from "react";
import AnimatedButton from "@/components/AnimatedButton";
import eigenlayer from "../assets/Eigenlayer.svg";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section1() {
  const xImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // MetaMask-style smooth animations
    if (xImageRef.current) {
      // Initial fade-in with subtle scale
      gsap.fromTo(
        xImageRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.8,
        }
      );

      // Gentle floating animation (MetaMask style)
      gsap.to(xImageRef.current, {
        y: -8,
        duration: 4,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2.5,
      });

      // Subtle rotation for depth
      gsap.to(xImageRef.current, {
        rotation: 2,
        duration: 6,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: 3,
      });

      // Scroll-based parallax (MetaMask style)
      gsap.to(xImageRef.current, {
        y: -50,
        scale: 1.05,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // Add a subtle glow effect on scroll
      gsap.to(xImageRef.current, {
        filter: "brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.3))",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      {/* Sticky Left Corner Element */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="text-white text-sm font-medium flex items-center">
          <div>
            <span className="block text-2xl">Powered by</span>
          </div>
          <Image
            src={eigenlayer}
            alt="Eigenlayer"
            width={80}
            height={80}
            className="w-[20%] h-auto border p-3 rounded-full"
          ></Image>
        </div>
      </div>

      <section
        data-section="hero"
        className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 z-10"
      >
        {/* Main Headline */}
        <div data-animate="headline" className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight tracking-tight">
            <span className="block">Effortless Blockchain Automation</span>
            <span className="block">.Limitless Potential.</span>
          </h1>
        </div>

        {/* CTA Button */}
        <div data-animate="cta" className="flex gap-10 mb-20">
          <AnimatedButton href="#" variant="outline" size="md">
            Start Building
          </AnimatedButton>
          <AnimatedButton
            href="#"
            variant="outline"
            size="md"
            className="px-5 "
          >
            Let&apos;s talk
          </AnimatedButton>
        </div>

        {/* Animated X Image - MetaMask Style */}
        <div
          ref={xImageRef}
          className="flex justify-center pointer-events-none relative"
        >
          <div className="relative">
            <Image
              src="/letters/x.png"
              alt="X"
              width={120}
              height={120}
              className="w-auto h-36 drop-shadow-2xl transition-all duration-300"
            />
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-xl opacity-0 animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
