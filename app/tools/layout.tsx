import DashboardNavbar from '@/components/DashboardNav';
import Sidebar from '@/components/sidebar';
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-20 flex-1 flex flex-col">
        <DashboardNavbar />
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}