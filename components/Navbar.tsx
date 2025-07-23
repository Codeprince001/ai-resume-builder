'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NAV_LINKS } from '@/constants/navLinks';
import { FiGrid, FiMenu, FiX } from 'react-icons/fi';
import { MdOutlineArrowDropDown } from "react-icons/md";
import ToolsDropdownMenu from './ToolsDropdownMenu';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [showTools, setShowTools] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-30">
        {/* Left side: Logo + Tools toggle */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/')}>
          <span className="font-bold text-xl text-gray-900 select-none">AI Resume Enhancer</span>
          {/* Tools toggle button (always visible next to logo) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTools(!showTools);
            }}
            className="flex items-center gap-2 ml-6 font-medium text-gray-900 focus:outline-none"
            aria-expanded={showTools}
            aria-haspopup="true"
            type="button"
          >
            <FiGrid className="w-6 h-6 text-blue-600" />
            <span className="hidden sm:inline">Tools</span> {/* Hide text on very small mobile if you want */}
            <MdOutlineArrowDropDown
              className={`w-5 h-5 transition-transform duration-200 ${showTools ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium justify-center items-center">
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} className="hover:text-blue-600 transition">
              {label}
            </Link>
          ))}
          <button
            onClick={() => router.push('/signup')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Free Trial
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Tools Dropdown - always below navbar */}
      {showTools && (
        <div className="border-b border-gray-200 bg-white shadow-md z-20 sticky top-[64px] sm:top-[72px]">
          <ToolsDropdownMenu />
        </div>
      )}

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 text-sm font-medium text-gray-700 border-b border-gray-200 bg-white">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600"
            >
              {label}
            </Link>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              router.push('/signup');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
          >
            Free Trial
          </button>
        </div>
      )}
    </>
  );
}
