"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Boxdata from "./data/Boxdata";
import Image from "next/image";
import { H1, H3, Body } from "./ui/Typography";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isAutoPlaying = true;
  const autoplayDurationMs = 4000;
  const [slideProgress, setSlideProgress] = useState(0); // 0..1 progress for current slide
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced title animation with stagger
      const titleElement = titleRef.current;
      if (titleElement) {
        const titleParts = titleElement.querySelectorAll(".title-part");
        gsap.fromTo(
          titleParts,
          { opacity: 0, y: 100, rotationX: -90 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: titleElement,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Premium carousel entrance animation
      const carouselElement = carouselRef.current;
      if (carouselElement) {
        gsap.fromTo(
          carouselElement,
          { opacity: 0, y: 100, scale: 0.8, rotationY: -15 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carouselElement,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate slides with 3D effects
      slidesRef.current.forEach((slide, index) => {
        if (slide) {
          gsap.set(slide, {
            rotationY: index === 0 ? 0 : 15,
            z: index === 0 ? 0 : -100,
            opacity: index === 0 ? 1 : 0.7,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Autoplay with smooth progress
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    let startTimestamp = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTimestamp;
      const p = Math.min(1, elapsed / autoplayDurationMs);
      setSlideProgress(p);
      if (p >= 1) {
        setCurrentSlide((prev) => (prev + 1) % Boxdata.length);
        startTimestamp = performance.now();
        setSlideProgress(0);
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isAutoPlaying, isHovered, autoplayDurationMs]);

  // Reset progress on manual nav
  useEffect(() => {
    setSlideProgress(0);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = (currentSlide + 1) % Boxdata.length;
    animateSlideTransition(currentSlide, nextIndex);
    setCurrentSlide(nextIndex);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const prevIndex = (currentSlide - 1 + Boxdata.length) % Boxdata.length;
    animateSlideTransition(currentSlide, prevIndex);
    setCurrentSlide(prevIndex);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    animateSlideTransition(currentSlide, index);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const animateSlideTransition = (from: number, to: number) => {
    const fromSlide = slidesRef.current[from];
    const toSlide = slidesRef.current[to];

    if (fromSlide && toSlide) {
      // Animate out current slide
      gsap.to(fromSlide, {
        rotationY: from < to ? -15 : 15,
        z: -100,
        opacity: 0.7,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.inOut",
      });

      // Animate in new slide
      gsap.fromTo(
        toSlide,
        {
          rotationY: from < to ? 15 : -15,
          z: -100,
          opacity: 0.7,
          scale: 0.95,
        },
        {
          rotationY: 0,
          z: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.inOut",
        }
      );
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-transparent via-gray-900/20 to-transparent"
    >
      <section className="relative z-10 w-[95%] sm:w-[90%] max-w-[1400px] mx-auto py-16 sm:py-20 lg:py-24">
        {/* Main title section */}
        <div ref={titleRef} className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="relative inline-block">
            <H1 className="mb-6 sm:mb-8 flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 flex-wrap">
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                  Trigger
                </span>
              </span>
              <div className="relative">
                <Image
                  src="/letters/x.png"
                  alt="X"
                  width={120}
                  height={120}
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 inline-block animate-pulse"
                />
              </div>
              <span
                className="relative inline-block animate-bounce text-[var(--brand-c)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
                style={{ animationDelay: "0.5s" }}
              >
                ?
              </span>
            </H1>
            <Body className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto leading-relaxed px-4">
              Discover the future of decentralized automation with cutting-edge
              features designed for the modern blockchain ecosystem
            </Body>
          </div>
        </div>

        {/* Modern Carousel Section */}
        <div
          ref={carouselRef}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-3xl bg-[#141414]">
            {/* Slides */}
            <div
              className="flex transition-transform duration-700 ease-in-out "
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Boxdata.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  {/* Segmented Progress with per-slide fill */}
                  <div className="mt-6 w-full flex items-center gap-4 ">
                    <div className="flex-1 flex gap-2">
                      {Boxdata.map((_, segIdx) => {
                        const isPast = segIdx < currentSlide;
                        const isCurrent = segIdx === currentSlide;
                        const widthPercent = isPast
                          ? 100
                          : isCurrent
                          ? Math.round(slideProgress * 100)
                          : 0;
                        return (
                          <div
                            key={segIdx}
                            className="flex-1 bg-[#141414] rounded-full h-2 overflow-hidden"
                          >
                            <div
                              className="h-full bg-gradient-to-r from-[var(--brand-b)] to-[var(--brand-a)] rounded-full transition-[width] duration-150"
                              style={{ width: `${widthPercent}%` }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 p-8 lg:p-16 min-h-[500px] lg:min-h-[600px]">
                    {/* Content Side */}
                    <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                      <H3 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
                        {item.title}
                      </H3>

                      <Body className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        {item.description}
                      </Body>

                      {/* Feature Tags */}
                      <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                        {["Automation", "Security", "Scalability"].map(
                          (tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-4 py-2 rounded-full text-sm border border-gray-600 hover:border-[var(--brand-b)]/50 hover:bg-[var(--brand-b)]/10 transition-all duration-300 hover:scale-105"
                            >
                              {tag}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Visual Side */}
                    <div className="flex-1 relative">
                      <div className="group relative w-full h-[300px] lg:h-[400px] rounded-2xl bg-[#141414] overflow-hidden will-change-transform transition-transform duration-500 ease-out hover:scale-[1.01] hover:-rotate-[0.5deg]">
                        {/* Glow orbs */}
                        <div className="pointer-events-none absolute -top-10 -left-10 w-56 h-56 rounded-full bg-[var(--brand-b)]/15 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-[var(--brand-a)]/15 blur-3xl" />
                        {/* Inner gradient veil */}
                        <div className="absolute inset-0 " />
                        {/* Center index as watermark */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl lg:text-8xl opacity-20 tracking-tighter">
                            {index + 1}
                          </div>
                        </div>
                        {/* Subtle moving light */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),_rgba(255,255,255,0.12),_transparent_40%)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Navigation Arrows moved to controls below */}
          </div>

          {/* Carousel Controls */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center gap-5 px-4 py-2 rounded-full bg-[#141414] backdrop-blur-md shadow-[0_0_1px_0_rgba(255,255,255,0.06)_inset]">
              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="w-10 h-10 bg-gray-800/60 backdrop-blur-sm border border-gray-700/60 rounded-full flex items-center justify-center hover:bg-gray-700/60 transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Dots Navigation */}
              <div className="flex gap-3">
                {Boxdata.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "bg-[var(--brand-b)] ring-4 ring-[var(--brand-b)]/20"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Counter */}
              <span className="text-xs text-gray-300 tabular-nums px-2">
                {currentSlide + 1} / {Boxdata.length}
              </span>

              {/* Next Button (with subtle ring when progressing) */}
              <button
                onClick={nextSlide}
                className="relative w-10 h-10 bg-gray-800/60 backdrop-blur-sm border border-gray-700/60 rounded-full flex items-center justify-center hover:bg-gray-700/60 transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
              >
                <svg
                  className="w-5 h-5 text-white"
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
                <span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(var(--brand-b) ${Math.round(
                      slideProgress * 360
                    )}deg, transparent 0deg)`,
                  }}
                />
                <span className="absolute inset-[3px] rounded-full bg-transparent" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
        </div>
      </section>
    </div>
  );
}
