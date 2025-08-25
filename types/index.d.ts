// Profile Types
export interface Profile {
  id: string;
  userId: string;
  headline?: string;
  bio?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  skills: Skill[];
  workExperience: WorkExperience[];
  education: Education[];
  updatedAt: Date;
}

export interface Skill {
  id?: string;
  profileId?: string;
  name: string;
  proficiency?: number; // 1-5 scale
  years?: number;
}

export interface WorkExperience {
  id?: string;
  profileId?: string;
  title: string;
  company: string;
  startDate: Date | string;
  endDate?: Date | string;
  description?: string;
  currentlyWorking: boolean;
}

export interface Education {
  id?: string;
  profileId?: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: Date | string;
  endDate?: Date | string;
  grade?: string;
}

export interface ProfileFormData {
  // Basic Info
  headline?: string;
  bio?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  
  // Skills
  skills: Skill[];
  
  // Work Experience
  workExperience: WorkExperience[];
  
  // Education
  education: Education[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}