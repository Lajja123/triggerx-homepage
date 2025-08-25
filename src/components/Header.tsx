"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Typography, Button } from "@/components/ui/Typography";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { href: "#", text: "Dev Hub" },
    { href: "#", text: "Leaderboard" },
    { href: "#", text: "Blog" },
    { href: "#", text: "Join as Keeper" },
    { href: "#", text: "Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when screen size changes to large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node) &&
        !mobileMenuButtonRef.current?.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Mobile menu animations
  useEffect(() => {
    if (mobileNavRef.current) {
      if (isMobileMenuOpen) {
        gsap.set(mobileNavRef.current, { display: "block" });
        gsap.fromTo(
          mobileNavRef.current,
          {
            opacity: 0,
            y: -20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          }
        );

        // Animate mobile nav links
        const mobileLinks = mobileNavRef.current.querySelectorAll("a");
        gsap.fromTo(
          mobileLinks,
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.1,
          }
        );
      } else {
        gsap.to(mobileNavRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            if (mobileNavRef.current) {
              gsap.set(mobileNavRef.current, { display: "none" });
            }
          },
        });
      }
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced logo animations
      const logoLetters = logoRef.current?.querySelectorAll("img");
      if (logoLetters) {
        // Enhanced hover animations for individual letters
        logoLetters.forEach((letter) => {
          letter.addEventListener("mouseenter", () => {
            gsap.to(letter, {
              y: -10,
              rotation: 10,
              scale: 1.3,
              duration: 0.4,
              ease: "back.out(1.3)",
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
          });
        });
      }

      // Enhanced navigation link animations
      const navLinks = navLinksRef.current?.querySelectorAll("a");
      if (navLinks) {
        navLinks.forEach((link, index) => {
          // Enhanced hover animations
          link.addEventListener("mouseenter", () => {
            setActiveLink(link.textContent);

            gsap.to(link, {
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out",
            });

            // Add glow effect to the typography component
            const typographyElement = link.querySelector(
              "[class*='text-white']"
            );
            if (typographyElement) {
              gsap.to(typographyElement, {
                color: "#FFF282",
                textShadow: "0 0 20px rgba(255, 242, 130, 0.8)",
                duration: 0.3,
              });
            }

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
              duration: 0.3,
              ease: "power2.out",
            });

            // Reset typography component
            const typographyElement = link.querySelector(
              "[class*='text-white']"
            );
            if (typographyElement) {
              gsap.to(typographyElement, {
                color: "#FFFFFF",
                textShadow: "0 0 0px rgba(255, 242, 130, 0)",
                duration: 0.3,
              });
            }

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
    }, headerRef);

    return () => ctx.revert();
  }, [isScrolled]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "  bg-gradient-to-r from-black/20 via-black/10 to-black/20 backdrop-blur-xl shadow-2xl shadow-[#FFFFFF]/20"
          : ""
      }`}
    >
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 py-4 flex items-center justify-between ">
        <div className="flex gap-8 lg:gap-16 items-center">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-1 group">
            <div
              ref={logoRef}
              className="flex items-center space-x-0.5 sm:space-x-1 relative"
            >
              {["t", "r", "i", "g", "g", "e", "r", "x"].map((letter, index) => (
                <Image
                  key={index}
                  src={`/letters/${letter}.png`}
                  alt={letter.toUpperCase()}
                  width={28}
                  height={28}
                  className="cursor-pointer transition-all duration-300 hover:scale-110 w-5 h-5 sm:w-7 sm:h-7"
                />
              ))}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav ref={navLinksRef} className="hidden lg:flex items-center gap-3">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="hover:text-white relative group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ease-out hover:bg-white/5"
              >
                <Typography variant="body" className="relative text-white">
                  {link.text}
                  <div className="hover:text-white nav-underline absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#C07AF6] to-[#FFF282] w-0 transition-all duration-300"></div>
                </Typography>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop CTA Button */}
          <div className="hidden lg:block cta-button relative group">
            <AnimatedButton
              href="#"
              size="sm"
              variant="outline"
              className="relative z-10 hover:scale-105 transition-transform duration-300"
            >
              <Button color="white">Start Building</Button>
            </AnimatedButton>
          </div>

          {/* Mobile menu button */}
          <button
            ref={mobileMenuButtonRef}
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/5 transition-all duration-300 group relative z-[110]"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-4 flex flex-col justify-center">
              <div
                className={`absolute w-6 h-0.5 bg-[#C07AF6] transition-all duration-300  ${
                  isMobileMenuOpen ? "rotate-45 top-1.5" : "top-0"
                }`}
              ></div>
              <div
                className={`absolute w-6 h-0.5 bg-[#C07AF6] transition-all duration-300  top-1.5 ${
                  isMobileMenuOpen
                    ? "opacity-0 scale-0"
                    : "opacity-100 scale-100"
                }`}
              ></div>
              <div
                className={`absolute w-6 h-0.5 bg-[#C07AF6] transition-all duration-300  ${
                  isMobileMenuOpen ? "-rotate-45 top-1.5" : "top-3"
                }`}
              ></div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        ref={mobileNavRef}
        className="lg:hidden fixed left-0 right-0 bg-black/95 border-b border-white/10 z-[90]"
        style={{
          display: "none",
          top: `${headerRef.current?.offsetHeight || 80}px`,
        }}
      >
        <nav className="px-4 sm:px-6 py-6 space-y-4">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={handleMobileLinkClick}
              className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-300 group"
            >
              <Typography
                variant="body"
                className="text-white group-hover:text-[#FFF282] transition-colors duration-300"
              >
                {link.text}
              </Typography>
            </Link>
          ))}

          {/* Mobile CTA Button */}
          <div className="pt-4 border-t border-white/10">
            <AnimatedButton
              href="#"
              size="sm"
              variant="outline"
              className="w-50 justify-center hover:scale-105 transition-transform duration-300"
              onClick={handleMobileLinkClick}
            >
              <Button color="white">Start Building</Button>
            </AnimatedButton>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Scroll progress indicator */}
      <div
        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C07AF6] to-[#FFF282] transform scale-x-0 origin-left transition-transform duration-300"
        style={{ transform: `scaleX(${isScrolled ? 1 : 0})` }}
      ></div>
    </header>
  );
}
