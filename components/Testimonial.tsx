// components/TestimonialCarousel.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS, Testimonial } from '@/constants/testimonials';

const AUTO_PLAY_DELAY = 5000; // 5 seconds

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsCount = TESTIMONIALS.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsCount);
    }, AUTO_PLAY_DELAY);

    return () => clearTimeout(timer);
  }, [currentIndex, testimonialsCount]);

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>

      <div className="relative">
        <AnimatePresence initial={false} mode="wait">
          {TESTIMONIALS.map((t, index) =>
            index === currentIndex ? (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg rounded-xl p-8 text-center flex flex-col items-center max-w-xl mx-auto"
              >
                <img
                  src={t.photoUrl}
                  alt={`${t.name} photo`}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <p className="italic text-gray-700 mb-4">"{t.text}"</p>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
