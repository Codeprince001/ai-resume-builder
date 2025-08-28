'use client';

import { sidebarItems } from '@/constants/sidebarItems';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiUser
} from 'react-icons/fi';


export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 z-40">
      {/* Navigation Items */}
      <div className="flex flex-col items-center space-y-6 flex-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                {item.label}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900"></div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Account Icon at Bottom */}
      <div className="mt-auto">
        <Link
          href="/dashboard/account"
          className={`
            group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-200
            ${pathname === '/dashboard/account'
              ? 'bg-blue-100 text-blue-600' 
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }
          `}
        >
          <FiUser className="w-5 h-5" />
          
          {/* Tooltip */}
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
            Account
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900"></div>
          </div>
        </Link>
      </div>
    </div>
  );
}