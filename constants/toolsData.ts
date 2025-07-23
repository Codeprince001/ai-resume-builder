// constants/toolsData.ts

import { FiEdit, FiTarget, FiUpload, FiFileText } from "react-icons/fi";

export const TOOL_CATEGORIES = [
  {
    title: "Resume Tools",
    tools: [
      {
        name: "Resume Rewriter",
        description: "Improve and rephrase your resume content using AI.",
        icon: FiEdit,
        href: "/tools/resume-rewriter",
      },
      {
        name: "PDF Resume Parser",
        description: "Extract and edit text from your existing PDF resume.",
        icon: FiFileText,
        href: "/tools/resume-parser",
      },
    ],
  },
  {
    title: "Job Tailoring Tools",
    tools: [
      {
        name: "Tailor for Job",
        description: "Optimize your resume for a specific job description.",
        icon: FiTarget,
        href: "/tools/tailor-resume",
      },
    ],
  },
  {
    title: "Document Tools",
    tools: [
      {
        name: "PDF Uploader",
        description: "Upload and manage your resume or job descriptions.",
        icon: FiUpload,
        href: "/tools/pdf-upload",
      },
    ],
  },
];
