import Sidebar from '@/components/sidebar';
import DashboardNav from '@/components/DashboardNav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | AI Resume Enhancer',
  description: 'Access resume enhancement tools, tailoring, scoring, and templates from your dashboard.',
  keywords: [
    'Resume Enhancer',
    'AI Resume Builder',
    'Resume Tailoring',
    'Job Application',
    'CV Optimization',
  ],
  robots: 'index, follow',
  authors: [{ name: 'Wisdom Max' }],
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="ml-64 w-full p-4 md:p-8">
        <DashboardNav />
        {children}
      </main>
    </div>
  );
}
