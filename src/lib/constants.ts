import { ResumeData } from "./types";

export const EMPTY_RESUME: ResumeData = {
  basics: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
    avatar: "",
  },
  skills: [],
  experience: [],
  education: [],
  projects: [],
  languages: [],
  certifications: [],
  themeId: "mono",
};
