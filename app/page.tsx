'use client';

import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero/>

      <main className="flex flex-1 px-6 py-12 gap-12 max-w-7xl mx-auto flex-col md:flex-row">
        {/* Add grid + tools content here */}
      </main>
    </div>
  );
}
