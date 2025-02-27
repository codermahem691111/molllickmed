"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import bg2 from './assets/bg2.jpg';

const Banner = () => {
  const [text, setText] = useState("");
  const fullText = "Welcome to Molllickmed";
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timeout;

    if (isWaiting) {
      // Pause before starting to delete or type again
      timeout = setTimeout(() => {
        setIsWaiting(false);
      }, 1500); // Wait time at the end of typing/deleting
    } else if (isDeleting) {
      // Deleting text
      if (text.length === 0) {
        setIsDeleting(false);
        setIndex(0);
      } else {
        timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
        }, 50); // Speed of deletion (faster than typing)
      }
    } else {
      // Typing text
      if (index === fullText.length) {
        setIsWaiting(true);
        setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      } else {
        timeout = setTimeout(() => {
          setText((prev) => prev + fullText.charAt(index));
          setIndex((prev) => prev + 1);
        }, 100); // Speed of typing
      }
    }

    return () => clearTimeout(timeout);
  }, [index, text, isDeleting, isWaiting, fullText]);

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${bg2.src})`,
        backgroundBlendMode: "overlay"
      }}
    >
      {/* Overlay gradient to make sides brighter and middle darker */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-black/70 to-white/40"></div>
      
      {/* Font import in the head of the document */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
      `}</style>
      
      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-2xl mx-auto px-8 py-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-4 min-h-16 flex justify-center items-center"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {text}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="ml-1 inline-block h-8 w-1 bg-cyan-400"
          >
          </motion.span>
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Discover insightful articles, thought-provoking ideas, and expert perspectives on a wide range of topics that matter to you.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md mr-4 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Blogs
          </motion.button>
          
          <motion.button
            className="bg-transparent text-white border-2 border-white px-6 py-3 rounded-md font-medium hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;