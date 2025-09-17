"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Section4() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const leftCards = [
    {
      title: "Leo",
      subtitle: "A language for building private applications",
      accent: "from-[var(--brand-b)] to-[var(--brand-a)]",
      icon: "↗",
    },
    {
      title: "Aleo SDK",
      subtitle: "Tools to integrate Aleo into your business",
      accent: "from-[var(--brand-a)] to-[var(--brand-d)]",
      icon: "↗",
    },
    {
      title: "Aleo Instructions",
      subtitle: "Low-level commands that power private computations",
      accent: "from-[var(--brand-d)] to-[var(--brand-b)]",
      icon: "↗",
    },
  ];

  const rightCards = [
    {
      title: "Aleo Explorer",
      subtitle: "View network activity and transactions",
      accent: "from-[var(--brand-b)] to-[var(--brand-a)]",
      icon: "↗",
    },
    {
      title: "snarkOS",
      subtitle: "The blockchain operating system for Aleo",
      accent: "from-[var(--brand-a)] to-[var(--brand-c)]",
      icon: "🟢",
    },
    {
      title: "snarkVM",
      subtitle: "The engine powering privacy and computation",
      accent: "from-[var(--brand-a)] to-[var(--brand-c)]",
      icon: "🟢",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".dev-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative py-24  rounded-[80px]">
      <section className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="title-text text-white font-sharpGrotesk text-4xl md:text-6xl leading-tight">
            Developer Resources
          </h2>
          <p className="text-[#A2A2A2] mt-4">Explore docs, SDKs and tools</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-8">
            {leftCards.map((card, idx) => (
              <article
                key={idx}
                className="dev-card group relative rounded-[28px] bg-[#141414] border border-white/10 p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-[#141414]  hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_24px_40px_-20px_rgba(0,0,0,0.6)]"
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${card.accent} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${card.accent} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div
                  className={`pointer-events-none absolute -inset-px rounded-[28px] bg-gradient-to-r ${card.accent} opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300`}
                ></div>

                <div className="flex items-start justify-between">
                  <h3 className="text-4xl md:text-5xl font-sharpGrotesk text-white">
                    {card.title}
                  </h3>
                  <span className="text-white/70 transform transition-transform duration-300 group-hover:translate-x-1">
                    {card.icon}
                  </span>
                </div>
                <p className="mt-4 text-[#C8C8C8] text-base md:text-lg max-w-2xl">
                  {card.subtitle}
                </p>
              </article>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {rightCards.map((card, idx) => (
              <article
                key={idx}
                className="dev-card group relative rounded-[28px] bg-[#141414] border border-white/10 p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-[#141414]  hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_24px_40px_-20px_rgba(0,0,0,0.6)]"
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${card.accent} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${card.accent} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div
                  className={`pointer-events-none absolute -inset-px rounded-[28px] bg-gradient-to-r ${card.accent} opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300`}
                ></div>

                <div className="flex items-start justify-between">
                  <h3 className="text-4xl md:text-5xl font-sharpGrotesk text-white">
                    {card.title}
                  </h3>
                  <span className="text-white/70 transform transition-transform duration-300 group-hover:translate-x-1">
                    {card.icon}
                  </span>
                </div>
                <p className="mt-4 text-[#C8C8C8] text-base md:text-lg max-w-2xl">
                  {card.subtitle}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Section4;
