"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Section5() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const contactCards = [
    {
      id: 1,
      title: "Speak to Us",
      description: "Have questions? Our team is here to help you get started.",
      icon: (
        <svg
          className="w-6 h-6 text-[#82FBD0]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      link: "mailto:hello@triggerx.network",
      linkText: "hello@triggerx.network",
      color: "#82FBD0",
    },
    {
      id: 2,
      title: "Dev Hub",
      description:
        "Explore our developer resources and start building with our APIs.",
      icon: (
        <svg
          className="w-6 h-6 text-[#82FBD0]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      link: "https://app.triggerx.network/devhub",
      linkText: "Connect Now",
      color: "#82FBD0",
    },
    {
      id: 3,
      title: "Follow Us",
      description: "Stay updated with our latest news and announcements.",
      icon: (
        <svg
          className="w-6 h-6 text-[#f7fb82]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      ),
      link: "https://x.com/TriggerXnetwork",
      linkText: "Join Our Community",
      color: "#82FBD0",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background gradient
      const animatedBg = sectionRef.current?.querySelector(".animated-bg");
      if (animatedBg) {
        gsap.to(animatedBg, {
          background:
            "linear-gradient(45deg, #0a0a0a, #141414, #1a1a1a, #0a0a0a)",
          duration: 8,
          repeat: -1,
          ease: "none",
        });
      }

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

      // Main title animation
      const title = titleRef.current;
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Contact cards animation
      const cards = cardsRef.current?.querySelectorAll(".contact-card");
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
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

      // Mouse follower animation
      const mouseFollower =
        sectionRef.current?.querySelector(".mouse-follower");
      if (mouseFollower) {
        gsap.set(mouseFollower, { opacity: 0 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });

    const mouseFollower = sectionRef.current?.querySelector(".mouse-follower");
    if (mouseFollower) {
      gsap.to(mouseFollower, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleCardHover = (index: number) => {
    setHoveredCard(index);
    const card = sectionRef.current?.querySelector(`[data-card="${index}"]`);
    if (card) {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleCardLeave = (index: number) => {
    setHoveredCard(null);
    const card = sectionRef.current?.querySelector(`[data-card="${index}"]`);
    if (card) {
      gsap.to(card, {
        scale: 1,
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
      <div className="animated-bg absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#1a1a1a]"></div>

      {/* Floating background elements */}
      <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#82FBD0]/10 to-transparent rounded-full opacity-30"></div>
      <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#5047FF]/10 to-transparent rounded-full opacity-40"></div>
      <div className="floating-element absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-[#F8FF7C]/10 to-transparent rounded-full opacity-30"></div>
      <div className="floating-element absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-br from-[#82FBD0]/10 to-transparent rounded-full opacity-50"></div>

      {/* Particle system */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-[#82FBD0]/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Mouse follower */}
      <div className="mouse-follower fixed w-10 h-10 bg-gradient-to-r from-[#82FBD0]/20 to-[#5047FF]/20 rounded-full pointer-events-none z-50 blur-sm"></div>

      <section className="relative z-10 max-w-[1600px] mx-auto w-[90%] py-20">
        {/* Main Title */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="inline-block bg-gradient-to-r from-[#82FBD0] to-[#5047FF] p-1 rounded-lg mb-4">
            <span className="text-sm font-bold text-black px-3 py-1">
              • GET STARTED
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
            Get Started{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#82FBD0] via-[#5047FF] to-[#F8FF7C] bg-clip-text text-transparent animate-pulse">
                Today
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#82FBD0]/20 to-[#5047FF]/20 blur-xl rounded-full scale-150"></div>
            </span>
          </h1>
          <p className="text-[#A2A2A2] text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Join thousands of developers building the future of web3 with
            TriggerX
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {contactCards.map((card, index) => (
            <div
              key={card.id}
              data-card={index}
              className="contact-card group relative bg-gradient-to-br from-[#141414] to-[#1a1a1a] rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(130,251,208,0.3)] hover:border-[#82FBD0]/50 cursor-pointer"
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardLeave(index)}
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#82FBD0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating elements inside card */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-[#82FBD0]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-[#5047FF]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-8 h-full flex flex-col">
                <div className="flex-1">
                  {/* Icon container with enhanced styling */}
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#82FBD0]/10 to-[#5047FF]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_rgba(130,251,208,0.3)]">
                    {card.icon}
                  </div>

                  {/* Title with enhanced typography */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-[#82FBD0] transition-colors duration-300">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-base mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {card.description}
                  </p>
                </div>

                {/* Link with enhanced styling */}
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#82FBD0] group-hover:translate-x-2 transition-all duration-300 text-sm font-medium hover:text-[#F8FF7C]"
                >
                  {card.linkText}
                  <svg
                    className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `0 0 30px ${card.color}30` }}
              ></div>
            </div>
          ))}
        </div>

        {/* Interactive Stats Section */}
        <div className="text-center mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-[#82FBD0] mb-2 group-hover:scale-110 transition-transform duration-300">
                10K+
              </div>
              <div className="text-gray-400 text-lg">Active Developers</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-[#5047FF] mb-2 group-hover:scale-110 transition-transform duration-300">
                50M+
              </div>
              <div className="text-gray-400 text-lg">
                Transactions Processed
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-[#F8FF7C] mb-2 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-gray-400 text-lg">Uptime Reliability</div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-8 p-10 rounded-3xl border border-[#2a2a2a] bg-gradient-to-r from-[#1a1a1a] to-[#252525] hover:border-[#82FBD0]/50 transition-all duration-500 group cursor-pointer hover:shadow-[0_0_40px_rgba(130,251,208,0.2)]">
            <div className="w-20 h-20 bg-gradient-to-r from-[#82FBD0] to-[#5047FF] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_rgba(130,251,208,0.5)]">
              <span className="text-3xl">🚀</span>
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-[#82FBD0] transition-colors duration-300">
                Ready to Build the Future?
              </h3>
              <p className="text-[#A2A2A2] text-xl group-hover:text-gray-300 transition-colors duration-300">
                Start your journey with TriggerX and revolutionize your
                blockchain workflows
              </p>
            </div>
            <div className="w-16 h-16 bg-[#82FBD0]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-[#82FBD0]"
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

export default Section5;
