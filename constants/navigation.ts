// constants/navigation.ts
import {
  FiZap,
  FiBriefcase,
  FiBarChart2,
  FiLayout,
} from 'react-icons/fi';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Enhancer',
    href: '/dashboard',
    icon: FiZap,
  },
  {
    label: 'Tailor for Job',
    href: '/dashboard/tailor',
    icon: FiBriefcase,
  },
  {
    label: 'Score Resume',
    href: '/dashboard/score',
    icon: FiBarChart2,
  },
  {
    label: 'Templates',
    href: '/dashboard/templates',
    icon: FiLayout,
  },
];
