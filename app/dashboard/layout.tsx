// app/dashboard/layout.tsx
import Sidebar from '@/components/sidebar';
import type { Metadata } from 'next';
import DashboardNav from '@/components/DashboardNav';

export const metadata: Metadata = {
  title: 'Dashboard | AI Resume Enhancer',
  description: 'Access resume enhancement tools, tailoring, scoring, and templates from your dashboard.',
  keywords: ['Resume Enhancer', 'AI Resume Builder', 'Resume Tailoring', 'Job Application', 'CV Optimization'],
  robots: 'index, follow',
  authors: [{ name: 'Wisdom Max' }],
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 w-full p-4 md:p-8">
        {/* Client Component for horizontal nav */}
        <DashboardNav />
        {children}
      </main>
    </div>
  );
}
