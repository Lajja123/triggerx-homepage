import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Boxdata content
const Boxdata = [
  {
    imageSrc: "/videos/superchain.webm",
    title: "Automation Across the L2s",
    mediaType: "video",
    description:
      "Automate tasks effortlessly across the rapidly growing L2s ecosystem, from core protocols to the newest innovations within the network.",
  },
  {
    imageSrc: "/videos/own.webm",
    title: "Own your Automation",
    mediaType: "video",
    description:
      "Trigger tasks on your terms - schedule them, set conditions, or react to events in real-time.",
  },
  {
    imageSrc: "/videos/Ironclad.webm",
    title: "Ironclad Security",
    mediaType: "video",
    description:
      "Powered by EigenLayer's cutting-edge AVS technology, to provide unparalleled security and tamper-proof reliability.",
  },
  {
    imageSrc: "/videos/keeper.webm",
    title: "Decentralized Keeper Network",
    mediaType: "video",
    description:
      "Robust keeper network operates independently, ensuring resilience and censorship resistance for your mission-critical tasks.",
  },
  {
    imageSrc: "/videos/grow.webm",
    title: "Built to Grow With You",
    mediaType: "video",
    description:
      "Scale your automation effortlessly. Expand to new blockchains instantly with minimal configuration.",
  },
  {
    imageSrc: "/videos/aggregate.webm",
    title: "Aggregate with BLS",
    mediaType: "video",
    description:
      "Advanced BLS signature aggregation streamlines task execution, to maximize efficiency and minimize costs.",
  },
  {
    imageSrc: "/videos/visibility.webm",
    title: "Total Control, Total Visibility",
    mediaType: "video",
    description:
      "Intuitive dashboards that provide complete control and real-time visibility into your automation tasks, keeper performance, and overall progress.",
  },
];

// Enhanced Icon Components with better hover effects
const AutomationIcon = () => (
  <div className="relative w-12 h-12 group/icon">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg transform rotate-12 transition-all duration-500 group-hover/icon:rotate-0 group-hover/icon:scale-110"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-700 rounded-lg transform -rotate-6 transition-all duration-500 group-hover/icon:rotate-0 group-hover/icon:scale-110"></div>
    <div className="absolute inset-0 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-500 group-hover/icon:bg-white/20">
      <svg
        className="w-6 h-6 text-white transition-all duration-500 group-hover/icon:scale-110"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    </div>
  </div>
);

const SecurityIcon = () => (
  <div className="relative w-12 h-12 group/icon">
    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg transform rotate-12 transition-all duration-500 group-hover/icon:rotate-0 group-hover/icon:scale-110"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg transform -rotate-6 transition-all duration-500 group-hover/icon:rotate-0 group-hover/icon:scale-110"></div>
    <div className="absolute inset-0 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-500 group-hover/icon:bg-white/20">
      <svg
        className="w-6 h-6 text-white transition-all duration-500 group-hover/icon:scale-110"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    </div>
  </div>
);

const ScaleIcon = () => (
  <div className="relative w-12 h-12 group/icon">
    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg transform rotate-12 transition-all duration-500 group-hover/icon:rotate-0 group-hover/icon:scale-110"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-700 rounded-lg transform -rotate-6 transition-all duration-500 group-hover/icon:rotate-0 group-hover/icon:scale-110"></div>
    <div className="absolute inset-0 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-500 group-hover/icon:bg-white/20">
      <svg
        className="w-6 h-6 text-white transition-all duration-500 group-hover/icon:scale-110"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
        />
      </svg>
    </div>
  </div>
);

const NetworkIcon = () => (
  <div className="relative w-12 h-12 group/icon">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg transform rotate-12 transition-all duration-500 group-hover/icon:rotate-0 group-hover/icon:scale-110"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-700 rounded-lg transform -rotate-6 transition-all duration-500 group-hover/icon:rotate-0 group-hover/icon:scale-110"></div>
    <div className="absolute inset-0 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-500 group-hover/icon:bg-white/20">
      <svg
        className="w-6 h-6 text-white transition-all duration-500 group-hover/icon:scale-110"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </div>
  </div>
);

