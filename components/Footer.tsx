// components/Footer.tsx
'use client';

import Link from 'next/link';
import { FiFacebook, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import { TOOL_CATEGORIES } from '@/constants/toolsData';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">AI Resume Enhancer</h2>
          <p className="text-gray-600 text-sm">
            Enhance, score, and tailor your resume effortlessly with AI-powered tools.
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <FiFacebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-600">
              <FiTwitter size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-600">
              <FiLinkedin size={20} />
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-blue-600">
              <FiGithub size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-900">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-blue-600">FAQ</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Tools Links */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-900">Tools</h3>
          <ul className="space-y-2 text-sm">
            {TOOL_CATEGORIES.map((category) =>
              category.tools.map((tool) => (
                <li key={tool.name}>
                  <Link href={tool.href} className="hover:text-blue-600">
                    {tool.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Legal / Subscribe */}
        <div className="space-y-4">
          <h3 className="font-semibold mb-4 text-gray-900">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-4">&copy; {new Date().getFullYear()} AI Resume Enhancer. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
