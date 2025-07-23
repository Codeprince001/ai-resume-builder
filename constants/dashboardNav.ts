// constants/dashboardNav.ts
// import { FiZap, FiBriefcase, FiBarChart2, FiLayout } from 'react-icons/fi';

export interface DashboardNavItem {
  label: string;
  href: string;
}

export const DASHBOARD_NAV: DashboardNavItem[] = [
  {
    label: 'Enhancer',
    href: '/dashboard',
  },
  {
    label: 'Tailor for Job',
    href: '/dashboard/tailor',
  },
  {
    label: 'Score Resume',
    href: '/dashboard/score',
  },
  {
    label: 'Templates',
    href: '/dashboard/templates',
  },
];
