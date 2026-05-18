"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ResumeData, ResumeBasics, SkillCategory, ExperienceEntry, EducationEntry, ProjectEntry, LanguageEntry, CertificationEntry } from "@/lib/types";
import { EMPTY_RESUME } from "@/lib/constants";
import { nanoid } from "nanoid";

interface UserInfo {
  id: string;
  email: string;
  name: string;
}

interface ResumeMeta {
  id: string;
  name: string;
  agent_id: string;
  created_at: string;
  updated_at: string;
}

interface ResumeStore {
  data: ResumeData;
  status: "empty" | "uploading" | "parsing" | "ready" | "error";
  error: string | null;
  warnings: string[];
  agentId: string;

  // Auth
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;

  // History
  resumeList: ResumeMeta[];
  setResumeList: (list: ResumeMeta[]) => void;
  loadResumeHistory: () => Promise<void>;

  setData: (data: ResumeData) => void;
  setStatus: (status: ResumeStore["status"]) => void;
  setError: (error: string | null) => void;
  setWarnings: (warnings: string[]) => void;
  setAgentId: (id: string) => void;

  // Auto-save after data changes
  saveToServer: () => Promise<void>;

  // Resume CRUD
  updateBasics: (field: keyof ResumeBasics, value: string) => void;

  addSkillCategory: () => void;
  removeSkillCategory: (id: string) => void;
  updateSkillCategory: (id: string, field: "category" | "items", value: string | string[]) => void;

  addExperience: () => void;
  removeExperience: (id: string) => void;
  updateExperience: (id: string, field: string, value: string | string[]) => void;

  addEducation: () => void;
  removeEducation: (id: string) => void;
  updateEducation: (id: string, field: string, value: string) => void;

  addProject: () => void;
  removeProject: (id: string) => void;
  updateProject: (id: string, field: string, value: string | string[]) => void;

  addLanguage: () => void;
  removeLanguage: (id: string) => void;
  updateLanguage: (id: string, field: string, value: string) => void;

  addCertification: () => void;
  removeCertification: (id: string) => void;
  updateCertification: (id: string, field: string, value: string) => void;

  setTheme: (themeId: string) => void;

  reset: () => void;
}

const emptySkill = (): SkillCategory => ({ id: nanoid(8), category: "", items: [] });
const emptyExperience = (): ExperienceEntry => ({ id: nanoid(8), company: "", position: "", startDate: "", endDate: "", summary: "", highlights: [] });
const emptyEducation = (): EducationEntry => ({ id: nanoid(8), institution: "", degree: "", field: "", startDate: "", endDate: "" });
const emptyProject = (): ProjectEntry => ({ id: nanoid(8), name: "", description: "", url: "", highlights: [] });
const emptyLanguage = (): LanguageEntry => ({ id: nanoid(8), language: "", proficiency: "" });
const emptyCertification = (): CertificationEntry => ({ id: nanoid(8), name: "", issuer: "", date: "" });

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      data: EMPTY_RESUME,
      status: "empty",
      error: null,
      warnings: [],
      agentId: "general-allround",
      user: null,
      resumeList: [],

      setUser: (user) => set({ user }),
      setResumeList: (resumeList) => set({ resumeList }),
      setAgentId: (agentId) => set({ agentId }),

      loadResumeHistory: async () => {
        try {
          const res = await fetch("/api/resumes");
          const json = await res.json();
          if (json.resumes) set({ resumeList: json.resumes });
        } catch { console.error("loadResumeHistory: 加载历史记录失败"); }
      },

      saveToServer: async () => {
        const { user, data, agentId } = get();
        if (!user) return;
        try {
          await fetch("/api/resumes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data, agentId }),
          });
        } catch {
          console.error("saveToServer: 保存失败，请检查网络连接");
        }
      },

      setData: (data) => set({ data, status: "ready", error: null }),
      setStatus: (status) => set({ status }),
      setError: (error) => set({ error, status: "error" }),
      setWarnings: (warnings) => set({ warnings }),

      updateBasics: (field, value) =>
        set((s) => ({ data: { ...s.data, basics: { ...s.data.basics, [field]: value } } })),

      addSkillCategory: () =>
        set((s) => ({ data: { ...s.data, skills: [...s.data.skills, emptySkill()] } })),
      removeSkillCategory: (id) =>
        set((s) => ({ data: { ...s.data, skills: s.data.skills.filter((sk) => sk.id !== id) } })),
      updateSkillCategory: (id, field, value) =>
        set((s) => ({
          data: { ...s.data, skills: s.data.skills.map((sk) => (sk.id === id ? { ...sk, [field]: value } : sk)) },
        })),

      addExperience: () =>
        set((s) => ({ data: { ...s.data, experience: [...s.data.experience, emptyExperience()] } })),
      removeExperience: (id) =>
        set((s) => ({ data: { ...s.data, experience: s.data.experience.filter((e) => e.id !== id) } })),
      updateExperience: (id, field, value) =>
        set((s) => ({
          data: { ...s.data, experience: s.data.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)) },
        })),

      addEducation: () =>
        set((s) => ({ data: { ...s.data, education: [...s.data.education, emptyEducation()] } })),
      removeEducation: (id) =>
        set((s) => ({ data: { ...s.data, education: s.data.education.filter((e) => e.id !== id) } })),
      updateEducation: (id, field, value) =>
        set((s) => ({
          data: { ...s.data, education: s.data.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)) },
        })),

      addProject: () =>
        set((s) => ({ data: { ...s.data, projects: [...s.data.projects, emptyProject()] } })),
      removeProject: (id) =>
        set((s) => ({ data: { ...s.data, projects: s.data.projects.filter((p) => p.id !== id) } })),
      updateProject: (id, field, value) =>
        set((s) => ({
          data: { ...s.data, projects: s.data.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)) },
        })),

      addLanguage: () =>
        set((s) => ({ data: { ...s.data, languages: [...s.data.languages, emptyLanguage()] } })),
      removeLanguage: (id) =>
        set((s) => ({ data: { ...s.data, languages: s.data.languages.filter((l) => l.id !== id) } })),
      updateLanguage: (id, field, value) =>
        set((s) => ({
          data: { ...s.data, languages: s.data.languages.map((l) => (l.id === id ? { ...l, [field]: value } : l)) },
        })),

      addCertification: () =>
        set((s) => ({ data: { ...s.data, certifications: [...s.data.certifications, emptyCertification()] } })),
      removeCertification: (id) =>
        set((s) => ({ data: { ...s.data, certifications: s.data.certifications.filter((c) => c.id !== id) } })),
      updateCertification: (id, field, value) =>
        set((s) => ({
          data: { ...s.data, certifications: s.data.certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)) },
        })),

      setTheme: (themeId) => set((s) => ({ data: { ...s.data, themeId } })),

      reset: () => set({ data: EMPTY_RESUME, status: "empty", error: null, warnings: [] }),
    }),
    {
      name: "life-journey-resume",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        data: state.data,
        status: state.status,
        agentId: state.agentId,
      }),
    }
  )
);
