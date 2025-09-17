"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import ActionButton from "@/components/ui/AnimatedButton";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section3() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleText = sectionRef.current?.querySelector(".title-text");
      if (titleText) {
        gsap.fromTo(
          titleText,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleText,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Center hero scale-to-fit on enter
      const centerTitle = sectionRef.current?.querySelector(".center-hero h2");
      if (centerTitle) {
        gsap.fromTo(
          centerTitle,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: centerTitle,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const cards = sectionRef.current?.querySelectorAll(".feature-card");
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Subtle brand gradient background */}

      <section className="relative z-10 w-[90%] max-w-[1600px] mx-auto py-20">
        {/* 3-column, center hero spanning 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Left column - top - Comprehensive Automation */}
          <div className=" group rounded-3xl bg-[#141414] border  border-white/10 p-6 md:p-8 min-h-[260px] relative overflow-hidden cursor-pointer transition-all duration-500 hover:bg-[#D4FF9B]">
            <div className="relative z-10">
              <h3 className="font-sharpGrotesk text-2xl md:text-3xl leading-tight mb-6">
                Crypto-Economic Security
              </h3>
            </div>

            {/* Hover Description */}
            <div className="absolute inset-0 bg-[#141414] p-6 md:p-8 flex flex-col justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <div className="space-y-4 text-white/90 text-sm">
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
              </div>
            </div>
          </div>

          {/* Center hero spanning 2 rows */}
          <div className="center-hero relative rounded-3xl bg-[#141414] border border-white/10 min-h-[400px] md:row-span-2 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-3 rounded-2xl border border-white/15" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-10">
              <h2 className="font-actayWide text-[12vw] md:text-[7vw] lg:text-[5vw] leading-none text-white tracking-tight">
                Why
                <br />
                TriggerX
                <br />
                Offers
              </h2>
              {/* center hero image */}
              <div className="mt-10 w-28 h-24 md:w-36 md:h-32 relative">
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
          <div className=" group rounded-3xl bg-[#141414] border  border-white/10 p-6 md:p-8 min-h-[260px] relative overflow-hidden cursor-pointer transition-all duration-500 hover:bg-[#D4FF9B]">
            <div className="relative z-10">
              <h3 className="font-sharpGrotesk text-2xl md:text-3xl leading-tight mb-6">
                Crypto-Economic Security
              </h3>
            </div>

            {/* Hover Description */}
            <div className="absolute inset-0 bg-[#141414] p-6 md:p-8 flex flex-col justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <div className=" text-sm leading-relaxed">
                Relax, your automation tasks are in safe hands. TriggerX&apos;s
                integration with EigenLayer and its innovative AVS system
                ensures that keepers are incentivized to act honestly,
                protecting you from any malicious activity.
              </div>
            </div>
          </div>

          {/* Left column - bottom - Scale Across Chains */}
          <div className=" group rounded-3xl border bg-[#141414] p-6 border-white/10 md:p-8 min-h-[260px] text-white relative overflow-hidden cursor-pointer transition-all duration-500 hover:bg-[#1E1A54]">
            <div className="relative z-10">
              <h3 className="font-sharpGrotesk text-2xl md:text-3xl leading-tight mb-4">
                Scale Across Chains
              </h3>
            </div>

            {/* Hover Description */}
            <div className="absolute inset-0 bg-[#141414] p-6 md:p-8 flex flex-col justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <div className=" text-sm leading-relaxed">
                TriggerX&apos;s multi-chain architecture allows you to
                seamlessly scale to new networks. Integrate with emerging L2
                chains and expand your automation capabilities as the Web3
                landscape evolves.
              </div>
            </div>
          </div>

          {/* Right column - bottom - Power of Decentralized Network */}
          <div className=" group rounded-3xl border bg-[#141414] p-6 border-white/10 md:p-8 min-h-[260px] text-white relative overflow-hidden cursor-pointer transition-all duration-500 hover:bg-[#1E1A54]">
            <div className="relative z-10">
              <h3 className="font-sharpGrotesk text-2xl md:text-3xl leading-tight mb-4">
                Scale Across Chains
              </h3>
            </div>

            {/* Hover Description */}
            <div className="absolute inset-0 bg-[#141414] p-6 border-white/10 border md:p-8 flex flex-col justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <div className=" text-sm leading-relaxed">
                TriggerX taps into a network of independent keepers, creating a
                robust and tamper-proof automation infrastructure for your Web3
                projects.
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center space-y-8 mt-16">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="https://app.triggerx.network/devhub" target="blank">
              <ActionButton>
                <span className="relative z-10">Explore Dev Hub</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-b)] to-[var(--brand-a)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </ActionButton>
            </Link>

            <ActionButton onClick={() => scrollToSection("contact-section")}>
              <span className="relative z-10">Let&apos;s Talk</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-a)] to-[var(--brand-b)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </ActionButton>
          </div>
        </div>
      </section>
    </div>
  );
}
