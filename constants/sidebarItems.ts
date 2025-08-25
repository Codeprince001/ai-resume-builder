import { FiBarChart2, FiBriefcase, FiLayout, FiZapOff } from "react-icons/fi";

export const sidebarItems = [
  {
    label: 'Enhancer',
    href: '/dashboard',
    icon: FiZapOff,
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