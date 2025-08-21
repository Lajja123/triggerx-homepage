"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import github from "@/assets/footer svgs/github.svg";
import githubdark from "@/assets/footer svgs/githubdark.svg";
import twitter from "@/assets/footer svgs/twitter.svg";
import twitterdark from "@/assets/footer svgs/twitterdark.svg";
import telegram from "@/assets/footer svgs/telegram.svg";
import telegramdark from "@/assets/footer svgs/telegramdark.svg";
import gitbook from "@/assets/footer svgs/gitbook.svg";
import gitbookdark from "@/assets/footer svgs/gitbookdark.svg";
import mirror from "@/assets/footer svgs/mirror.svg";
import mirrordark from "@/assets/footer svgs/mirrordark.svg";
import medium from "@/assets/footer svgs/medium.svg";
import mediumdark from "@/assets/footer svgs/mediumdark.svg";
import youtube from "@/assets/footer svgs/youtube.svg";
import youtubedark from "@/assets/footer svgs/youtubedark.svg";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const footerSocialLinks = [
  {
    id: "github",
    title: "Github",
    href: "https://github.com/trigg3rX",
    iconLight: github,
    iconDark: githubdark,
    applyBorderEffect: true,
    alt: "TriggerX on GitHub",
  },
  {
    id: "twitter",
    title: "Twitter",
    href: "https://x.com/TriggerXnetwork",
    iconLight: twitter,
    iconDark: twitterdark,
    applyBorderEffect: true,
    alt: "TriggerX on Twitter",
  },
  {
    id: "telegram",
    title: "Telegram",
    href: "https://t.me/triggerxnetwork",
    iconLight: telegram,
    iconDark: telegramdark,
    applyBorderEffect: true,
    alt: "TriggerX on Telegram",
  },
  {
    id: "gitbook",
    title: "Gitbook",
    href: "https://triggerx.gitbook.io/triggerx-docs",
    iconLight: gitbook,
    iconDark: gitbookdark,
    applyBorderEffect: true,
    alt: "TriggerX on GitBook",
  },
  {
    id: "mirror",
    title: "Mirror",
    href: "https://mirror.xyz/0x0255F7A175f73a05765719c165445F63155aF8E9",
    iconLight: mirror,
    iconDark: mirrordark,
    applyBorderEffect: true,
    alt: "TriggerX on Mirror",
  },
  {
    id: "medium",
    title: "Medium",
    href: "https://medium.com/@triggerx",
    iconLight: medium,
    iconDark: mediumdark,
    applyBorderEffect: true,
    alt: "TriggerX on Medium",
  },
  {
    id: "youtube",
    title: "Youtube",
    href: "https://www.youtube.com/@triggerxnetwork",
    iconLight: youtube,
    iconDark: youtubedark,
    applyBorderEffect: true,
    alt: "TriggerX on YouTube",
  },
];

const footerNavLinksTop = [
  {
    id: "status",
    label: "Status",
    href: "https://status.triggerx.network/",
    isLink: true,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "hover:text-gray-400 transition-colors",
  },
  {
    id: "build",
    label: "Build",
    href: "/",
    isLink: true,
    className: "hover:text-gray-400 transition-colors",
  },
  {
    id: "docs",
    label: "Docs",
    href: "https://triggerx.gitbook.io/triggerx-docs",
    isLink: true,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "hover:text-gray-400 transition-colors",
  },
  {
    id: "devhub",
    label: "Dev Hub",
    href: "/devhub",
    isLink: true,
    className: "hover:text-gray-400 transition-colors",
  },
];

const footerNavLinksBottom = [
  {
    id: "joinAsKeeper",
    label: "Join As Keeper",
    href: "https://triggerx.gitbook.io/triggerx-docs/getting-started-as-keepers",
    isLink: true,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "hover:text-gray-400 transition-colors",
  },
  {
    id: "termsOfUse",
    label: "Term of Use",
    isLink: false,
    title: "Available Soon",
    className: "hover:text-gray-400 transition-colors cursor-default",
  },
  {
    id: "privacyPolicy",
    label: "Privacy Policy",
    isLink: false,
    title: "Available Soon",
    className: "hover:text-gray-400 transition-colors cursor-default",
  },
];

// Letter configuration for TRIGGERX
const triggerxLetters = [
  { letter: "T", src: "/letters/t.png" },
  { letter: "R", src: "/letters/r.png" },
  { letter: "I", src: "/letters/i.png" },
  { letter: "G", src: "/letters/g.png" },
  { letter: "G", src: "/letters/g.png" },
  { letter: "E", src: "/letters/e.png" },
  { letter: "R", src: "/letters/r.png" },
  { letter: "X", src: "/letters/x.png" },
];

