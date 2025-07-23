'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/constants/navigation';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white p-6 fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-8">AI Resume Enhancer</h2>
      <nav className="flex flex-col space-y-4">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center space-x-3 hover:text-blue-400 transition mt-3',
              pathname === href ? 'text-blue-400 font-semibold' : ''
            )}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
