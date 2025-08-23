"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Update mouse follower position with GSAP for smooth animation
      const mouseFollower = document.querySelector(
        ".mouse-follower"
      ) as HTMLElement;
      if (mouseFollower) {
        gsap.to(mouseFollower, {
          x: e.clientX - 20,
          y: e.clientY - 20,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="mouse-follower fixed w-10 h-10 rounded-full pointer-events-none z-40 transition-transform duration-100 ease-out flex items-center justify-center">
      <Image
        src="/letters/x.png"
        alt="TriggerX"
        width={20}
        height={20}
        className="w-5 h-5 opacity-80"
      />
    </div>
  );
}