// Animated Gradient Line Component
const AnimatedGradientLine = ({
  startX,
  startY,
  endX,
  endY,
  delay = 0,
  duration = 2,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay?: number;
  duration?: number;
}) => {
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;

    const path = lineRef.current;
    const length = path.getTotalLength();

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: duration,
      delay: delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }, [delay, duration]);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      viewBox="0 0 1000 700"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id={`gradient-${startX}-${startY}-${endX}-${endY}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8">
            <animate
              attributeName="stop-color"
              values="#3B82F6; #8B5CF6; #EC4899; #3B82F6"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8">
            <animate
              attributeName="stop-color"
              values="#8B5CF6; #EC4899; #3B82F6; #8B5CF6"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8">
            <animate
              attributeName="stop-color"
              values="#EC4899; #3B82F6; #8B5CF6; #EC4899"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <path
        ref={lineRef}
        d={`M ${startX} ${startY} L ${endX} ${endY}`}
        stroke={`url(#gradient-${startX}-${startY}-${endX}-${endY})`}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        className="drop-shadow-lg"
      />
    </svg>
  );
};

// Abstract Network Graphics Component
const NetworkGraphic = ({ type }: { type: string }) => {
  switch (type) {
    case "central":
      return (
        <div className="flex items-center justify-center h-16">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-full animate-pulse"></div>
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-gray-600 rounded-full"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-600 rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gray-600 rounded-full"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      );
    case "interoperability":
      return (
        <div className="flex items-center justify-center h-16">
          <div className="relative">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute -top-2 -left-2 w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="absolute -top-2 -right-2 w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      );
    case "compatibility":
      return (
        <div className="flex items-center justify-center h-16 gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-green-400 rounded-sm animate-pulse"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 transform rotate-45 animate-pulse"></div>
        </div>
      );
    case "security":
      return (
        <div className="flex items-center justify-center h-16">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 rounded-sm animate-pulse"></div>
        </div>
      );
    case "protocol":
      return (
        <div className="flex items-center justify-center h-16 gap-1">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
        </div>
      );
    default:
      return null;
  }
};

export default function Section2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const whySectionRef = useRef<HTMLDivElement>(null);
  const whyHeaderRef = useRef<HTMLDivElement>(null);
  const whyCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate main section header
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate first section cards with stagger
    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate "Why TriggerX" section header
    if (whyHeaderRef.current) {
      gsap.fromTo(
        whyHeaderRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: whyHeaderRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animate why cards with different pattern
    const whyCards = whyCardsRef.current?.children;
    if (whyCards) {
      gsap.fromTo(
        whyCards,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: whyCardsRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Why TriggerX */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <section
        ref={whySectionRef}
        className="w-full mt-12 sm:mt-16 pb-14 relative z-10"
      >
        <div ref={whyHeaderRef} className="text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-white/60">
            Why TriggerX
          </div>
        </div>

        <div ref={whyCardsRef} className="mt-10 relative">
          {/* Network Layout Container */}
          <div className="relative w-full h-[700px] lg:h-[600px] max-w-6xl mx-auto">
            {/* Animated Gradient Lines - Full Network Connections */}

            {/* X Logo to Central Node */}
            <AnimatedGradientLine
              startX={500}
              startY={100}
              endX={500}
              endY={250}
              delay={0.1}
            />

            {/* Central Node to all surrounding nodes */}
            <AnimatedGradientLine
              startX={500}
              startY={250}
              endX={250}
              endY={250}
              delay={0.2}
            />
            <AnimatedGradientLine
              startX={500}
              startY={250}
              endX={750}
              endY={250}
              delay={0.3}
            />
            <AnimatedGradientLine
              startX={500}
              startY={250}
              endX={250}
              endY={450}
              delay={0.4}
            />
            <AnimatedGradientLine
              startX={500}
              startY={250}
              endX={750}
              endY={450}
              delay={0.5}
            />
            <AnimatedGradientLine
              startX={500}
              startY={250}
              endX={500}
              endY={550}
              delay={0.6}
            />

            {/* Top Left to Top Right */}
            <AnimatedGradientLine
              startX={250}
              startY={250}
              endX={750}
              endY={250}
              delay={0.7}
            />

            {/* Top Left to Bottom Left */}
            <AnimatedGradientLine
              startX={250}
              startY={250}
              endX={250}
              endY={450}
              delay={0.8}
            />

            {/* Top Left to Bottom Right */}
            <AnimatedGradientLine
              startX={250}
              startY={250}
              endX={750}
              endY={450}
              delay={0.9}
            />

            {/* Top Left to Bottom Center */}
            <AnimatedGradientLine
              startX={250}
              startY={250}
              endX={500}
              endY={550}
              delay={1.0}
            />

            {/* Top Right to Bottom Left */}
            <AnimatedGradientLine
              startX={750}
              startY={250}
              endX={250}
              endY={450}
              delay={1.1}
            />

            {/* Top Right to Bottom Right */}
            <AnimatedGradientLine
              startX={750}
              startY={250}
              endX={750}
              endY={450}
              delay={1.2}
            />

            {/* Top Right to Bottom Center */}
            <AnimatedGradientLine
              startX={750}
              startY={250}
              endX={500}
              endY={550}
              delay={1.3}
            />

            {/* Bottom Left to Bottom Right */}
            <AnimatedGradientLine
              startX={250}
              startY={450}
              endX={750}
              endY={450}
              delay={1.4}
            />

            {/* Bottom Left to Bottom Center */}
            <AnimatedGradientLine
              startX={250}
              startY={450}
              endX={500}
              endY={550}
              delay={1.5}
            />

            {/* Bottom Right to Bottom Center */}
            <AnimatedGradientLine
              startX={750}
              startY={450}
              endX={500}
              endY={550}
              delay={1.6}
            />

            {/* X Logo at the top */}
            <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 z-20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <img src="/letters/x.png" alt="X" className="w-8 h-8" />
              </div>
            </div>

            {/* Central Node */}
            <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 z-20">
              <div className="group p-6 rounded-xl border border-white/20 bg-white/[0.05] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-1 relative">
                <h3 className="text-white text-lg font-medium text-center mb-4">
                  Uniquely Decentralized
                </h3>
                <NetworkGraphic type="central" />
                <div className="flex items-center justify-center mt-4">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">+</span>
                  </div>
                  <span className="text-white text-sm ml-2">Details</span>
                </div>
              </div>
            </div>

            {/* Top Left Node */}
            <div className="absolute top-[15%] left-[10%] w-64 z-20">
              <div className="group p-4 rounded-xl border border-white/20 bg-white/[0.05] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-1 relative">
                <h3 className="text-white text-sm font-medium text-center mb-3">
                  Automation Across the L2s
                </h3>
                <NetworkGraphic type="interoperability" />
                <div className="flex items-center justify-center mt-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xs">+</span>
                  </div>
                  <span className="text-white text-xs ml-2">Details</span>
                </div>
              </div>
            </div>

            {/* Top Right Node */}
            <div className="absolute top-[15%] right-[10%] w-64 z-20">
              <div className="group p-4 rounded-xl border border-white/20 bg-white/[0.05] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-1 relative">
                <h3 className="text-white text-sm font-medium text-center mb-3">
                  Own your Automation
                </h3>
                <NetworkGraphic type="compatibility" />
                <div className="flex items-center justify-center mt-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xs">+</span>
                  </div>
                  <span className="text-white text-xs ml-2">Details</span>
                </div>
              </div>
            </div>

            {/* Bottom Left Node */}
            <div className="absolute bottom-[25%] left-[10%] w-64 z-20">
              <div className="group p-4 rounded-xl border border-white/20 bg-white/[0.05] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-1 relative">
                <h3 className="text-white text-sm font-medium text-center mb-3">
                  Ironclad Security
                </h3>
                <NetworkGraphic type="security" />
                <div className="flex items-center justify-center mt-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xs">+</span>
                  </div>
                  <span className="text-white text-xs ml-2">Details</span>
                </div>
              </div>
            </div>

            {/* Bottom Right Node */}
            <div className="absolute bottom-[25%] right-[10%] w-64 z-20">
              <div className="group p-4 rounded-xl border border-white/20 bg-white/[0.05] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-1 relative">
                <h3 className="text-white text-sm font-medium text-center mb-3">
                  Decentralized Keeper Network
                </h3>
                <NetworkGraphic type="protocol" />
                <div className="flex items-center justify-center mt-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xs">+</span>
                  </div>
                  <span className="text-white text-xs ml-2">Details</span>
                </div>
              </div>
            </div>

            {/* Bottom Center Node */}
            <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 w-80 z-20">
              <div className="group p-4 rounded-xl border border-white/20 bg-white/[0.05] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-1 relative">
                <h3 className="text-white text-sm font-medium text-center mb-3">
                  Total Control, Total Visibility
                </h3>
                <NetworkGraphic type="central" />
                <div className="flex items-center justify-center mt-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xs">+</span>
                  </div>
                  <span className="text-white text-xs ml-2">Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
