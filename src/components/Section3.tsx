"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayDurationMs = 3500;

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

  // Autoplay for right-side horizontal boxes
  useEffect(() => {
    let rafId = 0;
    let start = performance.now();
    const tick = (now: number) => {
      if (isHovered) {
        start = now; // reset when paused
      }
      const elapsed = now - start;
      if (elapsed >= autoplayDurationMs) {
        setCurrentIndex((prev) => (prev + 1) % features.length);
        start = now;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isHovered, autoplayDurationMs, features.length]);

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

        {/* Two-column: left visual, right vertical autoplay boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Left visual that changes with currentIndex */}
          <div className="relative rounded-2xl overflow-hidden bg-[#141414] min-h-[320px] lg:min-h-[520px] flex items-center justify-center">
            <div
              key={currentIndex}
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                // Tailwind can't dynamically apply gradient classes; use inline fallback with CSS vars from brand colors
              }}
            />
            <div className="relative z-10 text-center p-10">
              <div
                className="mx-auto mb-6 w-20 h-20 lg:w-28 lg:h-28 rounded-2xl flex items-center justify-center text-4xl lg:text-6xl"
                style={{
                  background:
                    currentIndex % 2 === 0
                      ? "linear-gradient(135deg, var(--brand-b), var(--brand-a))"
                      : "linear-gradient(135deg, var(--brand-a), var(--brand-b))",
                }}
              >
                <span className="drop-shadow">
                  {features[currentIndex].icon}
                </span>
              </div>
              <h3 className="text-white font-actayWide text-2xl lg:text-4xl leading-tight">
                {features[currentIndex].title}
              </h3>
              <p className="text-[#CCCCCC] mt-3 text-sm lg:text-base max-w-xl mx-auto">
                {features[currentIndex].subtitle}
              </p>
            </div>
          </div>

          {/* Right vertical autoplaying boxes */}
          <div
            className="relative rounded-2xl bg-[#141414] overflow-hidden h-[320px] lg:h-[520px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="w-full h-full overflow-hidden">
              <div
                className="flex flex-col h-full transition-transform duration-500 ease-out"
                style={{
                  transform: `translateY(-${currentIndex * 100}%)`,
                  height: `${features.length * 100}%`,
                }}
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="w-full h-full flex-shrink-0 p-6 lg:p-8"
                  >
                    <div className="group relative p-6 lg:p-8 rounded-2xl  h-full">
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--brand-b)] to-[var(--brand-a)] text-black flex items-center justify-center font-bold shadow-inner">
                            {index + 1}
                          </div>
                          <h4 className="text-white font-actayWide text-lg lg:text-xl leading-tight">
                            {feature.title}
                          </h4>
                        </div>
                        <div className="text-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                          {feature.icon}
                        </div>
                      </div>
                      <p className="text-[#CCCCCC] text-sm lg:text-base mb-4 leading-relaxed">
                        {feature.subtitle}
                      </p>
                      <div className="space-y-2">
                        {feature.description.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center gap-3"
                          >
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--brand-b)]/80" />
                            <span className="text-[#E5E5E5] text-sm lg:text-base">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots and controls */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "bg-[var(--brand-b)] ring-4 ring-[var(--brand-b)]/20"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to item ${idx + 1}`}
                />
              ))}
            </div>
          </div>
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
