'use client';

import Link from 'next/link';
import { TOOL_CATEGORIES } from '@/constants/tools';
import { cn } from '@/lib/utils';

export default function ToolsDropdownMenu() {
  return (
    <div
      className={cn(
        "w-full sm:max-w-3xl bg-white shadow-xl rounded-lg p-4",
        "grid grid-cols-1 sm:grid-cols-2 gap-4",
        "border border-gray-200 absolute sm:relative mt-4 sm:mt-0",
        "max-h-[80vh] overflow-y-auto scrollbar-hide z-50"
      )}
    >
      {TOOL_CATEGORIES.map((category, idx) => (
        <div key={idx} className="space-y-2">
          <h4 className="text-xs uppercase text-gray-500 font-semibold">
            {category.title}
          </h4>
          <div className="grid gap-2">
            {category.tools.map((tool, toolIdx) => (
              <Link
                href={tool.href}
                key={toolIdx}
                className={cn(
                  'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150',
                  `${category.color} text-white hover:bg-white hover:text-gray-900`
                )}
              >
                <tool.icon className="w-4 h-4 text-white group-hover:text-gray-900" />
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
