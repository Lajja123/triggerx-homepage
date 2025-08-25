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

// Letter configuration for TRIGGERX
const triggerxLetters = [
  { letter: "T", src: "/letters/t.png" },
  { letter: "R", src: "/letters/r.png" },
  { letter: "I", src: "/letters/i.png" },
  { letter: "G", src: "/letters/g.png" },
  { letter: "G", src: "/letters/g.png" },
  { letter: "E", src: "/letters/e.png" },
  { letter: "R", src: "/letters/r.png" },
  { letter: "X", src: "/letters/Vector.png" },
];

// Sticky Social Icons Component
const StickySocialIcons = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation for sticky social icons
      gsap.fromTo(
        ".sticky-social-icon",
        {
          opacity: 0,
          x: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );

      // Continuous floating animation
      gsap.to(".sticky-social-icon", {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    }, stickyRef);

    return () => ctx.revert();
  }, []);

  const handleSocialHover = (id: string) => {
    setHoveredIcon(id);
    setShowTooltip(id);

    const icon = stickyRef.current?.querySelector(
      `[data-sticky-social="${id}"]`
    );
    if (icon) {
      gsap.to(icon, {
        scale: 1.3,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleSocialLeave = (id: string) => {
    setHoveredIcon(null);
    setShowTooltip(null);

    const icon = stickyRef.current?.querySelector(
      `[data-sticky-social="${id}"]`
    );
    if (icon) {
      gsap.to(icon, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={stickyRef}
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
    >
      {footerSocialLinks.map((link) => (
        <div
          key={link.id}
          data-sticky-social={link.id}
          className="sticky-social-icon group relative"
        >
          {/* Small Animated Tooltip */}
          {showTooltip === link.id && (
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2 bg-black/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap border border-white/20 shadow-lg ">
              <div className="relative">{link.title}</div>
            </div>
          )}

          <a
            href={link.href}
            className={`flex items-center justify-center w-10 h-10 overflow-hidden rounded-full transition-all duration-300 ${
              link.applyBorderEffect
                ? "border border-white/30  hover:bg-[#FFFFFF] hover:border-[#FFFFFF]"
                : ""
            }`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.alt}
            onMouseEnter={() => handleSocialHover(link.id)}
            onMouseLeave={() => handleSocialLeave(link.id)}
          >
            <Image
              src={hoveredIcon === link.id ? link.iconDark : link.iconLight}
              alt={link.alt}
              width={20}
              height={20}
              className="w-4 h-4 object-contain transition-all duration-300 group-hover:scale-110"
            />

            {/* Hover glow effect */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: "0 0 15px rgba(130, 251, 208, 0.6)" }}
            ></div>
          </a>
        </div>
      ))}
    </div>
  );
};

// Replace footerMainNavLinks with status/build/terms/privacy links
const footerMainNavLinks = [
  {
    href: "https://status.triggerx.network/",
    text: "Status",
    isExternal: true,
  },
  { href: "/", text: "Build", isExternal: false },
  {
    href: "https://triggerx.gitbook.io/triggerx-docs",
    text: "Docs",
    isExternal: true,
  },
  { href: "#", text: "Term of Use", isExternal: false },
  { href: "#", text: "Privacy Policy", isExternal: false },
];

function Footer() {
  const currentYear = new Date().getFullYear();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const mainNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    <>
      {/* Sticky Social Icons */}
      <StickySocialIcons />

      <footer
        ref={footerRef}
        className="relative z-10 flex flex-col items-center justify-center gap-[5px] md:gap-[40px] lg:gap-[80px] 2xl:gap-[120px] mt-[80px] lg:mt-0 min-h-screen overflow-hidden"
        onMouseMove={handleMouseMove}
      >
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
              >
                <Image
                  src={letterData.src}
                  alt={letterData.letter}
                  width={100}
                  height={100}
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-40 xl:h-40 object-center transition-all duration-300 group-hover:drop-shadow(0 0 20px rgba(130, 251, 208, 0.6))"
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
        </div>

        {/* Bottom Section: Status/Build/Terms/Privacy Links (Left) & Copyright (Right) */}
        <div className="z-50 w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 px-4 md:px-8 lg:px-12 xl:px-16 py-6 bg-gradient-to-r from-black/20 via-black/10 to-black/20 backdrop-blur-sm border-t border-white/10 absolute bottom-0 left-0 right-0">
          {/* Left: Status/Build/Terms/Privacy Links */}
          <div
            ref={mainNavRef}
            className="flex flex-wrap justify-start items-center gap-4 md:gap-6 lg:gap-8 z-10"
          >
            {footerMainNavLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`main-nav-link text-white text-xs md:text-sm lg:text-base font-medium hover:text-[#F7FF7C] transition-all duration-300 relative group z-10`}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
              >
                {link.text}
                {/* Animated underline with gradient */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C07AF6] to-[#FFF282] transition-all duration-300 group-hover:w-full"></div>

                {/* External link indicator */}
                {link.isExternal && (
                  <span className="ml-1 text-xs opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    ↗
                  </span>
                )}

                {/* Hover glow effect */}
                <div className="hover:text-white nav-underline absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#C07AF6] to-[#FFF282] w-0 transition-all duration-300"></div>
              </a>
            ))}
          </div>

          {/* Right: Copyright */}
          <div className="flex-shrink-0 z-10">
            <p className="text-[10px] xs:text-[12px] lg:text-[13px] 2xl:text-[15px] text-gray-400  transition-colors duration-300 whitespace-nowrap group cursor-pointer">
              Build with ❤️ by{" "}
              <a
                href="https://lampros.tech/?utm_source=triggerx&utm_medium=footer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline ml-1.5 sm:ml-2 hover:text-[#F8FF7C] transition-colors duration-300"
              >
                Lampros Tech
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
