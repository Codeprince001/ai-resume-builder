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
    <nav className="flex flex-col px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-30">
      {/* Top bar */}
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/')}>
          <span className="font-bold text-xl text-gray-900 select-none">AI Resume Enhancer</span>
        <div
          className="md:flex items-center gap-2 cursor-pointer flex"
          onClick={() => setShowTools(!showTools)}
        >
          <FiGrid className="w-6 h-6 text-blue-600" />
          <span className="text-gray-900 font-medium">Tools</span>
          <MdOutlineArrowDropDown className="w-4 h-4" />
        </div>
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
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Tools Dropdown (Desktop only) */}
      {showTools && (
        <div className="hidden md:block mt-4">
          <ToolsDropdownMenu />
        </div>
      )}

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="mt-4 md:hidden flex flex-col gap-4 text-sm font-medium text-gray-700">
         
          {showTools && (
            <div>
              <ToolsDropdownMenu />
            </div>
          )}

          {/* Nav Links */}
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
    </nav>
  );
}
