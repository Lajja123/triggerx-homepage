"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Section4() {
  const [activeTab, setActiveTab] = useState("developers");
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const tabs = [
    {
      id: "developers",
      title: "Developers",
      icon: "👨‍💻",
      description: "Build powerful dApps with automated triggers",
      features: [
        "Smart Contract Automation",
        "Cross-Chain Integration",
        "API Call Triggers",
        "Event-Driven Architecture",
      ],
    },
    {
      id: "defi",
      title: "DeFi Protocols",
      icon: "🏦",
      description: "Enhance your protocol with intelligent automation",
      features: [
        "Liquidity Management",
        "Yield Optimization",
        "Risk Monitoring",
        "Governance Automation",
      ],
    },
    {
      id: "enterprise",
      title: "Enterprises",
      icon: "🏢",
      description: "Streamline operations with blockchain automation",
      features: [
        "Workflow Automation",
        "Security Monitoring",
        "Compliance Tracking",
        "Integration APIs",
      ],
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users", icon: "👥" },
    { value: "50+", label: "Integrations", icon: "🔗" },
    { value: "99.9%", label: "Uptime", icon: "⚡" },
    { value: "$2M+", label: "Volume", icon: "💰" },
  ];

  const useCases = [
    {
      name: "Automated Trading",
      icon: "📈",
      status: "LIVE",
      statusColor: "green",
      description: "Set triggers for automated buy/sell orders",
    },
    {
      name: "Yield Farming",
      icon: "🌾",
      status: "LIVE",
      statusColor: "green",
      description: "Automatically compound rewards across protocols",
    },
    {
      name: "Liquidity Provision",
      icon: "💧",
      status: "LIVE",
      statusColor: "green",
      description: "Dynamic liquidity management with triggers",
    },
    {
      name: "Governance Voting",
      icon: "🗳️",
      status: "BETA",
      statusColor: "blue",
      description: "Automated participation in DAO governance",
    },
    {
      name: "Cross-Chain Bridge",
      icon: "🌉",
      status: "COMING SOON",
      statusColor: "purple",
      description: "Automated cross-chain asset transfers",
    },
    {
      name: "NFT Automation",
      icon: "🎨",
      status: "COMING SOON",
      statusColor: "purple",
      description: "Smart triggers for NFT operations",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      const hero = heroRef.current;
      if (hero) {
        gsap.fromTo(
          hero,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: hero,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Stats animations
      const stats = statsRef.current;
      if (stats) {
        gsap.fromTo(
          stats,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stats,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Features section animations
      const features = featuresRef.current;
      if (features) {
        gsap.fromTo(
          features,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: features,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Tab content animations
      const tabContent = sectionRef.current?.querySelectorAll(".tab-content");
      tabContent?.forEach((content, index) => {
        gsap.fromTo(
          content,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.1,
          }
        );
      });

      // Use case cards animation
      const useCaseCards =
        sectionRef.current?.querySelectorAll(".use-case-card");
      useCaseCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Floating elements animation
      const floatingElements =
        sectionRef.current?.querySelectorAll(".floating-element");
      floatingElements?.forEach((element, index) => {
        gsap.to(element, {
          y: -20,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5047FF]/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#F8FF7C]/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#5047FF]/5 rounded-full"></div>
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-20">
          <div className="inline-block bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] p-1 rounded-full mb-6">
            <span className="text-sm font-bold text-black px-4 py-2">
              🚀 WHO IS TRIGGERX FOR?
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight">
            Built for{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#F8FF7C] via-[#5047FF] to-[#F8FF7C] bg-clip-text text-transparent">
                Innovators
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#F8FF7C]/20 to-[#5047FF]/20 blur-xl rounded-full scale-150"></div>
            </span>
          </h1>

          <p className="text-[#A2A2A2] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            Whether you&apos;re a developer, DeFi protocol, or enterprise,
            TriggerX provides the automation tools you need to build the future.
          </p>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-[#A2A2A2] text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Interactive Tabs Section */}
        <div ref={featuresRef} className="mb-20">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[#5047FF]/20 border-[#5047FF] text-white"
                    : "bg-white/5 border-white/20 text-[#A2A2A2] hover:border-white/40"
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="font-medium">{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab-content ${
                  activeTab === tab.id ? "block" : "hidden"
                }`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {tab.title}
                  </h3>
                  <p className="text-[#A2A2A2] text-lg">{tab.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tab.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className="w-8 h-8 bg-[#5047FF]/20 rounded-lg flex items-center justify-center">
                        <span className="text-[#5047FF]">✓</span>
                      </div>
                      <span className="text-white font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Popular Use Cases
            </h2>
            <p className="text-[#A2A2A2] text-lg">
              See how TriggerX is being used across the ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="use-case-card group relative bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#5047FF]/50 transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#5047FF]/20 rounded-xl flex items-center justify-center group-hover:bg-[#5047FF]/30 transition-colors duration-300">
                    <span className="text-2xl">{useCase.icon}</span>
                  </div>

                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      useCase.statusColor === "green"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : useCase.statusColor === "blue"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    }`}
                  >
                    {useCase.status}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F8FF7C] transition-colors duration-300">
                  {useCase.name}
                </h3>

                <p className="text-[#A2A2A2] text-sm leading-relaxed">
                  {useCase.description}
                </p>

                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "0 0 30px rgba(80, 71, 255, 0.2)" }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-[#5047FF]/10 to-[#F8FF7C]/10 border border-[#5047FF]/30 backdrop-blur-sm">
            <div className="w-20 h-20 bg-gradient-to-r from-[#F8FF7C] to-[#5047FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🚀</span>
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>

            <p className="text-[#A2A2A2] text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of developers and protocols already using TriggerX
              to automate their blockchain workflows.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] text-black font-bold rounded-xl hover:scale-105 transition-transform duration-300">
                Start Building
              </button>
              <button className="px-8 py-4 border border-white/30 text-white font-medium rounded-xl hover:border-[#5047FF] hover:bg-[#5047FF]/10 transition-all duration-300">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Section4;
