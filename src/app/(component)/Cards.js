"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dr1 from './assets/dr1.jpg';
import dr2 from './assets/dr2.jpg';
import dr3 from './assets/dr3.jpg';

function Cards({ text, className = "", speed = 20, scrambleDuration = 800 }) {
  const safeText = text || "Popular Blogs";
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
        const progress = Math.min(elapsed / scrambleDuration, 1);
        
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
      }, speed);
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, hasAnimated, safeText, speed, scrambleDuration]);

  const cards = [
    {
      title: "Healthcare Innovation",
      image: dr1,
      text: "Exploring cutting-edge medical technologies and their impact on patient care. Discover how modern innovations are revolutionizing healthcare delivery and improving outcomes."
    },
    {
      title: "Wellness & Prevention",
      image: dr2,
      text: "Understanding the importance of preventive care and maintaining a healthy lifestyle. Learn about evidence-based strategies for long-term health and wellness maintenance."
    },
    {
      title: "Medical Research",
      image: dr3,
      text: "Stay updated with the latest breakthroughs in medical research and clinical trials. Explore how new discoveries are shaping the future of medicine."
    }
  ];

  return (
    <div>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 
            ref={headingRef}
            className={`font-mono m-10 text-center font-[700] text-[28px] text-cyan-400`}
          >
            {displayText || (isVisible ? generateRandomText(safeText.length) : safeText)}
          </h1>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.3 },
              },
            }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                variants={{
                  hidden: { opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 },
                  visible: { opacity: 1, y: 0, x: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.15)" }}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={card.image}
                    alt={card.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.text}</p>
                  <motion.button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Cards