function Footer() {
  const currentYear = new Date().getFullYear();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background gradient
      const animatedBg = footerRef.current?.querySelector(".animated-bg");
      if (animatedBg) {
        gsap.to(animatedBg, {
          background:
            "linear-gradient(45deg, #0a0a0a, #141414, #1a1a1a, #0a0a0a)",
          duration: 10,
          repeat: -1,
          ease: "none",
        });
      }

      // Floating background elements
      const floatingElements =
        footerRef.current?.querySelectorAll(".floating-element");
      floatingElements?.forEach((el, index) => {
        gsap.to(el, {
          y: -20 + index * 15,
          x: 15 - index * 8,
          rotation: 3 - index * 1.5,
          duration: 4 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Social links animation
      const socialLinks =
        socialLinksRef.current?.querySelectorAll(".social-link");
      socialLinks?.forEach((link, index) => {
        gsap.fromTo(
          link,
          { opacity: 0, y: 30, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: link,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Letters animation
      const letters = lettersRef.current?.querySelectorAll(".letter");
      letters?.forEach((letter, index) => {
        // Initial animation
        gsap.fromTo(
          letter,
          { opacity: 0, y: 50, scale: 0.5, rotation: -180 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 1,
            delay: index * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: letter,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Continuous floating animation
        gsap.to(letter, {
          y: -10 + Math.sin(index) * 5,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1,
        });

        // Hover effect
        letter.addEventListener("mouseenter", () => {
          gsap.to(letter, {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: "back.out(1.7)",
          });
        });

        letter.addEventListener("mouseleave", () => {
          gsap.to(letter, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Navigation links animation
      const navLinks = navLinksRef.current?.querySelectorAll(".nav-link");
      navLinks?.forEach((link, index) => {
        gsap.fromTo(
          link,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: link,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Particle system
      const particles = footerRef.current?.querySelectorAll(".particle");
      particles?.forEach((particle, index) => {
        gsap.to(particle, {
          y: -100,
          x: Math.random() * 200 - 100,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          delay: index * 0.2,
          ease: "power1.out",
        });
      });

      // Mouse follower animation
      const mouseFollower = footerRef.current?.querySelector(".mouse-follower");
      if (mouseFollower) {
        gsap.set(mouseFollower, { opacity: 0 });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });

    const mouseFollower = footerRef.current?.querySelector(".mouse-follower");
    if (mouseFollower) {
      gsap.to(mouseFollower, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleSocialHover = (id: string) => {
    setHoveredIcon(id);
    const link = footerRef.current?.querySelector(`[data-social="${id}"]`);
    if (link) {
      gsap.to(link, {
        scale: 1.2,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleSocialLeave = (id: string) => {
    setHoveredIcon(null);
    const link = footerRef.current?.querySelector(`[data-social="${id}"]`);
    if (link) {
      gsap.to(link, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-10 flex flex-col items-center justify-center gap-[5px] md:gap-[40px] lg:gap-[80px] 2xl:gap-[120px] mt-[80px] lg:mt-0 min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background */}
      <div className="animated-bg absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#1a1a1a]"></div>

      {/* Floating background elements */}
      <div className="floating-element absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-[#82FBD0]/10 to-transparent rounded-full opacity-30"></div>
      <div className="floating-element absolute top-40 right-20 w-20 h-20 bg-gradient-to-br from-[#5047FF]/10 to-transparent rounded-full opacity-40"></div>
      <div className="floating-element absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-[#F8FF7C]/10 to-transparent rounded-full opacity-30"></div>
      <div className="floating-element absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-br from-[#82FBD0]/10 to-transparent rounded-full opacity-50"></div>

      {/* Particle system */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
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
      <div className="mouse-follower fixed w-8 h-8 bg-gradient-to-r from-[#82FBD0]/20 to-[#5047FF]/20 rounded-full pointer-events-none z-50 blur-sm"></div>

      {/* Main Content Area */}
      <div className="z-40 flex mt-10 md:mt-20 flex-col-reverse sm:flex-row items-start sm:items-end justify-between gap-10 w-[88%] sm:w-[95%] md:w-[85%] xl:w-[70%] mx-auto">
        {/* Left Section: Social Links & Copyright */}
        <div
          ref={socialLinksRef}
          className="flex flex-col gap-4 w-full sm:w-auto mx-auto md:mx-0"
        >
          <div className="flex space-x-2 xs:space-x-3 lg:space-x-4 items-center mr-auto">
            {footerSocialLinks.map((link) => (
              <div
                key={link.id}
                data-social={link.id}
                className="social-link group relative"
                title={link.title}
              >
                <a
                  href={link.href}
                  className={`flex items-center justify-center w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 overflow-hidden rounded-full transition-all duration-300 ${
                    link.applyBorderEffect
                      ? "border border-white/30 hover:border-[#82FBD0] hover:bg-[#82FBD0]/10"
                      : ""
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.alt}
                  onMouseEnter={() => handleSocialHover(link.id)}
                  onMouseLeave={() => handleSocialLeave(link.id)}
                >
                  <Image
                    src={
                      hoveredIcon === link.id ? link.iconDark : link.iconLight
                    }
                    alt={link.alt}
                    width={24}
                    height={24}
                    className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 object-contain transition-all duration-300 group-hover:scale-110"
                  />

                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: "0 0 15px rgba(130, 251, 208, 0.4)" }}
                  ></div>
                </a>
              </div>
            ))}
          </div>
          <p className="text-start text-[10px] xs:text-[12px] lg:text-[13px] 2xl:text-[15px] text-gray-400 whitespace-nowrap hover:text-[#82FBD0] transition-colors duration-300">
            © {currentYear} TriggerX. All rights reserved.
          </p>
        </div>

        {/* Right Section: Navigation Links */}
        <div
          ref={navLinksRef}
          className="text-white w-full xs:w-[88%] sm:w-auto mx-auto md:mx-0 flex flex-col justify-center gap-4 md:gap-6 items-start md:items-end"
        >
          <div className="w-full md:w-auto flex justify-between sm:justify-end gap-x-6 gap-y-2 md:gap-x-7 lg:gap-x-12 text-[10px] xs:text-[12px] lg:text-[14px] 2xl:text-[15px] text-gray-300 whitespace-nowrap tracking-wide flex-wrap">
            {footerNavLinksTop.map((item) => {
              if (item.isLink) {
                if (item.href && item.href.startsWith("http")) {
                  // External link
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`nav-link ${item.className} hover:text-[#82FBD0] transition-all duration-300 hover:scale-105`}
                      target={item.target || "_blank"}
                      rel={item.rel || "noopener noreferrer"}
                    >
                      {item.label}
                    </a>
                  );
                } else {
                  // Internal link
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`nav-link ${item.className} hover:text-[#82FBD0] transition-all duration-300 hover:scale-105`}
                    >
                      {item.label}
                    </a>
                  );
                }
              } else {
                // Not a link, just a span
                return (
                  <span key={item.id} className={`nav-link ${item.className}`}>
                    {item.label}
                  </span>
                );
              }
            })}
          </div>
          <div className="w-full md:w-auto flex justify-between sm:justify-end gap-x-3 gap-y-2 md:gap-x-5 lg:gap-x-8 text-[10px] xs:text-[12px] lg:text-[14px] 2xl:text-[15px] text-gray-300 whitespace-nowrap tracking-wide flex-wrap">
            {footerNavLinksBottom.map((item) => {
              if (item.isLink) {
                if (item.href && item.href.startsWith("http")) {
                  // External link
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`nav-link ${item.className} hover:text-[#82FBD0] transition-all duration-300 hover:scale-105`}
                      target={item.target || "_blank"}
                      rel={item.rel || "noopener noreferrer"}
                    >
                      {item.label}
                    </a>
                  );
                } else {
                  // Internal link
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`nav-link ${item.className} hover:text-[#82FBD0] transition-all duration-300 hover:scale-105`}
                    >
                      {item.label}
                    </a>
                  );
                }
              } else {
                // Not a link, just a span
                return (
                  <span key={item.id} className={`nav-link ${item.className}`}>
                    {item.label}
                  </span>
                );
              }
            })}
          </div>
        </div>
      </div>

      {/* Animated Letters Banner */}
      <div
        ref={lettersRef}
        className="z-20 w-full mx-auto h-max pt-5 pb-3 mt-0 sm:mt-8 md:mt-12 group"
      >
        <div className="flex items-center justify-between w-full px-4 md:px-8 lg:px-12 xl:px-16">
          {triggerxLetters.map((letterData, index) => (
            <div
              key={index}
              className="letter relative cursor-pointer group flex-1 flex justify-center"
              style={{
                filter: "drop-shadow(0 0 10px rgba(130, 251, 208, 0.3))",
              }}
            >
              <Image
                src={letterData.src}
                alt={letterData.letter}
                width={100}
                height={100}
                className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-50 xl:h-50 object-contain transition-all duration-300 group-hover:drop-shadow(0 0 20px rgba(130, 251, 208, 0.6))"
              />

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(130, 251, 208, 0.8))",
                  transform: "scale(1.1)",
                }}
              ></div>
            </div>
          ))}
        </div>

        <p className="text-[10px] xs:text-[12px] lg:text-[14px] 2xl:text-[15px] mt-4 mx-auto flex items-center justify-center text-gray-400 hover:text-[#82FBD0] transition-colors duration-300">
          Build with ❤️ by{" "}
          <a
            href="https://lampros.tech/?utm_source=triggerx&utm_medium=footer"
            target="_blank"
            className="hover:underline ml-1.5 sm:ml-2 hover:text-[#F8FF7C] transition-colors duration-300"
          >
            Lampros Tech
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
