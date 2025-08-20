"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onLoadingComplete } from "@/components/LoadingAnimation";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationsProps {
  children: React.ReactNode;
}

const ScrollAnimations = ({ children }: ScrollAnimationsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    // Wait for loading to complete, with a fallback timeout
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        console.log("Fallback: Initializing animations after 5s timeout");
        initializeScrollAnimations();
      }
    }, 5000); // Fallback after 5 seconds

    onLoadingComplete(() => {
      if (isMounted) {
        console.log("Loading complete, initializing animations");
        clearTimeout(timeoutId);
        setTimeout(() => {
          initializeScrollAnimations();
        }, 100);
      }
    });

    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const initializeScrollAnimations = () => {
    // Hero section animations - trigger immediately after loading
    const heroSection = document.querySelector('[data-section="hero"]');
    if (heroSection) {
      // Headline animation - immediate trigger
      gsap.fromTo(
        '[data-animate="headline"]',
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2, // Small delay for smooth transition
        }
      );

      // CTA button animation - immediate trigger
      gsap.fromTo(
        '[data-animate="cta"]',
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.5, // Delayed after headline
        }
      );

      // Geometric shapes animation - immediate trigger
      gsap.fromTo(
        '[data-animate="shapes"]',
        {
          opacity: 0,
          y: 100,
          rotation: 45,
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.8, // Delayed after CTA
        }
      );

      // Side elements animation - immediate trigger
      gsap.fromTo(
        '[data-animate="side-elements"]',
        {
          opacity: 0,
          x: 50,
          scale: 0,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
          delay: 1.2, // Delayed after shapes
        }
      );

      // Parallax effect for hero section - scroll triggered
      gsap.to(heroSection, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroSection,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Content sections animations - scroll triggered
    const contentSections = document.querySelectorAll(
      '[data-section="content"]'
    );
    contentSections.forEach((section, index) => {
      // Section title animation
      gsap.fromTo(
        section.querySelector('[data-animate="title"]'),
        {
          opacity: 0,
          y: 60,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Section description animation
      gsap.fromTo(
        section.querySelector('[data-animate="description"]'),
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Staggered content animation
      const contentItems = section.querySelectorAll(
        '[data-animate="content-item"]'
      );
      if (contentItems.length > 0) {
        gsap.fromTo(
          contentItems,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.4,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Smooth scroll behavior
    gsap.to("html, body", {
      scrollBehavior: "smooth",
      duration: 0.1,
    });

    // Background parallax effect
    const backgroundElements = document.querySelectorAll(
      '[data-animate="background"]'
    );
    backgroundElements.forEach((element) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Floating animation for decorative elements
    const floatingElements = document.querySelectorAll(
      '[data-animate="float"]'
    );
    floatingElements.forEach((element) => {
      gsap.to(element, {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });
  };

  return (
    <div ref={containerRef} className="scroll-animations-container">
      {children}
    </div>
  );
};

export default ScrollAnimations;
