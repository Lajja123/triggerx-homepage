import React from "react";
import AnimatedButton from "@/components/AnimatedButton";
import eigenlayer from "../assets/Eigenlayer.svg";
import Image from "next/image";

export default function Section1() {
  return (
    <div>
      {/* Sticky Left Corner Element */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="text-white text-sm font-medium flex items-center">
          <div>
            <span className="block text-2xl">Powered by</span>
          </div>
          <Image
            src={eigenlayer}
            alt="Eigenlayer"
            width={80}
            height={80}
            className="w-[20%] h-auto border p-3 rounded-full"
          ></Image>
        </div>
      </div>

      <section
        data-section="hero"
        className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 z-10"
      >
        {/* Main Headline */}
        <div data-animate="headline" className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight tracking-tight">
            <span className="block">Effortless Blockchain Automation</span>
            <span className="block">.Limitless Potential.</span>
          </h1>
        </div>

        {/* CTA Button */}
        <div data-animate="cta" className="flex gap-10">
          <AnimatedButton href="#" variant="outline" size="md">
            Start Building
          </AnimatedButton>
          <AnimatedButton
            href="#"
            variant="outline"
            size="md"
            className="px-5 "
          >
            Let&apos;s talk
          </AnimatedButton>
        </div>
      </section>
    </div>
  );
}
