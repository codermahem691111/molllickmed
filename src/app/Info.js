"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";

function Info() {
  const safeText = "Our Services";
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

  const cards = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 text-blue-600">
          <circle cx="12" cy="8" r="7" strokeWidth="2"/>
          <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" strokeWidth="2"/>
        </svg>
      ),
      title: "Quality Care",
      description: "Delivering excellence in healthcare services with our dedicated team of professionals."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 text-blue-600">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeWidth="2"/>
        </svg>
      ),
      title: "Patient Focus",
      description: "Putting your health first with compassionate and personalized medical attention."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 text-blue-600">
          <path d="M12 2a9 9 0 0 1 9 9c0 3.18-1.65 5.97-4.14 7.59C15.63 19.5 14 20.5 12 20.5s-3.63-1-4.86-1.91A9.96 9.96 0 0 1 3 11a9 9 0 0 1 9-9z" strokeWidth="2"/>
          <path d="M12 16h.01M8.5 10a3.5 3.5 0 0 1 7 0c0 1.5-1.5 2.5-3.5 3.5" strokeWidth="2"/>
        </svg>
      ),
      title: "Expert Knowledge",
      description: "Bringing advanced medical expertise and innovative solutions to your healthcare needs."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 
          ref={headingRef}
          className="text-3xl font-bold text-center mb-12 text-cyan-400"
        >
          {displayText || (isVisible ? generateRandomText(safeText.length) : safeText)}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center text-center p-8 bg-gray-50 rounded-lg shadow-md 
                         hover:shadow-xl hover:bg-blue-600 hover:-translate-y-2 
                         transition-all duration-300 cursor-pointer"
            >
              {/* Logo/Icon */}
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-bold text-gray-800 mb-3 
                           group-hover:text-white transition-colors duration-300">
                {card.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-gray-600 group-hover:text-white/90 
                          transition-colors duration-300">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Info;
