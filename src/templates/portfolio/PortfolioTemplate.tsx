import { ResumeData } from "@/lib/types";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { SkillsSection } from "./sections/SkillsSection";
import { EducationSection } from "./sections/EducationSection";
import { ProjectsSection } from "./sections/ProjectsSection";

interface PortfolioTemplateProps {
  data: ResumeData;
}

export function PortfolioTemplate({ data }: PortfolioTemplateProps) {
  const { basics, skills, experience, education, projects } = data;

  return (
    <main className="mx-auto max-w-[720px] px-6 py-16 sm:py-24">
      <HeroSection basics={basics} />
      {basics.summary && <AboutSection summary={basics.summary} />}
      {experience.length > 0 && <ExperienceSection experience={experience} />}
      {education.length > 0 && <EducationSection education={education} />}
      {skills.length > 0 && <SkillsSection skills={skills} />}
      {projects.length > 0 && <ProjectsSection projects={projects} />}
      <footer className="mt-24 pt-8 border-t border-neutral-200 text-center text-sm text-neutral-400">
        Made with 个人简史
      </footer>
    </main>
  );
}
