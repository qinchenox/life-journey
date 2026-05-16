import { EducationEntry } from "@/lib/types";

interface EducationSectionProps {
  education: EducationEntry[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-semibold text-neutral-900 mb-5 pb-2 border-b-2 border-neutral-100 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        教育
      </h2>
      <div className="relative pl-8 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[1.5px] before:bg-neutral-200 before:rounded-full">
        {education.map((edu) => (
          <div key={edu.id} className="relative mb-7 last:mb-0">
            <span className="absolute -left-[2.15rem] top-1.5 w-2 h-2 rounded-full bg-accent border-2 border-white ring-1 ring-accent z-10" />
            <div className="flex justify-between flex-wrap gap-x-3">
              <h3 className="text-base font-semibold text-neutral-800">{edu.institution}</h3>
              <span className="text-sm text-neutral-400 whitespace-nowrap">
                {edu.startDate} — {edu.endDate}
              </span>
            </div>
            <p className="text-sm text-neutral-500 mt-0.5">
              {edu.degree}
              {edu.field ? ` · ${edu.field}` : ""}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
