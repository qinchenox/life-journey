export interface ResumeBasics {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  avatar: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  url: string;
  highlights: string[];
}

export interface LanguageEntry {
  id: string;
  language: string;
  proficiency: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  basics: ResumeBasics;
  skills: SkillCategory[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  languages: LanguageEntry[];
  certifications: CertificationEntry[];
}

export interface ParseResponse {
  success: boolean;
  data?: ResumeData;
  error?: string;
  code?: string;
  warnings?: string[];
}
