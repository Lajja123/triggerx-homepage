"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
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
      // Title entrance
      const titleText = sectionRef.current?.querySelector(".title-text");
      if (titleText) {
        gsap.fromTo(
          titleText,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleText,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Feature cards fade + lift
      const cards = sectionRef.current?.querySelectorAll(".feature-card");
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.1,
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

  const features = [
    {
      title: "Comprehensive Automation",
      subtitle: "Advanced automation across time, events, and conditions",
      description: [
        "Time-Based Scheduling",
        "Event-Driven Triggers",
        "Condition Monitoring",
      ],
      color: "#5047FF",
      icon: "⚡",
      gradient: "from-[#5047FF] to-[#7C3AED]",
    },
    {
      title: "Crypto-Economic Security",
      subtitle: "Built on EigenLayer with incentivized honest behavior",
      description: [
        "EigenLayer Integration",
        "AVS System",
        "Malicious Activity Protection",
      ],
      color: "#F8FF7C",
      icon: "🛡️",
      gradient: "from-[#F8FF7C] to-[#FFD700]",
    },
    {
      title: "Multi-Chain Scalability",
      subtitle: "Seamlessly scale across emerging L2 networks",
      description: [
        "L2 Integration",
        "Cross-Chain Operations",
        "Future-Proof Architecture",
      ],
      color: "#5047FF",
      icon: "🌐",
      gradient: "from-[#5047FF] to-[#3B82F6]",
    },
    {
      title: "Decentralized Network",
      subtitle: "Robust infrastructure powered by independent keepers",
      description: [
        "Independent Keepers",
        "Tamper-Proof System",
        "Network Resilience",
      ],
      color: "#F8FF7C",
      icon: "🔗",
      gradient: "from-[#F8FF7C] to-[#10B981]",
    },
  ];

  return (
    <div ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Subtle brand gradient background */}
      <div className="absolute inset-0 " />

      <section className="relative z-10 w-[90%] max-w-[1600px] mx-auto py-20">
        {/* Main title */}
        <div className="text-center mb-20">
          <h1 className="title-text text-white font-sharpGrotesk text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
            What{" "}
            <span className="bg-gradient-to-r from-[var(--brand-b)] to-[var(--brand-a)] bg-clip-text text-transparent">
              TriggerX
            </span>{" "}
            Offers
          </h1>
          <p className="text-[#A2A2A2] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover the future of decentralized automation with a refined,
            modern design
          </p>
        </div>

        {/* Clean staggered glass-card grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#141414] group relative p-8 rounded-2xl  "
            >
              {/* Brand accent overlay */}
              <div className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 " />

              {/* Corner glow */}
              <div className="pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[var(--brand-b)]/10 blur-3xl" />

              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--brand-b)] to-[var(--brand-a)] text-black flex items-center justify-center font-bold shadow-inner">
                    {index + 1}
                  </div>
                  <h3 className="text-white font-actayWide text-xl lg:text-2xl leading-tight">
                    {feature.title}
                  </h3>
                </div>
                <div className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {feature.icon}
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-[#CCCCCC] text-sm lg:text-base mb-6 leading-relaxed">
                {feature.subtitle}
              </p>

              {/* Bullets */}
              <div className="space-y-3">
                {feature.description.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-3">
                    <span className="inline-block w-2 h-2 rounded-full " />
                    <span className="text-[#E5E5E5] text-sm lg:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="text-center space-y-8 mt-20">
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
