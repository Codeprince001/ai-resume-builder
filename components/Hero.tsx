'use client';

import { useRouter } from 'next/navigation';
import HeroImage from "@/public/recruitment-illustration.png";
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12">
      {/* Left Content */}
      <motion.div
        className="flex-1 text-center md:text-left"
        variants={{hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },}}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },}}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
        >
          Supercharge Your Resume with AI
        </motion.h1>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 30 },
           show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },}}
          className="text-gray-700 text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0"
        >
          Instantly improve your resume’s impact, tailor it to job descriptions, and get expert feedback — all in one powerful app.
        </motion.p>

        <motion.div
          className="flex justify-center md:justify-start gap-4"
          variants={{ hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },}}
        >
          <button
            onClick={() => router.push('/signup')}
            className="bg-blue-600 text-white px-6 py-3 rounded-md md:text-lg text-sm  font-semibold hover:bg-blue-700 transition"
          >
            Start Free Trial
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md md:text-lg text-sm font-semibold hover:bg-blue-100 transition"
          >
            Explore Tools
          </button>
        </motion.div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        className="flex-1 max-w-md md:max-w-lg mx-auto"
        variants={{ hidden: { opacity: 0, scale: 0.95 },
          show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },}}
        initial="hidden"
        animate="show"
      >
        <Image
          src={HeroImage}
          alt="AI Resume Enhancer preview"
          className="w-full h-auto"
          loading="lazy"
        />
      </motion.div>
    </section>
  );
}
