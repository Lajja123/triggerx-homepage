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
  const floatingSvgRef = useRef<HTMLDivElement>(null);
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);

  // Single SVG source to be used for all sections
  const svgSource = "/svg-assets/why (2).svg";

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

          // Media content placeholder animation (for the space where SVG will appear)
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
                  onEnter: () => {
                    // Animate the floating SVG to this position with smooth transition
                    if (floatingSvgRef.current) {
                      const rect = mediaContent.getBoundingClientRect();
                      const containerRect =
                        sectionRef.current?.getBoundingClientRect();

                      if (containerRect) {
                        // Calculate position relative to the section container
                        const x = rect.left - containerRect.left;
                        const y = rect.top - containerRect.top;

                        // Animate SVG to the new position with smooth transition
                        gsap.to(floatingSvgRef.current, {
                          x: x,
                          y: y,
                          scale: 1,
                          opacity: 1,
                          duration: 1.2,
                          ease: "power2.out",
                          delay: 0.2,
                        });

                        setCurrentSvgIndex(index);
                      }
                    }
                  },
                  onEnterBack: () => {
                    // Handle scrolling back up to this section
                    if (floatingSvgRef.current) {
                      const rect = mediaContent.getBoundingClientRect();
                      const containerRect =
                        sectionRef.current?.getBoundingClientRect();

                      if (containerRect) {
                        const x = rect.left - containerRect.left;
                        const y = rect.top - containerRect.top;

                        // Animate SVG to this position when scrolling back up
                        gsap.to(floatingSvgRef.current, {
                          x: x,
                          y: y,
                          scale: 1,
                          opacity: 1,
                          duration: 1.2,
                          ease: "power2.out",
                          delay: 0.2,
                        });

                        setCurrentSvgIndex(index);
                      }
                    }
                  },
                },
              }
            );
          }
        }
      });

      // Initial position (first section) - position SVG at first content section
      const firstMediaContent = contentRefs.current[0]?.querySelector(
        ".media-content"
      ) as HTMLElement;
      if (firstMediaContent && floatingSvgRef.current) {
        const rect = firstMediaContent.getBoundingClientRect();
        const containerRect = sectionRef.current?.getBoundingClientRect();

        if (containerRect) {
          const x = rect.left - containerRect.left;
          const y = rect.top - containerRect.top;

          gsap.set(floatingSvgRef.current, {
            x: x,
            y: y,
            opacity: 1,
            scale: 1,
          });
        }
      }

      // Add separate ScrollTrigger for smooth SVG movement between sections
      contentRefs.current.forEach((contentRef, index) => {
        if (contentRef) {
          const mediaContent = contentRef.querySelector(
            ".media-content"
          ) as HTMLElement;
          if (mediaContent) {
            ScrollTrigger.create({
              trigger: contentRef,
              start: "top 60%",
              end: "bottom 40%",
              onEnter: () => {
                if (floatingSvgRef.current) {
                  const rect = mediaContent.getBoundingClientRect();
                  const containerRect =
                    sectionRef.current?.getBoundingClientRect();

                  if (containerRect) {
                    const x = rect.left - containerRect.left;
                    const y = rect.top - containerRect.top;

                    // Smooth animation to new position with delay
                    gsap.to(floatingSvgRef.current, {
                      x: x,
                      y: y,
                      scale: 1.05,
                      opacity: 1,
                      duration: 1.2,
                      ease: "power2.out",
                      delay: 0.3,
                    });

                    // Reset scale after movement
                    gsap.to(floatingSvgRef.current, {
                      scale: 1,
                      duration: 0.4,
                      ease: "power2.out",
                      delay: 1.5,
                    });

                    setCurrentSvgIndex(index);
                  }
                }
              },
              onEnterBack: () => {
                if (floatingSvgRef.current) {
                  const rect = mediaContent.getBoundingClientRect();
                  const containerRect =
                    sectionRef.current?.getBoundingClientRect();

                  if (containerRect) {
                    const x = rect.left - containerRect.left;
                    const y = rect.top - containerRect.top;

                    // Smooth animation when scrolling back up with delay
                    gsap.to(floatingSvgRef.current, {
                      x: x,
                      y: y,
                      scale: 1.05,
                      opacity: 1,
                      duration: 1.2,
                      ease: "power2.out",
                      delay: 0.3,
                    });

                    // Reset scale after movement
                    gsap.to(floatingSvgRef.current, {
                      scale: 1,
                      duration: 0.4,
                      ease: "power2.out",
                      delay: 1.5,
                    });

                    setCurrentSvgIndex(index);
                  }
                }
              },
            });
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

  const handleSvgHover = () => {
    // Add hover effects for the floating SVG
    if (floatingSvgRef.current) {
      gsap.to(floatingSvgRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleSvgLeave = () => {
    if (floatingSvgRef.current) {
      gsap.to(floatingSvgRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Floating SVG that moves between sections */}
      <div
        ref={floatingSvgRef}
        className="absolute z-50 pointer-events-none"
        style={{
          top: 0,
          left: 0,
          transform: "none",
          width: "400px",
          height: "400px",
        }}
      >
        <div
          className="relative group cursor-pointer pointer-events-auto"
          onMouseEnter={handleSvgHover}
          onMouseLeave={handleSvgLeave}
        >
          <div className="relative rounded-2xl">
            <div className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-xl overflow-hidden">
              <Image
                src={svgSource}
                alt={`Section ${currentSvgIndex + 1}`}
                fill
                className="object-contain p-2 sm:p-3 lg:p-4 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>

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

              {/* Media Content Placeholder - SVG will be positioned here by the floating element */}
              <div className="media-content flex-1 relative px-4 sm:px-0">
                <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-xl bg-transparent">
                  {/* This is just a placeholder - the actual SVG is floating above */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
