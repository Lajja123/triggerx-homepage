"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AnimatedButton from "@/components/AnimatedButton";

export default function Header() {
  const navLinksRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP hover animations for navigation links
    const navLinks = navLinksRef.current?.querySelectorAll("a");
    if (navLinks) {
      navLinks.forEach((link) => {
        // Create a subtle scale and color animation on hover
        link.addEventListener("mouseenter", () => {
          gsap.to(link, {
            scale: 1.05,
            color: "#fbbf24", // yellow-400
            duration: 0.3,
            ease: "power2.out",
          });
        });

        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            scale: 1,
            color: "#ffffff",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }

    // GSAP animations for logo letters
    const logoLetters = logoRef.current?.querySelectorAll("img");
    if (logoLetters) {
      // Initial stagger animation for logo letters
      gsap.fromTo(
        logoLetters,
        {
          y: -20,
          opacity: 0,
          rotation: -10,
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );

      // Hover animations for individual letters
      logoLetters.forEach((letter, index) => {
        letter.addEventListener("mouseenter", () => {
          gsap.to(letter, {
            y: -8,
            rotation: 15,
            scale: 1.2,
            duration: 0.3,
            ease: "back.out(1.7)",
          });

          // Animate adjacent letters slightly
          if (index > 0) {
            gsap.to(logoLetters[index - 1], {
              y: -4,
              rotation: 8,
              scale: 1.1,
              duration: 0.3,
              ease: "back.out(1.7)",
            });
          }
          if (index < logoLetters.length - 1) {
            gsap.to(logoLetters[index + 1], {
              y: -4,
              rotation: 8,
              scale: 1.1,
              duration: 0.3,
              ease: "back.out(1.7)",
            });
          }
        });

        letter.addEventListener("mouseleave", () => {
          gsap.to(logoLetters, {
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });

      // Logo container hover effect
      const logoContainer = logoRef.current?.parentElement;
      if (logoContainer) {
        logoContainer.addEventListener("mouseenter", () => {
          gsap.to(logoLetters, {
            scale: 1.05,
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
  }, []);

  return (
    <header className="w-full border-b border-gray-500 mx-auto px-6 py-6 flex items-center justify-between ">
      <div className="flex gap-20">
        <Link href="/" className="flex items-center space-x-2">
          <div ref={logoRef} className="flex items-center space-x-1">
            <Image
              src="/letters/t.png"
              alt="T"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Image
              src="/letters/r.png"
              alt="R"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Image
              src="/letters/i.png"
              alt="I"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Image
              src="/letters/g.png"
              alt="G"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Image
              src="/letters/g.png"
              alt="G"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Image
              src="/letters/e.png"
              alt="E"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Image
              src="/letters/r.png"
              alt="R"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Image
              src="/letters/x.png"
              alt="X"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
        </Link>
        <nav
          ref={navLinksRef}
          className="hidden md:flex items-center gap-12 text-lg text-white"
        >
          <Link href="#" className="transition-all duration-300 ease-out">
            Dev Hub
          </Link>
          <Link href="#" className="transition-all duration-300 ease-out">
            Leaderboard
          </Link>
          <Link href="#" className="transition-all duration-300 ease-out">
            Blog
          </Link>
          <Link href="#" className="transition-all duration-300 ease-out">
            Join as Keeper
          </Link>
          <Link href="#" className="transition-all duration-300 ease-out">
            Contact Us
          </Link>
        </nav>
      </div>{" "}
      <div className="">
        <AnimatedButton href="#" variant="outline" size="md">
          Start Building
        </AnimatedButton>
      </div>
    </header>
  );
}
