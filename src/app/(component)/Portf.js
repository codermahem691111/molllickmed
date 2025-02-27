"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dip from './assets/dip.jpg';

const Portf = () => {
  const safeText = "Meet Our Writer";
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const headingRef = useRef(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Generate random text of specified length
  const generateRandomText = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  // Set up Intersection Observer to detect when heading is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    );
    
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
    
    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  // Run scramble effect only when heading becomes visible
  useEffect(() => {
    // Only start animation if element is visible and hasn't animated yet
    if (isVisible && !hasAnimated) {
      // Initialize with random text of same length as final text
      setDisplayText(generateRandomText(safeText.length));
      startTimeRef.current = Date.now();
      
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Start scrambling effect
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsed / 800, 1);
        
        let result = '';
        for (let i = 0; i < safeText.length; i++) {
          // If character should be revealed (based on progress)
          if (i < Math.floor(progress * safeText.length)) {
            result += safeText[i];
          } else {
            // Random character from chars
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        setDisplayText(result);
        
        // End scrambling when complete
        if (progress >= 1) {
          clearInterval(intervalRef.current);
          setDisplayText(safeText);
          setHasAnimated(true);
        }
      }, 20);
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, hasAnimated, safeText]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 
        ref={headingRef}
        className="text-3xl font-bold text-center mb-12 text-cyan-400"
      >
        {displayText || (isVisible ? generateRandomText(safeText.length) : safeText)}
      </h1>
      <div className="relative flex flex-col items-center">
        {/* Animated border container */}
        <div className="border-animation">
          {/* Doctor Image */}
          <div className="relative w-72 h-72 rounded-full overflow-hidden border-2 border-white z-10">
            <Image
              src={dip}
              alt="Dr. Dibbodip Mollick"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>
        
        {/* Doctor Information */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2 mt-8">Dr. Dibbodip Mollick</h1>
        <h2 className="text-2xl text-blue-600 font-medium">Surgery Specialist</h2>
      </div>

      {/* CSS for the advanced animation */}
      <style jsx>{`
        .border-animation {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .border-animation::before,
        .border-animation::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 4px solid transparent;
        }
        
        .border-animation::before {
          border-top-color: #3B82F6;
          border-right-color: #60A5FA;
          animation: borderRotate1 2s linear infinite;
        }
        
        .border-animation::after {
          border-bottom-color: #3B82F6;
          border-left-color: #60A5FA;
          animation: borderRotate2 2s linear infinite;
        }
        
        @keyframes borderRotate1 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes borderRotate2 {
          0% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(540deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Portf;