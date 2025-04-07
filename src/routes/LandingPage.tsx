import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function AntiMetal() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2233] to-[#111827]">
      <div className="absolute inset-0 z-0">
        <BackgroundDots />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 py-16 md:py-24">
        <motion.div
          className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Save time & <span className="block md:inline">automate writing</span> <br /> DB.sql
          </motion.h1>
          <motion.p
            className="mx-auto mt-4 max-w-md text-base text-gray-400 md:mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Writing Capital letters SQL can become boring, All you need is
            <br />
            One automated platform.
          </motion.p>
          <motion.div
            className="mx-auto mt-8 max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/app">
              <button className="inline-flex items-center rounded-md bg-[#d4ff2a] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#c2ee19] focus:outline-none focus:ring-2 focus:ring-[#d4ff2a] focus:ring-offset-2 focus:ring-offset-gray-900">
                Lets Go to Editor
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Image Placeholder with Hover Effect */}
      <motion.section
        className="relative z-10 pb-24"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8">
          <ImagePlaceholder />
        </div>
      </motion.section>

      <div className="mt-8 text-center pb-6">Built from 💗 by Mrinal</div>
    </div>
  );
}

function BackgroundDots() {
  return (
    <motion.div
      className="absolute inset-0 opacity-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 1.2 }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallDots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="#e2e8f0" />
          </pattern>
          <pattern id="mediumDots" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="1.5" fill="#e2e8f0" />
            <circle cx="15" cy="25" r="1" fill="#e2e8f0" />
            <circle cx="75" cy="85" r="1" fill="#e2e8f0" />
            <circle cx="25" cy="65" r="1" fill="#e2e8f0" />
          </pattern>
          <pattern id="largeDots" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="100" cy="100" r="2" fill="#e2e8f0" />
            <circle cx="30" cy="50" r="1.5" fill="#e2e8f0" />
            <circle cx="150" cy="170" r="1.5" fill="#e2e8f0" />
            <circle cx="50" cy="130" r="1.5" fill="#e2e8f0" />
            <circle cx="170" cy="30" r="1.5" fill="#e2e8f0" />
          </pattern>
          <pattern id="combinedPattern" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#smallDots)" />
            <rect width="200" height="200" fill="url(#mediumDots)" />
            <rect width="200" height="200" fill="url(#largeDots)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#combinedPattern)" />
      </svg>
    </motion.div>
  );
}

function ImagePlaceholder() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef(null);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg bg-gray-900 shadow-xl shadow-black/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div
        ref={imageRef}
        className="relative aspect-[16/9] w-full cursor-[url('/placeholder.svg?height=24&width=24'),_pointer] overflow-hidden"
      >
        {/* Dark overlay for the image */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-900/20 to-gray-900/80"></div>

        {/* Placeholder image */}
        <img
          src="/assets/banner.png"
          alt="Dashboard Preview"
          className="object-fit h-full w-full rounded-xl border-l-4 border-r-4 border-t-4 border-gray-400"
        />
      </div>
    </motion.div>
  );
}
