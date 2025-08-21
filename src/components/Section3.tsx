"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating background elements
      const floatingElements =
        sectionRef.current?.querySelectorAll(".floating-element");
      floatingElements?.forEach((el, index) => {
        gsap.to(el, {
          y: -30 + index * 20,
          x: 20 - index * 10,
          rotation: 5 - index * 2,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Main title animation with text reveal
      const titleText = sectionRef.current?.querySelector(".title-text");
      if (titleText) {
        gsap.fromTo(
          titleText,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleText,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animated background gradient
      const bgGradient = sectionRef.current?.querySelector(".animated-bg");
      if (bgGradient) {
        gsap.to(bgGradient, {
          backgroundPosition: "200% 200%",
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }

      // Interactive cards with 3D effect
      const cards = sectionRef.current?.querySelectorAll(".interactive-card");
      cards?.forEach((card, index) => {
        const cardElement = card as HTMLElement;

        // Initial card animation
        gsap.fromTo(
          cardElement,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotationY: 45,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: cardElement,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Mouse move 3D effect
        cardElement.addEventListener("mousemove", (e) => {
          const rect = cardElement.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;

          gsap.to(cardElement, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        // Reset rotation on mouse leave
        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });

      // Progress indicator animation
      const progressBar = sectionRef.current?.querySelector(".progress-bar");
      if (progressBar) {
        gsap.to(progressBar, {
          width: "100%",
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        });
      }

      // Floating action buttons
      const actionButtons =
        sectionRef.current?.querySelectorAll(".action-button");
      actionButtons?.forEach((btn, index) => {
        gsap.fromTo(
          btn,
          { opacity: 0, scale: 0, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: 1 + index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: btn,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Particle system animation
      const particles = sectionRef.current?.querySelectorAll(".particle");
      particles?.forEach((particle, index) => {
        gsap.to(particle, {
          y: -100,
          x: Math.random() * 200 - 100,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          delay: index * 0.1,
          ease: "power1.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index);

    // Animate the clicked card
    const card = sectionRef.current?.querySelector(
      `[data-card="${index}"]`
    ) as HTMLElement;
    if (card) {
      gsap.to(card, {
        scale: activeCard === index ? 1 : 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background */}
      <div className="animated-bg absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#1a1a1a] bg-[length:400%_400%]"></div>

      {/* Floating decorative elements */}
      <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-[#5047FF]/10 rounded-full blur-xl"></div>
      <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-[#F8FF7C]/10 rounded-full blur-2xl"></div>
      <div className="floating-element absolute bottom-40 left-1/4 w-16 h-16 bg-[#5047FF]/5 rounded-full blur-lg"></div>

      {/* Particle system */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-[#5047FF]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Mouse follower */}
      <div
        className="fixed w-4 h-4 bg-[#5047FF]/20 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${activeCard !== null ? 2 : 1})`,
        }}
      />

      <section className="relative z-10 w-[90%] max-w-[1600px] mx-auto py-20">
        {/* Progress indicator */}
        <div className="fixed top-0 left-0 w-full h-1 bg-[#2a2a2a] z-50">
          <div className="progress-bar h-full bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] w-0"></div>
        </div>

        {/* Main title with animated text */}
        <div className="text-center mb-20">
          <h1 className="title-text text-white font-sharpGrotesk text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            What{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#5047FF] bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] bg-clip-text text-transparent">
                TriggerX
              </span>
              <div className="absolute inset-0 bg-[#5047FF]/10 blur-xl rounded-full scale-150"></div>
            </span>{" "}
            Offers
          </h1>
          <p className="text-[#A2A2A2] text-lg md:text-xl max-w-2xl mx-auto">
            Discover the future of decentralized automation with cutting-edge
            features
          </p>
        </div>

        {/* Interactive feature cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {[
            {
              title: "Comprehensive Automation",
              icon: "⚡",
              description:
                "Advanced automation across time, events, and conditions",
              features: [
                "Time-Based Scheduling",
                "Event-Driven Triggers",
                "Condition Monitoring",
              ],
              color: "#5047FF",
            },
            {
              title: "Crypto-Economic Security",
              icon: "🛡️",
              description:
                "Built on EigenLayer with incentivized honest behavior",
              features: [
                "EigenLayer Integration",
                "AVS System",
                "Malicious Activity Protection",
              ],
              color: "#F8FF7C",
            },
            {
              title: "Multi-Chain Scalability",
              icon: "🌐",
              description: "Seamlessly scale across emerging L2 networks",
              features: [
                "L2 Integration",
                "Cross-Chain Operations",
                "Future-Proof Architecture",
              ],
              color: "#5047FF",
            },
            {
              title: "Decentralized Network",
              icon: "🔗",
              description:
                "Robust infrastructure powered by independent keepers",
              features: [
                "Independent Keepers",
                "Tamper-Proof System",
                "Network Resilience",
              ],
              color: "#F8FF7C",
            },
          ].map((feature, index) => (
            <div
              key={index}
              data-card={index}
              className={`interactive-card group cursor-pointer relative p-8 rounded-2xl border border-[#2a2a2a] bg-gradient-to-br from-[#1a1a1a] to-[#252525] transition-all duration-300 ${
                activeCard === index
                  ? "border-[#5047FF] shadow-2xl shadow-[#5047FF]/20"
                  : "hover:border-[#5047FF]/50"
              }`}
              onClick={() => handleCardClick(index)}
            >
              {/* Card background glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${feature.color}20 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon and title */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-actayWide text-xl lg:text-2xl font-bold">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[#A2A2A2] text-sm lg:text-base mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Feature list */}
                <div className="space-y-3">
                  {feature.features.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: feature.color }}
                      />
                      <span className="text-[#CCCCCC] text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive indicator */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#5047FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { number: "99.9%", label: "Uptime", color: "#5047FF" },
            { number: "50+", label: "Supported Chains", color: "#F8FF7C" },
            { number: "24/7", label: "Monitoring", color: "#5047FF" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl border border-[#2a2a2a] bg-gradient-to-br from-[#1a1a1a] to-[#252525] hover:border-[#5047FF]/50 transition-all duration-300 group"
            >
              <div
                className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
                style={{ color: stat.color }}
              >
                {stat.number}
              </div>
              <div className="text-[#A2A2A2] text-lg">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Action buttons with floating animation */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="action-button relative bg-gradient-to-r from-[#5047FF] to-[#5047FF]/80 text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-300 group">
              <span className="relative z-10">Explore Dev Hub</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="action-button relative bg-gradient-to-r from-[#F8FF7C] to-[#F8FF7C]/80 text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-300 group">
              <span className="relative z-10">Let&apos;s Talk</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#F8FF7C] to-[#5047FF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          <p className="text-[#A2A2A2] text-sm">
            Ready to revolutionize your automation? Join thousands of developers
            already using TriggerX
          </p>
        </div>
      </section>
    </div>
  );
}
