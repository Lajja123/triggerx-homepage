"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Body, H1 } from "./ui/Typography";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Section4() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tickerTween = useRef<gsap.core.Tween | null>(null);

  const chips = [
    { label: "Automated API calls", icon: "✴" },
    { label: "Liquidity management", icon: "∞" },
    { label: "Governance actions", icon: "ℵ" },
    { label: "Token burns or mints", icon: "∞" },
    { label: "User notifications and more!", icon: "✴" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check if mobile screen
      const isMobile = window.innerWidth < 768;

      // Reveal the whole section on enter
      if (sectionRef.current) {
        gsap.from(sectionRef.current, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Title and description subtle reveal
      const titleEl = sectionRef.current?.querySelector(".section4-title");
      const bodyEl = sectionRef.current?.querySelector(".section4-body");
      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { autoAlpha: 0, y: 20, filter: "blur(4px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: titleEl, start: "top 90%" },
          }
        );
      }
      if (bodyEl) {
        gsap.fromTo(
          bodyEl,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: bodyEl, start: "top 92%" },
          }
        );
      }

      // Animate chips for all screen sizes
      const chipsEls = sectionRef.current?.querySelectorAll(".dev-chip");
      chipsEls?.forEach((chip, i) => {
        gsap.fromTo(
          chip,
          { opacity: 0, y: 16, scale: 0.96, filter: "blur(3px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.6,
            delay: i * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: chip as Element,
              start: "top 92%",
            },
          }
        );
      });

      const icons = sectionRef.current?.querySelectorAll(".chip-icon");
      if (icons && icons.length) {
        gsap.from(icons, {
          scale: 0.8,
          rotate: -8,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        });
      }

      // Only run ticker animation on desktop
      if (!isMobile) {
        const track = sectionRef.current?.querySelector(
          ".ticker-track"
        ) as HTMLElement | null;
        if (track) {
          gsap.set(track, { xPercent: 0 });
          tickerTween.current = gsap.to(track, {
            xPercent: -50,
            duration: 24,
            ease: "none",
            repeat: -1,
          });
        }
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative py-24  rounded-[80px]">
      <section className="relative z-10 max-w-7xl mx-auto px-6 min-h-[60vh]">
        <div className="mb-10 text-center">
          <H1 className="section4-title mb-6 sm:mb-8 flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 flex-wrap">
            Trigger
            <Image
              src="/letters/x.png"
              alt="X"
              width={100}
              height={100}
              className="w-12  sm:w-16  md:w-20 h-10 md:h-20 lg:w-25  inline-block animate-pulse"
            />{" "}
            For
            <span
              className="relative  inline-block animate-bounce text-[var(--brand-c)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              style={{ animationDelay: "0.5s" }}
            >
              ?
            </span>{" "}
          </H1>
          <Body className="section4-body text-center text-sm sm:text-md lg:text-lg text-[#99A1AF] max-w-2xl mx-auto leading-relaxed px-4 font-normal">
            Whether you&apos;re a dApp developer, DeFi protocol creator, or
            enterprise innovator, TriggerX empowers you to automate tasks with
            ease and confidence.{" "}
          </Body>
        </div>

        {/* Mobile Layout - Stacked Cards */}
        <div className="md:hidden">
          <div className="flex flex-col gap-3">
            {chips.map((chip, i) => (
              <div
                key={`${chip.label}-${i}`}
                className="dev-chip flex items-center gap-3 rounded-full bg-[#141414] border border-white/10 px-4 py-3 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
              >
                <span className="chip-icon flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#FBF197]/20 to-[#82FBD0]/37 border border-[#82FBD0] text-[#FFFFFF] text-sm">
                  {chip.icon}
                </span>
                <span className="text-sm">{chip.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Ticker Animation */}
        <div className="hidden md:block relative overflow-hidden py-4">
          <div
            className="ticker-track flex items-center gap-4 lg:gap-6 whitespace-nowrap will-change-transform"
            onMouseEnter={() => tickerTween.current?.pause()}
            onMouseLeave={() => tickerTween.current?.resume()}
          >
            {[...chips, ...chips].map((chip, i) => (
              <div
                key={`${chip.label}-${i}`}
                className="dev-chip inline-flex items-center gap-3 rounded-full bg-[#141414] border border-white/10 px-5 lg:px-6 py-3 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
              >
                <span className="chip-icon inline-flex items-center justify-center w-9 h-9 rounded-full  bg-gradient-to-r from-[#FBF197]/20 to-[#82FBD0]/37 border border-[#82FBD0]/30 text-[#FFFFFF] text-base">
                  {chip.icon}
                </span>
                <span className="text-base lg:text-lg">{chip.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Section4;
