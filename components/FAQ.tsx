'use client';

import { FAQS } from '@/constants/faq';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h2>
      <div className="space-y-4 max-w-4xl mx-auto">
        {FAQS.map((faq, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden w-full">
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full text-left px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <span className={`transform transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="px-6 overflow-hidden bg-white text-gray-700"
                >
                  <p className="py-4">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};
