"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Boxdata from "./data/Boxdata";
import Image from "next/image";
import { Typography, H1, H3, Body } from "./ui/Typography";
import AnimatedButton from "./ui/AnimatedButton";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Map video sources to corresponding SVG files
  const getSvgSource = (videoSrc: string) => {
    const videoName = videoSrc.split("/").pop()?.replace(".webm", "");
    switch (videoName) {
      case "superchain":
        return "/svg-assets/gradient glass (10).svg";
      case "own":
        return "/svg-assets/gradient glass (15).svg";
      case "Ironclad":
        return "/svg-assets/gradient glass (12).svg";
      case "keeper":
        return "/svg-assets/gradient glass (10).svg";
      case "grow":
        return "/svg-assets/gradient glass (12).svg";
      case "aggregate":
        return "/svg-assets/gradient glass (15).svg";
      case "visibility":
        return "/svg-assets/gradient glass (10).svg";
      default:
        return "/svg-assets/gradient glass (12).svg";
    }
  };

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

      // Content sections animations
      contentRefs.current.forEach((contentRef, index) => {
        if (contentRef) {
          const isEven = index % 2 === 0;

          // Text content animation
          const textContent = contentRef.querySelector(".text-content");
          if (textContent) {
            gsap.fromTo(
              textContent,
              {
                opacity: 0,
                x: isEven ? -100 : 100,
                y: 50,
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: contentRef,
                  start: "top 75%",
                  end: "bottom 25%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          const mediaContent = contentRef.querySelector(".media-content");
          if (mediaContent) {
            gsap.fromTo(
              mediaContent,
              {
                opacity: 0,
                x: isEven ? 100 : -100,
                y: 50,
                scale: 0.8,
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power2.out",
                delay: 0.2,
                scrollTrigger: {
                  trigger: contentRef,
                  start: "top 75%",
                  end: "bottom 25%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }
      });

      // Parallax effect for background elements
      gsap.utils.toArray<HTMLElement>(".parallax-bg").forEach((element) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSvgHover = (index: number) => {
    // Add hover effects for SVG elements if needed
    svgRefs.current.forEach((svgRef, i) => {
      if (svgRef && i === index) {
        gsap.to(svgRef, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  };

  const handleSvgLeave = (index: number) => {
    svgRefs.current.forEach((svgRef, i) => {
      if (svgRef && i === index) {
        gsap.to(svgRef, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  };

  return (
    <div ref={sectionRef} className="relative min-h-screen overflow-hidden ">
      <section className="relative z-10 w-[95%] sm:w-[90%] max-w-[1400px] mx-auto py-12 sm:py-16 lg:py-20">
        {/* Main title section */}
        <div ref={titleRef} className="text-center mb-16 sm:mb-20 lg:mb-32">
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

        {/* Content Showcase */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-32">
          {Boxdata.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              className={`relative flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-8 sm:gap-10 lg:gap-16 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]`}
            >
              {/* Text Content */}
              <div className="text-content flex-1 space-y-4 sm:space-y-6 z-10 px-4 sm:px-0">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[var(--brand-b)] to-[var(--brand-a)] flex items-center justify-center text-black font-bold text-base sm:text-lg shadow-lg">
                      {index + 1}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--brand-b)] to-[var(--brand-a)]" />
                  </div>

                  <H3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
                    {item.title}
                  </H3>

                  <Body className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-lg">
                    {item.description}
                  </Body>
                </div>

                {/* Feature highlights */}
                <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4">
                  {["Automation", "Security", "Scalability"].map(
                    (tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm border border-[var(--brand-b)] hover:bg-[var(--brand-b)]/10 transition-all duration-300 hover:scale-105"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* SVG Content */}
              <div className="media-content flex-1 relative px-4 sm:px-0">
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => handleSvgHover(index)}
                  onMouseLeave={() => handleSvgLeave(index)}
                >
                  {/* SVG Container */}
                  <div className="relative rounded-2xl">
                    <div
                      ref={(el) => {
                        svgRefs.current[index] = el;
                      }}
                      className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-xl overflow-hidden"
                    >
                      <Image
                        src={getSvgSource(item.imageSrc)}
                        alt={item.title}
                        fill
                        className="object-contain p-2 sm:p-3 lg:p-4 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
