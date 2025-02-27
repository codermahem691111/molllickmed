"use client"
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 },
  };

  return (
    <nav className="bg-gray-200 text-black shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <motion.span 
                className="text-2xl font-bold text-black cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Molllickmed
              </motion.span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/blogs">
              <motion.span 
                className="hover:text-blue-600 cursor-pointer transition duration-300 font-[500]"
                whileHover={{ y: -2 }}
              >
                All Blogs
              </motion.span>
            </Link>
            <Link href="/contacts">
              <motion.span 
                className="hover:text-blue-600 cursor-pointer transition duration-300 font-[500]"
                whileHover={{ y: -2 }}
              >
                Contacts
              </motion.span>
            </Link>
            <Link href="/about">
              <motion.span 
                className="hover:text-blue-600 cursor-pointer transition duration-300 font-[500]"
                whileHover={{ y: -2 }}
              >
                About Writer
              </motion.span>
            </Link>
            <div className="flex items-center space-x-2 ml-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-md font-[500]"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-sm rounded-md font-[500]"
              >
                Sign Up
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-gray-100"
          >
            <div className="pt-2 pb-3 text-center">
              <motion.div variants={itemVariants} className="py-2">
                <Link href="/blogs">
                  <span className="inline-block px-6 py-2 rounded-md hover:bg-gray-300 cursor-pointer font-[500]">
                    All Blogs
                  </span>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} className="py-2">
                <Link href="/contacts">
                  <span className="inline-block px-6 py-2 rounded-md hover:bg-gray-300 cursor-pointer font-[500]">
                    Contacts
                  </span>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} className="py-2">
                <Link href="/about">
                  <span className="inline-block px-6 py-2 rounded-md hover:bg-gray-300 cursor-pointer font-[500]">
                    About Writer
                  </span>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-4 flex justify-center space-x-4 py-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs rounded-md w-20 font-[500]">
                  Login
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-xs rounded-md w-20 font-[500]">
                  Sign Up
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;