"use client";
import React, { useState, useEffect } from "react";
import { onLoadingComplete } from "./LoadingAnimation";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    onLoadingComplete(() => {
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setIsVisible(true);
      }, 500);
    });
  }, []);

  return (
    <div
      className={`transition-all duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
