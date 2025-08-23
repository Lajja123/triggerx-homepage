"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced floating orbs with morphing
      const floatingOrbs =
        sectionRef.current?.querySelectorAll(".floating-orb");
      floatingOrbs?.forEach((orb, index) => {
        gsap.to(orb, {
          y: -100 + index * 60,
          x: Math.sin(index) * 80,
          scale: 1 + Math.sin(index) * 0.3,
          duration: 10 + index * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Enhanced timeline connector animation with morphing
      const timelineConnectors = sectionRef.current?.querySelectorAll(
        ".timeline-connector"
      );
      timelineConnectors?.forEach((connector, index) => {
        gsap.fromTo(
          connector,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 2,
            delay: index * 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: connector,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Enhanced main title with text reveal
      const titleText = sectionRef.current?.querySelector(".title-text");
      if (titleText) {
        gsap.fromTo(
          titleText,
          { opacity: 0, y: 120, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleText,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Enhanced animated gradient background
      const animatedBg = sectionRef.current?.querySelector(
        ".animated-gradient-bg"
      );
      if (animatedBg) {
        gsap.to(animatedBg, {
          backgroundPosition: "500% 500%",
          duration: 35,
          repeat: -1,
          ease: "none",
        });
      }

      // Enhanced feature ribbons with advanced animations
      const featureRibbons =
        sectionRef.current?.querySelectorAll(".feature-ribbon");
      featureRibbons?.forEach((ribbon, index) => {
        const ribbonElement = ribbon as HTMLElement;

        // Enhanced entrance animation with morphing
        gsap.fromTo(
          ribbonElement,
          {
            opacity: 0,
            x: index % 2 === 0 ? -300 : 300,
            scaleX: 0,
            scaleY: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 1.5,
            delay: index * 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ribbonElement,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Enhanced floating animation with easing
        gsap.to(ribbonElement, {
          y: -8,
          duration: 5 + index * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Enhanced hover effects without 3D
        ribbonElement.addEventListener("mouseenter", () => {
          gsap.to(ribbonElement, {
            scale: 1.02,
            y: -12,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        ribbonElement.addEventListener("mouseleave", () => {
          gsap.to(ribbonElement, {
            scale: 1,
            y: -8,
            duration: 0.6,
            ease: "power2.out",
          });
        });
      });

      // Enhanced progress indicator with morphing
      const progressBar = sectionRef.current?.querySelector(".progress-bar");
      if (progressBar) {
        gsap.to(progressBar, {
          width: "100%",
          duration: 3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        });
      }

      // Enhanced action buttons with bounce and morphing
      const actionButtons =
        sectionRef.current?.querySelectorAll(".action-button");
      actionButtons?.forEach((btn, index) => {
        gsap.fromTo(
          btn,
          { opacity: 0, scale: 0, y: 100, rotation: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0,
            duration: 1.2,
            delay: 2.5 + index * 0.4,
            ease: "elastic.out(1, 0.8)",
            scrollTrigger: {
              trigger: btn,
              start: "top 95%",
              end: "bottom 5%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Enhanced particle system with morphing
      const particles = sectionRef.current?.querySelectorAll(".particle");
      particles?.forEach((particle, index) => {
        gsap.to(particle, {
          y: -400,
          x: Math.sin(index) * 500,
          opacity: 0,
          scale: 0,
          rotation: 360,
          duration: 6 + Math.random() * 4,
          repeat: -1,
          delay: index * 0.4,
          ease: "power1.out",
        });
      });

      // Enhanced glow effects with morphing
      const glowElements = sectionRef.current?.querySelectorAll(".glow-effect");
      glowElements?.forEach((glow, index) => {
        gsap.to(glow, {
          opacity: 0.7,
          scale: 1.4,
          duration: 6 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Enhanced timeline line animation
      const timelineLine = sectionRef.current?.querySelector(".timeline-line");
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineLine,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Enhanced feature icons animation
      const featureIcons =
        sectionRef.current?.querySelectorAll(".feature-icon");
      featureIcons?.forEach((icon, index) => {
        gsap.to(icon, {
          y: -5,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleFeatureHover = (index: number) => {
    setActiveFeature(index);
  };

  const handleFeatureLeave = () => {
    setActiveFeature(null);
  };

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
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced animated gradient background */}
      <div className="animated-gradient-bg absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] bg-[length:600%_600%]"></div>

      {/* Enhanced floating orbs */}
      <div className="floating-orb absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[#5047FF]/40 to-[#F8FF7C]/40 rounded-full blur-2xl"></div>
      <div className="floating-orb absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#F8FF7C]/35 to-[#5047FF]/35 rounded-full blur-3xl"></div>
      <div className="floating-orb absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-br from-[#5047FF]/25 to-[#F8FF7C]/25 rounded-full blur-xl"></div>

      {/* Enhanced particle system */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Enhanced interactive mouse follower */}
      <div
        className="fixed w-10 h-10 bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] rounded-full pointer-events-none z-50 transition-transform duration-300 ease-out mix-blend-screen"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          transform: `scale(${activeFeature !== null ? 2 : 1})`,
        }}
      />

      {/* Enhanced progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#1a1a2e] z-50">
        <div className="progress-bar h-full bg-gradient-to-r from-[#5047FF] via-[#F8FF7C] to-[#5047FF] w-0 shadow-lg shadow-[#5047FF]/50"></div>
      </div>

      <section className="relative z-10 w-[90%] max-w-[1600px] mx-auto py-20">
        {/* Enhanced main title */}
        <div className="text-center mb-24">
          <h1 className="title-text text-white font-sharpGrotesk text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight">
            What{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] bg-clip-text text-transparent">
                TriggerX
              </span>
              <div className="glow-effect absolute inset-0 bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] blur-2xl rounded-full scale-150 opacity-30"></div>
            </span>{" "}
            Offers
          </h1>
          <p className="text-[#A2A2A2] text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Discover the future of decentralized automation with cutting-edge
            features
          </p>
        </div>

        {/* Enhanced timeline-style feature showcase */}
        <div className="relative">
          {/* Enhanced central timeline line */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#5047FF] via-[#F8FF7C] to-[#5047FF] opacity-30 origin-top"></div>

          {features.map((feature, index) => (
            <div key={index} className="relative mb-32">
              {/* Enhanced timeline connector */}
              <div className="timeline-connector absolute left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-[#5047FF] to-[#F8FF7C] origin-top"></div>

              {/* Enhanced feature ribbon */}
              <div
                className={`feature-ribbon group cursor-pointer relative ${
                  index % 2 === 0
                    ? "ml-0 mr-auto w-[45%]"
                    : "ml-auto mr-0 w-[45%]"
                } p-8 rounded-2xl bg-gradient-to-r ${
                  feature.gradient
                } bg-opacity-10 backdrop-blur-xl border border-white/10 transition-all duration-500 hover:bg-opacity-20 hover:border-white/20`}
                onMouseEnter={() => handleFeatureHover(index)}
                onMouseLeave={handleFeatureLeave}
              >
                {/* Enhanced ribbon tail */}
                <div
                  className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r ${
                    feature.gradient
                  } ${
                    index % 2 === 0 ? "-right-2 rotate-45" : "-left-2 rotate-45"
                  }`}
                ></div>

                {/* Enhanced feature icon */}
                <div className="feature-icon absolute top-6 right-6 text-4xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {feature.icon}
                </div>

                <div className="relative z-10">
                  {/* Enhanced title */}
                  <h3 className="text-white font-actayWide text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                    {feature.title}
                  </h3>

                  {/* Enhanced subtitle */}
                  <p className="text-[#CCCCCC] text-base lg:text-lg mb-6 leading-relaxed">
                    {feature.subtitle}
                  </p>

                  {/* Enhanced feature list */}
                  <div className="space-y-3">
                    {feature.description.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center gap-3 group/item"
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 group-hover/item:scale-150"
                          style={{ backgroundColor: feature.color }}
                        />
                        <span className="text-[#CCCCCC] text-sm lg:text-base group-hover/item:text-white transition-colors duration-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced interactive indicator */}
                  <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced action buttons */}
        <div className="text-center space-y-8 mt-20">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="https://app.triggerx.network/devhub" target="blank">
              <button className="action-button relative bg-gradient-to-r from-[#5047FF] to-[#7C3AED] text-white px-12 py-5 rounded-full font-medium hover:scale-105 transition-all duration-300 group shadow-lg shadow-[#5047FF]/25">
                <span className="relative z-10">Explore Dev Hub</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>

            <button
              onClick={() => scrollToSection("contact-section")}
              className="action-button relative bg-gradient-to-r from-[#F8FF7C] to-[#FFD700] text-black px-12 py-5 rounded-full font-medium hover:scale-105 transition-all duration-300 group shadow-lg shadow-[#F8FF7C]/25"
            >
              <span className="relative z-10">Let&apos;s Talk</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#F8FF7C] to-[#5047FF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
