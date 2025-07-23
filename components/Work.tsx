'use client';

import { motion } from 'framer-motion';
import { FaUpload, FaTools, FaRobot, FaDownload } from 'react-icons/fa';
import { steps } from '@/constants/steps';


export default function HowItWorksSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-20 py-16 bg-gray-50 cursor-pointer" id="how-it-works">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Follow these simple steps to enhance, tailor, or score your resume effortlessly.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center hover:shadow-md transition"
          >
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 ${step.color}`}
            >
              {<step.icon className="text-white text-2xl"/>}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
