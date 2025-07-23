'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DASHBOARD_NAV } from '@/constants/dashboardNav';
import { cn } from '@/lib/utils';

export default function DashboardNav() {
  const pathname = usePathname();

  // Always show "Dashboard" link first
  const dashboardNav = DASHBOARD_NAV.find((item) => item.href === '/dashboard');
  // Find if current pathname matches a subpage
  const currentSubPage = DASHBOARD_NAV.find((item) => item.href === pathname && pathname !== '/dashboard');

  return (
    <nav className="flex space-x-2 text-sm md:text-base font-medium text-gray-600 mb-4 border-b pb-2">
      {dashboardNav && (
        <Link
          href={dashboardNav.href}
          className={cn(
            'hover:text-blue-500 transition',
            pathname === dashboardNav.href ? 'text-blue-500 font-semibold border-b-2 border-blue-500' : ''
          )}
        >
          {dashboardNav.label}
        </Link>
      )}

      {/* Show slash separator only if on subpage */}
      {currentSubPage && <span className="text-gray-400">/</span>}

      {/* Show subpage if exists */}
      {currentSubPage && (
        <Link
          href={currentSubPage.href}
          className="text-blue-500 font-semibold border-b-2 border-blue-500"
          aria-current="page"
        >
          {currentSubPage.label}
        </Link>
      )}
    </nav>
  );
}
