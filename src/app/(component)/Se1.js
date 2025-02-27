"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ani1 from './assets/ani4.svg';

const Se1 = () => {
  const safeText = "Our Mission";
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <Image
            src={ani1}
            alt="Animation 1"
            layout="intrinsic"
            width={350}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
          <h2 
            ref={headingRef}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            {displayText || (isVisible ? generateRandomText(safeText.length) : safeText)}
          </h2>
          <p className="text-gray-600 mb-4">
            We are dedicated to providing the highest quality healthcare services to our community. Our mission is to improve the health and well-being of our patients through compassionate care and innovative medical solutions.
          </p>
          <p className="text-gray-600">
            Our team of experienced professionals is committed to delivering personalized care and ensuring that each patient receives the attention and treatment they deserve.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Se1;