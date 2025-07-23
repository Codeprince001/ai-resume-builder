import { FaTools, FaUpload, FaRobot, FaDownload } from "react-icons/fa";


type Step = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
};


export const steps: Step[] = [
  {
    icon: FaUpload,
    title: 'Upload Your Resume',
    description: 'Import your resume in PDF, DOCX, or text format.',
    color: 'bg-blue-500',
  },
  {
    icon: FaTools ,
    title: 'Choose a Tool',
    description: 'Pick from Enhancer, Scorer, or Tailor to refine your resume.',
    color: 'bg-green-500',
  },
  {
    icon: FaRobot,
    title: 'Let AI Work',
    description: 'Our smart engine analyzes and improves your resume instantly.',
    color: 'bg-purple-500',
  },
  {
    icon: FaDownload,
    title: 'Download & Apply',
    description: 'Export your updated resume and start applying with confidence.',
    color: 'bg-pink-500',
  },
];