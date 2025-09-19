"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import group from "@/assets/what svgs/Group.png";
import group2 from "@/assets/what svgs/group2.png";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Button } from "./ui/Typography";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const button1Ref = useRef<HTMLDivElement>(null);
  const button2Ref = useRef<HTMLDivElement>(null);
  const [openCard, setOpenCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isSmallScreen =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 639px)").matches;
      // Soft fade-in of the whole section
      if (sectionRef.current) {
        gsap.from(sectionRef.current, {
          autoAlpha: 0,
          y: 32,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Center hero: stagger each title line and pop the logo
      const titleLines = sectionRef.current?.querySelectorAll(
        ".center-hero .title-line"
      );
      if (!isSmallScreen && titleLines && titleLines.length > 0) {
        gsap.from(titleLines, {
          yPercent: 120,
          skewY: 8,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current?.querySelector(".center-hero"),
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const centerLogo = sectionRef.current?.querySelector(".center-logo");
      if (!isSmallScreen && centerLogo) {
        gsap.fromTo(
          centerLogo,
          { scale: 0.85, rotate: -6, autoAlpha: 0 },
          {
            scale: 1,
            rotate: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: sectionRef.current?.querySelector(".center-hero"),
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const cards = sectionRef.current?.querySelectorAll(".feature-card");
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 36,
            rotateX: -8,
            transformPerspective: 600,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.9,
            delay: index * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Pop-in the icon badges
      const badges = sectionRef.current?.querySelectorAll(".icon-badge");
      if (badges && badges.length > 0) {
        gsap.from(badges, {
          scale: 0.85,
          autoAlpha: 0,
          y: 8,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);
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
    <div ref={sectionRef} className="relative  overflow-hidden">
      {/* Subtle brand gradient background */}

      <section className="relative z-10 w-[95%] sm:w-[90%] max-w-[1600px] min-h-screen mx-auto py-12 sm:py-16 lg:py-20">
        {/* 3-column, center hero spanning 2 rows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {/* Left column - top - Comprehensive Automation */}
          <div className="group rounded-3xl bg-[#141414] border border-white/10 p-4 sm:p-6 lg:p-8 min-h-[240px] sm:min-h-[260px] relative overflow-hidden cursor-pointer transition-all duration-500 md:hover:bg-[#fff282]">
            <div className="relative z-10 h-full flex flex-col justify-center gap-8">
              <div className="icon-badge w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center">
                <Image
                  src={group}
                  alt="X logo"
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                />
              </div>
              <h3 className="font-sharpGrotesk text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-tight mb-4 sm:mb-6 text-white  transition-colors duration-300">
                Comprehensive Automation{" "}
              </h3>
              {/* Mobile: Read more button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenCard((prev) => (prev === 0 ? null : 0));
                }}
                className="sm:hidden inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs text-white/90  md:hover:bg-[#fff282] transition-colors"
              >
                {openCard === 0 ? "Read less" : "Read more"}
              </button>
            </div>

            {/* Hover Description */}
            <div
              className={`absolute inset-0 bg-[#141414] p-4 sm:p-6 lg:p-8 flex flex-col justify-evenly transform transition-transform duration-500 ease-out z-20 rounded-3xl ${
                openCard === 0 ? "translate-y-0" : "translate-y-full"
              } sm:translate-y-full sm:group-hover:translate-y-0`}
            >
              <div className="space-y-3 sm:space-y-4 text-[#D1D5DC] text-xs sm:text-lg">
                <div>
                  <strong className="text-white">Time-Based Automation:</strong>{" "}
                  Schedule tasks at any interval or timestamp.
                </div>
                <div>
                  <strong className="text-white">
                    Event-Based Automation:
                  </strong>{" "}
                  Trigger actions based on on-chain events.
                </div>
                <div>
                  <strong className="text-white">
                    Condition-Based Automation:
                  </strong>{" "}
                  Automate responses when conditions are met.
                </div>
                {/* Mobile: Back button inside expanded description */}
                {openCard === 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenCard(null);
                    }}
                    className="sm:hidden inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/90 hover:bg-white/10 mb-3"
                  >
                    Back
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Center hero spanning 2 rows */}
          <div className="center-hero relative rounded-3xl bg-[#141414] border border-white/10 min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] lg:row-span-2 flex items-center justify-center overflow-hidden order-1 lg:order-none">
            <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-white/15" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 sm:py-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-tight text-white tracking-tight">
                <span className="title-line block overflow-hidden">
                  <span className="inline-block">Why</span>
                </span>
                <span className="title-line block overflow-hidden">
                  <span className="inline-block">Trigger X</span>
                </span>
                <span className="title-line block overflow-hidden">
                  <span className="inline-block">Offers</span>
                </span>
              </h2>
              {/* center hero image */}
              <div className="center-logo mt-6 sm:mt-8 lg:mt-10 w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-24 lg:w-32 lg:h-28 xl:w-36 xl:h-32 relative">
                <Image
                  src="/letters/x.png"
                  alt="X logo"
                  fill
                  className="object-contain opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Right column - top - Crypto-Economic Security */}
          <div className="group rounded-3xl bg-[#141414] border border-white/10 p-4 sm:p-6 lg:p-8 min-h-[240px] sm:min-h-[260px] relative overflow-hidden cursor-pointer transition-all duration-500 md:hover:bg-[#fff282] order-2 lg:order-none">
            <div className="relative z-10 h-full flex flex-col justify-center gap-8">
              <div className="icon-badge w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center">
                <Image
                  src={group}
                  alt="X logo"
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                />
              </div>
              <h3 className="font-sharpGrotesk text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-tight mb-4 sm:mb-6 text-white md:group- transition-colors duration-300">
                Crypto-Economic Security
              </h3>
              {/* Mobile: Read more button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenCard((prev) => (prev === 1 ? null : 1));
                }}
                className="sm:hidden inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs text-white/90  md:hover:bg-[#fff282] transition-colors"
              >
                {openCard === 1 ? "Read less" : "Read more"}
              </button>
            </div>

            {/* Hover Description */}
            <div
              className={`absolute inset-0 bg-[#141414] p-4 sm:p-6 lg:p-8 flex flex-col justify-evenly  transform transition-transform duration-500 ease-out z-20 rounded-3xl ${
                openCard === 1 ? "translate-y-0" : "translate-y-full"
              } sm:translate-y-full sm:group-hover:translate-y-0`}
            >
              <div className="text-xs sm:text-lg leading-relaxed text-[#D1D5DC]">
                Relax, your automation tasks are in safe hands. TriggerX&apos;s
                integration with EigenLayer and its innovative AVS system
                ensures that keepers are incentivized to act honestly,
                protecting you from any malicious activity.
              </div>
              {/* Mobile: Back button inside expanded description */}
              {openCard === 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenCard(null);
                  }}
                  className="sm:hidden inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/90 hover:bg-white/10 mb-3"
                >
                  Back
                </button>
              )}
            </div>
          </div>

          {/* Left column - bottom - Scale Across Chains */}
          <div className="group rounded-3xl border bg-[#141414] p-4 sm:p-6 lg:p-8 border-white/10 min-h-[240px] sm:min-h-[260px] text-white relative overflow-hidden cursor-pointer transition-all duration-500 md:hover:bg-[#fff282] order-3 lg:order-none">
            <div className="relative z-10 h-full flex flex-col justify-center gap-8">
              <div className="icon-badge w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center">
                <Image
                  src={group2}
                  alt="X logo"
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                />
              </div>
              <h3 className="font-sharpGrotesk text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-tight mb-4 sm:mb-6 text-white md:group- transition-colors duration-300">
                Scale Across Chains
              </h3>
              {/* Mobile: Read more button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenCard((prev) => (prev === 2 ? null : 2));
                }}
                className="sm:hidden inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs text-white/90  md:hover:bg-[#fff282] transition-colors"
              >
                {openCard === 2 ? "Read less" : "Read more"}
              </button>
            </div>

            {/* Hover Description */}
            <div
              className={`absolute inset-0 bg-[#141414] p-4 sm:p-6 lg:p-8 justify-evenly   flex flex-col transform transition-transform duration-500 ease-out z-20 rounded-3xl ${
                openCard === 2 ? "translate-y-0" : "translate-y-full"
              } sm:translate-y-full sm:group-hover:translate-y-0`}
            >
              {/* Mobile: Back button inside expanded description */}

              <div className="text-xs sm:text-lg leading-relaxed text-[#D1D5DC]">
                TriggerX&apos;s multi-chain architecture allows you to
                seamlessly scale to new networks. Integrate with emerging L2
                chains and expand your automation capabilities as the Web3
                landscape evolves.
              </div>
              {openCard === 2 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenCard(null);
                  }}
                  className="sm:hidden inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/90 hover:bg-white/10 mb-3"
                >
                  Back
                </button>
              )}
            </div>
          </div>

          {/* Right column - bottom - Power of Decentralized Network */}
          <div className="group rounded-3xl border bg-[#141414] p-4 sm:p-6 lg:p-8 border-white/10 min-h-[240px] sm:min-h-[260px] text-white relative overflow-hidden cursor-pointer transition-all duration-500 md:hover:bg-[#fff282] order-4 lg:order-none">
            <div className="relative z-10 h-full flex flex-col justify-center gap-8">
              <div className="icon-badge w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center">
                <Image
                  src={group2}
                  alt="X logo"
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                />
              </div>
              <h3 className="font-sharpGrotesk text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-tight mb-4 sm:mb-6 text-white md:group- transition-colors duration-300">
                Power of the {""}
                <br></br> Decentralized Network
              </h3>
              {/* Mobile: Read more button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenCard((prev) => (prev === 3 ? null : 3));
                }}
                className="sm:hidden inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs text-white/90  md:hover:bg-[#fff282] transition-colors"
              >
                {openCard === 3 ? "Read less" : "Read more"}
              </button>
            </div>

            {/* Hover Description */}
            <div
              className={`absolute inset-0 bg-[#141414] p-4 sm:p-6 lg:p-8 flex flex-col justify-evenly transform transition-transform duration-500 ease-out z-20 ${
                openCard === 3 ? "translate-y-0" : "translate-y-full"
              } sm:translate-y-full sm:group-hover:translate-y-0`}
            >
              <div className="text-xs sm:text-lg leading-relaxed text-[#D1D5DC]">
                TriggerX taps into a network of independent keepers, creating a
                robust and tamper-proof automation infrastructure for your Web3
                projects.
              </div>
              {/* Mobile: Back button inside expanded description */}
              {openCard === 3 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenCard(null);
                  }}
                  className="sm:hidden inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/90 hover:bg-white/10 mb-3"
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center space-y-6 sm:space-y-8 mt-12 sm:mt-16">
          <div className="flex flex-col  sm:flex-row gap-3 sm:gap-6 md:gap-8 lg:gap-10 mb-10 sm:mb-16 md:mb-20 px-3 sm:px-6 justify-center">
            <div
              ref={button1Ref}
              className="group relative "
              onMouseMove={(e) => handleButtonMouseMove(e, button1Ref)}
              onMouseLeave={() => handleButtonMouseLeave(button1Ref)}
            >
              <AnimatedButton
                href="https://app.triggerx.network/devhub"
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
          </div>{" "}
        </div>
      </section>
    </div>
  );
}
