"use client";
import { useState, useEffect } from "react";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingAnimation from "@/components/LoadingAnimation";
import Section3 from "@/components/Section3";
import { onLoadingComplete } from "@/components/LoadingAnimation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Register callback for when loading completes
    onLoadingComplete(() => {
      console.log("Loading animation completed");
      setIsLoading(false);

      // Add a small delay before showing content for smooth transition
      setTimeout(() => {
        setShowContent(true);
      }, 300);
    });
  }, []);

  return (
    <>
      {/* Move Header outside the animated container */}

      <div className="relative min-h-screen">
        {/* Show loading animation while loading */}
        {isLoading && <LoadingAnimation />}

        {/* Show main content after loading with fade-in animation */}
        {showContent && (
          <div className="">
            <main>
              <Header />
              <Section1 />
              <Footer />
            </main>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
}
