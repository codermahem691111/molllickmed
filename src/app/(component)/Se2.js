"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ani2 from './assets/ani5.svg';

const Se2 = () => {
  const safeText = "Our Vision";
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 md:order-2">
          <Image
            src={ani2}
            alt="Animation 2"
            layout="intrinsic"
            width={350}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 md:pr-8 text-center md:text-left md:order-1">
          <h2 
            ref={headingRef}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            {displayText || (isVisible ? generateRandomText(safeText.length) : safeText)}
          </h2>
          <p className="text-gray-600 mb-4">
            Our vision is to be a leader in healthcare, recognized for our commitment to excellence and innovation. We strive to create a healthier future for our community by providing exceptional medical care and advancing medical knowledge.
          </p>
          <p className="text-gray-600">
            We are dedicated to fostering a culture of continuous improvement and collaboration, ensuring that our patients receive the best possible care.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Se2;