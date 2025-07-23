// constants/testimonials.ts
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  photoUrl: string;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Product Manager",
    photoUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "AI Resume Enhancer helped me tailor my resume perfectly. I landed my dream job in weeks!",
  },
  {
    id: 2,
    name: "Brian Lee",
    role: "Software Engineer",
    photoUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "The scoring feature gave me clear feedback and boosted my confidence.",
  },
  {
    id: 3,
    name: "Clara Kim",
    role: "UX Designer",
    photoUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "I love how easy it was to enhance my resume with AI suggestions. Highly recommend!",
  },
  {
    id: 4,
    name: "David Park",
    role: "Data Analyst",
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "The tailoring tool saved me hours customizing for each job application.",
  },
];
