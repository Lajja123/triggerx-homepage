"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Section4() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);

  const features = [
    "Network Security",
    "Validation rewards",
    "Ecosystem building",
    "Transaction payments",
    "Liquidity provisioning",
  ];

  const useCases = [
    {
      name: "Automated API Calls",
      icon: "⚡",
      status: "POPULAR",
      statusColor: "green",
    },
    {
      name: "Governance Actions",
      icon: "🏛️",
      status: "POPULAR",
      statusColor: "green",
    },
    {
      name: "Liquidity Management",
      icon: "💧",
      status: "POPULAR",
      statusColor: "green",
    },
    {
      name: "Token Operations",
      icon: "🪙",
      status: "SOON",
      statusColor: "blue",
    },
    {
      name: "User Notifications",
      icon: "🔔",
      status: null,
      statusColor: null,
    },
    {
      name: "Smart Contracts",
      icon: "📜",
      status: null,
      statusColor: null,
    },
    {
      name: "Cross-Chain Bridge",
      icon: "🌉",
      status: null,
      statusColor: null,
    },
    {
      name: "DeFi Integration",
      icon: "🏦",
      status: null,
      statusColor: null,
    },
    {
      name: "Analytics Dashboard",
      icon: "📊",
      status: null,
      statusColor: null,
    },
    {
      name: "Security Monitoring",
      icon: "🛡️",
      status: null,
      statusColor: null,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background text (like the $KIMA repeating text)
      const bgText = sectionRef.current?.querySelector(".bg-text");
      if (bgText) {
        gsap.to(bgText, {
          x: -1000,
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }

      // Central coin rotation and glow
      const coin = coinRef.current;
      if (coin) {
        // Continuous rotation
        gsap.to(coin, {
          rotationY: 360,
          duration: 8,
          repeat: -1,
          ease: "none",
        });

        // Floating animation
        gsap.to(coin, {
          y: -20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Glow pulse
        gsap.to(coin, {
          filter:
            "brightness(1.3) drop-shadow(0 0 30px rgba(80, 71, 255, 0.8))",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Orbiting rings animation
      const rings = sectionRef.current?.querySelectorAll(".orbit-ring");
      rings?.forEach((ring, index) => {
        gsap.to(ring, {
          rotation: 360,
          duration: 10 + index * 2,
          repeat: -1,
          ease: "none",
        });
      });

      // News headline text animation
      const headline = headlineRef.current;
      if (headline) {
        gsap.fromTo(
          headline,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: headline,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Features list animation
      const featureItems =
        sectionRef.current?.querySelectorAll(".feature-item");
      featureItems?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Particle system
      const particles = sectionRef.current?.querySelectorAll(".particle");
      particles?.forEach((particle, index) => {
        gsap.to(particle, {
          y: -150,
          x: Math.random() * 300 - 150,
          opacity: 0,
          duration: 4 + Math.random() * 3,
          repeat: -1,
          delay: index * 0.3,
          ease: "power1.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });

    // Parallax effect for coin
    const coin = coinRef.current;
    if (coin) {
      const rect = coin.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const moveX = (e.clientX - centerX) / 50;
      const moveY = (e.clientY - centerY) / 50;

      gsap.to(coin, {
        x: moveX,
        y: moveY,
        duration: 0.5,
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#1a1a1a]"></div>

      {/* Repeating background text (like $KIMA) */}
      <div className="bg-text absolute top-20 left-0 w-full text-white/5 text-6xl font-bold whitespace-nowrap select-none">
        TRIGGERX _ TRIGGERX _ TRIGGERX _ TRIGGERX _ TRIGGERX _ TRIGGERX _
        TRIGGERX _ TRIGGERX
      </div>

      {/* Dotted background patterns */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full opacity-30"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full opacity-30"></div>

      {/* Particle system */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-[#5047FF]/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <section className="relative z-10 max-w-[1600px] mx-auto w-[90%] py-20">
        {/* News Headline Style Title */}
        <div ref={headlineRef} className="text-center mb-20">
          <div className="inline-block bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] p-1 rounded-lg mb-4">
            <span className="text-sm font-bold text-black px-3 py-1">
              • TRIGGERX COIN
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
            Who is{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#F8FF7C] via-[#5047FF] to-[#F8FF7C] bg-clip-text text-transparent animate-pulse">
                TRIGGERX
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#F8FF7C]/20 to-[#5047FF]/20 blur-xl rounded-full scale-150"></div>
            </span>{" "}
            For?
          </h1>
          <p className="text-[#A2A2A2] text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Whether you&apos;re a dApp developer, DeFi protocol creator, or
            enterprise innovator, TriggerX empowers you to automate tasks with
            ease and confidence.
          </p>
        </div>

        {/* Central Layout with 3D Coin */}
        <div className="relative min-h-[600px] flex items-center justify-center mb-20">
          {/* Central 3D Coin */}
          <div ref={coinRef} className="relative z-20">
            <div className="w-48 h-48 bg-gradient-to-br from-[#5047FF] via-[#7C3AED] to-[#F8FF7C] rounded-full flex items-center justify-center shadow-2xl relative">
              {/* Coin face with gradient */}
              <div className="w-40 h-40 bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Holographic effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>

                {/* Letter T embossed */}
                <span className="text-6xl font-bold text-white/90 relative z-10">
                  T
                </span>

                {/* Metallic rim effect */}
                <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>
              </div>

              {/* Coin rim with ridges */}
              <div className="absolute inset-0 rounded-full border-8 border-white/20"></div>
            </div>

            {/* Orbiting rings */}
            <div className="orbit-ring absolute top-1/2 left-1/2 w-64 h-64 border border-[#5047FF]/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="orbit-ring absolute top-1/2 left-1/2 w-80 h-80 border border-[#F8FF7C]/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="orbit-ring absolute top-1/2 left-1/2 w-96 h-96 border border-[#5047FF]/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Left Content - Tokenomics */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 max-w-sm">
            <h3 className="text-2xl font-bold text-white mb-6">
              The TriggerX tokenomics model
            </h3>
            <p className="text-[#A2A2A2] text-lg leading-relaxed">
              powers the protocol, enabling robust security, validation rewards
              and efficient transactions.
            </p>
            <div className="mt-8 text-sm text-[#A2A2A2]">
              <span className="text-[#5047FF]">TriggerX</span> AI-powered
              automation
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 max-w-sm">
            <h3 className="text-2xl font-bold text-white mb-6">
              <span className="text-[#5047FF]">•</span>{" "}
              <span className="bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] bg-clip-text text-transparent">
                TRIGGERX
              </span>{" "}
              FEATURES
            </h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="feature-item text-white text-lg flex items-center"
                >
                  <span className="w-2 h-2 bg-[#5047FF] rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Use Cases Section - Matching Reference Image Style */}
        <div ref={useCasesRef} className="mb-20">
          {/* Container with wavy top edge and glowing outline */}
          <div className="relative bg-[#0a0a0a] rounded-3xl p-8 border border-[#5047FF]/30 shadow-2xl shadow-[#5047FF]/10">
            {/* Wavy top edge */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#0a0a0a] rounded-t-3xl">
              <svg viewBox="0 0 1200 32" className="w-full h-full">
                <path
                  d="M0,16 Q300,0 600,16 T1200,16 L1200,32 L0,32 Z"
                  fill="#0a0a0a"
                  stroke="url(#wavyGradient)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient
                    id="wavyGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#5047FF" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#F8FF7C" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#5047FF" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Title */}
            <div className="text-center mb-12 mt-8">
              <h2 className="text-3xl font-bold text-white">Get TriggerX:</h2>
            </div>

            {/* Two-column grid of use cases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="use-case-button group relative bg-[#1a1a1a] rounded-xl p-4 border border-white/20 hover:border-[#5047FF]/50 transition-all duration-300 cursor-pointer"
                >
                  {/* Corner brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-white/30 rounded-tl"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-white/30 rounded-tr"></div>
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-white/30 rounded-bl"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-white/30 rounded-br"></div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#5047FF]/20 transition-colors duration-300">
                        <span className="text-lg">{useCase.icon}</span>
                      </div>
                      <span className="text-white font-medium group-hover:text-[#F8FF7C] transition-colors duration-300">
                        {useCase.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Arrow icon */}
                      <svg
                        className="w-4 h-4 text-white/60 group-hover:text-[#5047FF] transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 17l9.2-9.2M17 17V7H7"
                        />
                      </svg>

                      {/* Status label */}
                      {useCase.status && (
                        <div
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            useCase.statusColor === "green"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          }`}
                        >
                          {useCase.status}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: "0 0 20px rgba(80, 71, 255, 0.3)" }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-6 p-8 rounded-2xl border border-[#2a2a2a] bg-gradient-to-r from-[#1a1a1a] to-[#252525] hover:border-[#5047FF]/50 transition-all duration-300 group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-r from-[#F8FF7C] to-[#5047FF] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to get started?
              </h3>
              <p className="text-[#A2A2A2] text-lg">
                Discover how TriggerX can automate your blockchain workflows
              </p>
            </div>
            <div className="w-12 h-12 bg-[#5047FF]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-[#5047FF]"
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Section4;
