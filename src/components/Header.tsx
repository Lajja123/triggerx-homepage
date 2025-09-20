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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { href: "https://app.triggerx.network/devhub", text: "Dev Hub" },
    { href: "https://app.triggerx.network/leaderboard", text: "Leaderboard" },
    // { href: "#", text: "Blog" },
    {
      href: "https://triggerx.gitbook.io/triggerx-docs/getting-started-as-keepers",
      text: "Join as Keeper",
    },
    { href: "#contact", text: "Contact Us" },
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
      // Enhanced navigation link animations
      const navLinks = navLinksRef.current?.querySelectorAll("a");
      if (navLinks) {
        navLinks.forEach((link) => {
          // Enhanced hover animations
          link.addEventListener("mouseenter", () => {
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

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? "bg-[#0a0a0a] shadow-2xl shadow-[#FFFFFF]/20" : ""
      }`}
    >
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 py-4 flex items-center justify-between ">
        <div className="flex gap-8 lg:gap-16 items-center">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center group">
            <div ref={logoRef} className="flex items-center relative">
              <Image
                src="/logo.svg"
                alt="TriggerX Logo"
                width={230}
                height={27}
                className="h-5 sm:h-7 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav ref={navLinksRef} className="hidden lg:flex items-center gap-3">
            {navLinks.map((link, index) => {
              const isContact = link.text === "Contact Us";
              return (
                <Link
                  key={index}
                  href={isContact ? "#contact" : link.href}
                  target={isContact ? undefined : "_blank"}
                  rel={isContact ? undefined : "noopener noreferrer"}
                  onClick={(e) => {
                    if (isContact) {
                      e.preventDefault();
                      const element = document.getElementById("contact");
                      if (element) {
                        const elementPosition = element.offsetTop - 50;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: "smooth",
                        });
                      }
                    }
                  }}
                  className="hover:text-white relative group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ease-out hover:bg-white/5"
                >
                  <Typography variant="body" className="relative text-white">
                    {link.text}
                    <div className="hover:text-white nav-underline absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#82FBD0] to-[#fbf197] w-0 transition-all duration-300"></div>
                  </Typography>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block cta-button relative group">
            <AnimatedButton
              href="https://app.triggerx.network/"
              size="md"
              variant="outline"
              className="relative z-10 hover:scale-105 transition-transform duration-300"
            >
              <Button color="white">Start Building</Button>
            </AnimatedButton>
          </div>

          <button
            ref={mobileMenuButtonRef}
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/5 transition-all duration-300 group relative z-[110]"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-4 flex flex-col justify-center">
              <div
                className={`absolute w-6 h-0.5 bg-[#fff282] transition-all duration-300  ${
                  isMobileMenuOpen ? "rotate-45 top-1.5" : "top-0"
                }`}
              ></div>
              <div
                className={`absolute w-6 h-0.5 bg-[#fff282] transition-all duration-300  top-1.5 ${
                  isMobileMenuOpen
                    ? "opacity-0 scale-0"
                    : "opacity-100 scale-100"
                }`}
              ></div>
              <div
                className={`absolute w-6 h-0.5 bg-[#fff282] transition-all duration-300  ${
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
        className="lg:hidden fixed left-0 right-0 border-b bg-[#0a0a0a] border-white/10 z-[90]"
        style={{
          display: "none",
          top: `${headerRef.current?.offsetHeight || 80}px`,
        }}
      >
        <nav className="px-4 sm:px-6 py-6 space-y-4">
          {navLinks.map((link, index) => {
            const isContact = link.text === "Contact Us";
            return (
              <Link
                key={index}
                href={isContact ? "#contact" : link.href}
                onClick={(e) => {
                  if (isContact) {
                    e.preventDefault();
                    const element = document.getElementById("contact");
                    if (element) {
                      const elementPosition = element.offsetTop - 50;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: "smooth",
                      });
                    }
                  }
                  handleMobileLinkClick();
                }}
                target={isContact ? undefined : "_blank"}
                rel={isContact ? undefined : "noopener noreferrer"}
                className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-300 group"
              >
                <Typography
                  variant="body"
                  className="text-white group-hover:text-[#FFF282] transition-colors duration-300"
                >
                  {link.text}
                </Typography>
              </Link>
            );
          })}

          {/* Mobile CTA Button */}
          <div className="pt-4 border-t border-white/10">
            <AnimatedButton
              href="https://app.triggerx.network/"
              size="sm"
              variant="outline"
              className="w-50 justify-center hover:scale-105 transition-transform duration-300"
            >
              <Button color="white">Start Building</Button>
            </AnimatedButton>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 z-30"
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
