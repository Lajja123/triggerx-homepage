"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/AnimatedButton";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header background animation on scroll
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          backgroundColor: isScrolled
            ? "rgba(20, 20, 20, 0.95)"
            : "rgba(20, 20, 20, 0.8)",
          backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
          borderBottomColor: isScrolled
            ? "rgba(80, 71, 255, 0.3)"
            : "rgba(255, 255, 255, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Enhanced logo animations
      const logoLetters = logoRef.current?.querySelectorAll("img");
      if (logoLetters) {
        // Initial stagger animation for logo letters
        gsap.fromTo(
          logoLetters,
          {
            y: -30,
            opacity: 0,
            rotation: -15,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 0.2,
          }
        );

        // Enhanced hover animations for individual letters
        logoLetters.forEach((letter, index) => {
          letter.addEventListener("mouseenter", () => {
            gsap.to(letter, {
              y: -12,
              rotation: 20,
              scale: 1.3,
              duration: 0.4,
              ease: "back.out(1.7)",
            });

            // Animate adjacent letters with ripple effect
            if (index > 0) {
              gsap.to(logoLetters[index - 1], {
                y: -6,
                rotation: 10,
                scale: 1.15,
                duration: 0.3,
                ease: "back.out(1.7)",
              });
            }
            if (index < logoLetters.length - 1) {
              gsap.to(logoLetters[index + 1], {
                y: -6,
                rotation: 10,
                scale: 1.15,
                duration: 0.3,
                ease: "back.out(1.7)",
              });
            }

            // Add glow effect
            gsap.to(letter, {
              filter:
                "brightness(1.5) drop-shadow(0 0 10px rgba(80, 71, 255, 0.8))",
              duration: 0.3,
            });
          });

          letter.addEventListener("mouseleave", () => {
            gsap.to(logoLetters, {
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            });

            gsap.to(letter, {
              filter: "brightness(1) drop-shadow(0 0 0px rgba(80, 71, 255, 0))",
              duration: 0.3,
            });
          });
        });

        // Logo container hover effect
        const logoContainer = logoRef.current?.parentElement;
        if (logoContainer) {
          logoContainer.addEventListener("mouseenter", () => {
            gsap.to(logoLetters, {
              scale: 1.08,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          logoContainer.addEventListener("mouseleave", () => {
            gsap.to(logoLetters, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      }

      // Enhanced navigation link animations
      const navLinks = navLinksRef.current?.querySelectorAll("a");
      if (navLinks) {
        navLinks.forEach((link, index) => {
          // Initial entrance animation
          gsap.fromTo(
            link,
            { opacity: 0, y: -20, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: 0.5 + index * 0.1,
              ease: "back.out(1.7)",
            }
          );

          // Enhanced hover animations
          link.addEventListener("mouseenter", () => {
            setActiveLink(link.textContent);

            gsap.to(link, {
              scale: 1.1,
              color: "#5047FF",
              duration: 0.3,
              ease: "power2.out",
            });

            // Add glow effect
            gsap.to(link, {
              textShadow: "0 0 20px rgba(80, 71, 255, 0.8)",
              duration: 0.3,
            });

            // Animate underline
            const underline = link.querySelector(".nav-underline");
            if (underline) {
              gsap.to(underline, {
                width: "100%",
                duration: 0.3,
                ease: "power2.out",
              });
            }
          });

          link.addEventListener("mouseleave", () => {
            setActiveLink(null);

            gsap.to(link, {
              scale: 1,
              color: "#ffffff",
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(link, {
              textShadow: "0 0 0px rgba(80, 71, 255, 0)",
              duration: 0.3,
            });

            // Reset underline
            const underline = link.querySelector(".nav-underline");
            if (underline) {
              gsap.to(underline, {
                width: "0%",
                duration: 0.3,
                ease: "power2.out",
              });
            }
          });
        });
      }

      // CTA button animations
      const ctaButton = headerRef.current?.querySelector(".cta-button");
      if (ctaButton) {
        gsap.fromTo(
          ctaButton,
          { opacity: 0, scale: 0.8, x: 50 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.8,
            delay: 1,
            ease: "back.out(1.7)",
          }
        );
      }

      // Floating particles in header
      const particles = headerRef.current?.querySelectorAll(".header-particle");
      particles?.forEach((particle, index) => {
        gsap.to(particle, {
          y: -20,
          x: Math.random() * 100 - 50,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          delay: index * 0.5,
          ease: "power1.out",
        });
      });
    }, headerRef);

    return () => ctx.revert();
  }, [isScrolled]);

  const handleHeaderMouseEnter = () => {
    setIsHovering(true);

    // Animate particles on hover
    const particles = headerRef.current?.querySelectorAll(".header-particle");
    particles?.forEach((particle) => {
      gsap.to(particle, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  const handleHeaderMouseLeave = () => {
    setIsHovering(false);

    // Reset particles
    const particles = headerRef.current?.querySelectorAll(".header-particle");
    particles?.forEach((particle) => {
      gsap.to(particle, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-2xl shadow-[#5047FF]/20" : ""
      }`}
      onMouseEnter={handleHeaderMouseEnter}
      onMouseLeave={handleHeaderMouseLeave}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/95 to-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="header-particle absolute w-1 h-1 bg-[#5047FF]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex gap-16 items-center">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-1 group">
            <div ref={logoRef} className="flex items-center space-x-1 relative">
              <Image
                src="/letters/t.png"
                alt="T"
                width={28}
                height={28}
                className="cursor-pointer transition-all duration-300"
              />
              <Image
                src="/letters/r.png"
                alt="R"
                width={28}
                height={28}
                className="cursor-pointer transition-all duration-300"
              />
              <Image
                src="/letters/i.png"
                alt="I"
                width={28}
                height={28}
                className="cursor-pointer transition-all duration-300"
              />
              <Image
                src="/letters/g.png"
                alt="G"
                width={28}
                height={28}
                className="cursor-pointer transition-all duration-300"
              />
              <Image
                src="/letters/g.png"
                alt="G"
                width={28}
                height={28}
                className="cursor-pointer transition-all duration-300"
              />
              <Image
                src="/letters/e.png"
                alt="E"
                width={28}
                height={28}
                className="cursor-pointer transition-all duration-300"
              />
              <Image
                src="/letters/r.png"
                alt="R"
                width={28}
                height={28}
                className="cursor-pointer transition-all duration-300"
              />
              <Image
                src="/letters/x.png"
                alt="X"
                width={28}
                height={28}
                className="cursor-pointer transition-all duration-300"
              />

              {/* Logo glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#5047FF]/20 to-[#F8FF7C]/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>

          {/* Enhanced Navigation */}
          <nav
            ref={navLinksRef}
            className="hidden lg:flex items-center gap-8 text-lg text-white"
          >
            {[
              { href: "#", text: "Dev Hub", icon: "⚡" },
              { href: "#", text: "Leaderboard", icon: "🏆" },
              { href: "#", text: "Blog", icon: "📝" },
              { href: "#", text: "Join as Keeper", icon: "🛡️" },
              { href: "#", text: "Contact Us", icon: "📞" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="relative group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ease-out hover:bg-white/5"
              >
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {link.icon}
                </span>
                <span className="relative">
                  {link.text}
                  <div className="nav-underline absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] w-0 transition-all duration-300"></div>
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Enhanced CTA Button */}
        <div className="cta-button relative group">
          <AnimatedButton
            href="#"
            variant="outline"
            size="md"
            className="relative z-10 hover:scale-105 transition-transform duration-300"
          >
            Start Building
          </AnimatedButton>
          <div className="absolute inset-0 bg-gradient-to-r from-[#5047FF]/20 to-[#F8FF7C]/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden flex flex-col gap-1 p-2 rounded-lg hover:bg-white/5 transition-all duration-300 group">
          <div className="w-6 h-0.5 bg-white transition-all duration-300 group-hover:bg-[#5047FF]"></div>
          <div className="w-6 h-0.5 bg-white transition-all duration-300 group-hover:bg-[#5047FF]"></div>
          <div className="w-6 h-0.5 bg-white transition-all duration-300 group-hover:bg-[#5047FF]"></div>
        </button>
      </div>

      {/* Scroll progress indicator */}
      <div
        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#5047FF] to-[#F8FF7C] transform scale-x-0 origin-left transition-transform duration-300"
        style={{ transform: `scaleX(${isScrolled ? 1 : 0})` }}
      ></div>
    </header>
  );
}
