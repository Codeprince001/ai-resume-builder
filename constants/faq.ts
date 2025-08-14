// constants/faq.ts
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "Do I need a perfect resume already?",
    answer: "No, AI Resume Enhancer works with any resume format and helps you improve it step by step."
  },
  {
    id: 2,
    question: "Which resume formats are supported?",
    answer: "You can upload PDF, DOCX, or plain text formats, and our AI will analyze them."
  },
  {
    id: 3,
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You have full control over your subscription and can cancel anytime."
  },
  {
    id: 4,
    question: "Is my data secure?",
    answer: "Absolutely. All your data is encrypted and never shared with third parties."
  },
];
