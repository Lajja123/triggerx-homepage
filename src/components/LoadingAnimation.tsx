"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

// Import letter images
const letters = [
  '/letters/t.png',
  '/letters/r.png',
  '/letters/i.png',
  '/letters/g.png',
  '/letters/g.png',
  '/letters/e.png',
  '/letters/r.png',
  '/letters/x.png'
];

const LoadingAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDivs, setShowDivs] = useState([false, false, false, false, false, false, false, false]);
  const [removeBg, setRemoveBg] = useState([false, false, false, false, false, false, false, false]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    console.log('Current step:', currentStep, 'Show divs:', showDivs, 'Remove bg:', removeBg);
    
    const timer = setTimeout(() => {
      // Show divs one by one (steps 0-7)
      if (currentStep < 8) {
        console.log('Showing div', currentStep);
        setShowDivs(prev => {
          const newShowDivs = [...prev];
          newShowDivs[currentStep] = true;
          return newShowDivs;
        });
        setCurrentStep(prev => prev + 1);
      } 
      // Start removing backgrounds (steps 8-15)
      else if (currentStep < 16) {
        const bgIndex = currentStep - 8;
        console.log('Removing background for index', bgIndex);
        setRemoveBg(prev => {
          const newRemoveBg = [...prev];
          newRemoveBg[bgIndex] = true;
          return newRemoveBg;
        });
        setCurrentStep(prev => prev + 1);
      } 
      // After all backgrounds are removed, wait 3 seconds then complete
      else if (currentStep === 16) {
        console.log('All animations complete, holding for 3 seconds');
        setTimeout(() => {
          setIsComplete(true);
        }, 3000);
        setCurrentStep(prev => prev + 1); // Prevent re-running this block
      }
    }, currentStep < 8 ? 100 : 100); // 500ms delay for showing divs, 300ms for removing backgrounds

    return () => clearTimeout(timer);
    // We're intentionally only watching currentStep to control the animation flow
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const resetAnimation = () => {
    setCurrentStep(0);
    setShowDivs([false, false, false, false, false, false, false, false]);
    setRemoveBg([false, false, false, false, false, false, false, false]);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <button 
            onClick={resetAnimation}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Replay Animation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="flex gap-4 items-end h-[230px]">
        {letters.map((letter, index) => (
          <div
            key={index}
            className={`w-max h-[230px] relative transition-all duration-1000 ease-out ${
              showDivs[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              width: showDivs[index] ? 'auto' : '0',
              height: '100%',
              transition: 'all 0.5s ease-out'
            }}
          >
            <div
              className={`h-full relative overflow-hidden rounded-lg shadow-2xl ${
                removeBg[index] ? 'bg-transparent' : 'bg-white'
              } transition-colors duration-300 flex items-center justify-center`}
            >
                <Image
                  src={letter}
                  alt={`Letter ${letter.charAt(letter.lastIndexOf('/') + 1).toUpperCase()}`}
                  width={230}
                  height={230}
                  className={`h-full w-auto transition-opacity duration-300 ${
                    removeBg[index] ? 'bg-transparent' : 'bg-white'
                  }`}
                />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingAnimation;