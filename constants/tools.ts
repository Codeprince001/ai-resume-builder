import {
  FiZap, FiBarChart2, FiBriefcase, FiGrid, FiDownload, FiClock,
  FiSearch, FiEdit3, FiFileText, FiMic, FiList
} from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';

export const TOOL_CATEGORIES = [
  {
    title: 'Resume Tools',
    color: 'bg-blue-600',
    tools: [
      { label: 'Enhancer', icon: FiZap, href: '/dashboard' },
      { label: 'Score Resume', icon: FiBarChart2, href: '/dashboard/score' },
      { label: 'Tailor for Job', icon: FiBriefcase, href: '/dashboard/tailor' },
    ]
  },
  {
    title: 'Document Management',
    color: 'bg-green-600',
    tools: [
      { label: 'Templates', icon: FiGrid, href: '/dashboard/templates' },
      { label: 'PDF Export', icon: FiDownload, href: '/dashboard/pdf' },
      { label: 'Version History', icon: FiClock, href: '/dashboard/history' },
    ]
  },
  {
    title: 'AI Assistance',
    color: 'bg-purple-600',
    tools: [
      { label: 'Job Matching', icon: FiSearch, href: '/dashboard/match' },
      { label: 'Smart Suggestions', icon: FiEdit3, href: '/dashboard/suggestions' },
      { label: 'Cover Letter Generator', icon: FiFileText, href: '/dashboard/cover-letter' },
    ]
  },
  {
    title: 'Career Tools',
    color: 'bg-orange-600',
    tools: [
      { label: 'Interview Prep', icon: FiMic, href: '/dashboard/interview' },
      { label: 'Job Tracker', icon: FiList, href: '/dashboard/tracker' },
      { label: 'LinkedIn Enhancer', icon: FaLinkedin, href: '/dashboard/linkedin' },
    ]
  }
];
