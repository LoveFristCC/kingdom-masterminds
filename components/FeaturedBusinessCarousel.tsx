"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BusinessCard from "./BusinessCard";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturedBusinessCarousel({
  businesses,
}: {
  businesses: any[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = businesses.length;

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Arrows */}
      <div className="relative w-full flex items-center justify-center">
        <button
          onClick={goPrev}
          className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Animated card - increased width */}
        <div className="w-full max-w-5xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <BusinessCard business={businesses[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={goNext}
          className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-6 flex space-x-2">
        {businesses.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-3 w-3 rounded-full ${
              idx === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
