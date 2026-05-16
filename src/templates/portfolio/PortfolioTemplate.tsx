import { ResumeData } from "@/lib/types";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { SkillsSection } from "./sections/SkillsSection";
import { EducationSection } from "./sections/EducationSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { CertificationsSection } from "./sections/CertificationsSection";

interface PortfolioTemplateProps {
  data: ResumeData;
}

export function PortfolioTemplate({ data }: PortfolioTemplateProps) {
  const { basics, skills, experience, education, projects, languages, certifications } = data;

  return (
    <div className="mx-auto max-w-[860px] px-6 py-12 sm:py-20">
      <HeroSection basics={basics} />
      {basics.summary && <AboutSection summary={basics.summary} />}
      {experience.length > 0 && <ExperienceSection experience={experience} />}
      {education.length > 0 && <EducationSection education={education} />}
      {skills.length > 0 && <SkillsSection skills={skills} />}
      {projects.length > 0 && <ProjectsSection projects={projects} />}
      {languages && languages.length > 0 && <LanguagesSection languages={languages} />}
      {certifications && certifications.length > 0 && <CertificationsSection certifications={certifications} />}
      <footer className="mt-16 pt-6 border-t text-center text-sm text-neutral-400">
        Made with 个人简史
      </footer>
    </div>
  );
}
