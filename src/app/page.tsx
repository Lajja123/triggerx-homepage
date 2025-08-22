"use client";
import LoadingAnimation from "@/components/LoadingAnimation";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import Section5 from "@/components/Section5";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Handle loading completion
    setTimeout(() => {
      setIsLoading(false);
      // Show content immediately after loading animation completes
      setShowContent(true);
    }, 6000); // Reduced from 1000ms to 200ms
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Loading Animation */}
      {isLoading && (
        <div className="fixed inset-0 z-50">
          <LoadingAnimation />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`relative z-10 transition-all duration-1000 ease-in-out ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Header />
        <Section1 />
        <Section2 />
        {/* <Section3 />
        <Section4 />
        <Section5 /> */}
        <Footer />
      </div>
    </div>
  );
}
