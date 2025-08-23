"use client";
import { useState, useEffect } from "react";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingAnimation from "@/components/LoadingAnimation";
import Section3 from "@/components/Section3";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Listen for the loading animation completion
    const handleAnimationComplete = () => {
      setIsLoading(false);
      // Add a small delay before showing content for smooth transition
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    };

    // Add event listener for animation completion
    window.addEventListener(
      "loadingAnimationComplete",
      handleAnimationComplete
    );

    return () => {
      window.removeEventListener(
        "loadingAnimationComplete",
        handleAnimationComplete
      );
    };
  }, []);

  return (
    <div className={`min-h-screen relative `}>
      <div>
        <Section1 />
        <Section2 />
        {/* <Section3 /> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
