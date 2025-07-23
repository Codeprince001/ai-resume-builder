'use client';

import Link from 'next/link';
import { TOOL_CATEGORIES } from '@/constants/toolsData';
import { motion } from 'framer-motion';

export default function ToolsGrid() {
  return (
    <section className="px-4 sm:px-6 lg:px-20 py-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900"
      >
        Explore Tools
      </motion.h2>

      {TOOL_CATEGORIES.map((category, index) => (
        <div key={category.title} className="mb-12">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            className="text-xl font-semibold mb-4 text-blue-600 border-b pb-1 border-blue-200 inline-block"
          >
            {category.title}
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.tools.map((tool, toolIndex) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: toolIndex * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Link
                  href={tool.href}
                  className="group border-[0.5px] border-gray-400  rounded-2xl p-5 bg-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <tool.icon className="text-blue-600 w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                      {tool.name}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
