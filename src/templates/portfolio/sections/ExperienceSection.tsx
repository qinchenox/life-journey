import { ExperienceEntry } from "@/lib/types";

interface ExperienceSectionProps {
  experience: ExperienceEntry[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-semibold text-neutral-900 mb-5 pb-2 border-b-2 border-neutral-100 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        工作经历
      </h2>
      <div className="relative pl-8 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[1.5px] before:bg-neutral-200 before:rounded-full">
        {experience.map((exp) => (
          <div key={exp.id} className="relative mb-9 last:mb-0">
            <span className="absolute -left-[2.15rem] top-1.5 w-2 h-2 rounded-full bg-accent border-2 border-white ring-1 ring-accent z-10" />
            <div className="flex justify-between items-baseline flex-wrap gap-x-3 gap-y-0.5 mb-0.5">
              <h3 className="text-base font-semibold text-neutral-800">
                {exp.position}{" "}
                <span className="font-normal text-neutral-400">@ {exp.company}</span>
              </h3>
              <span className="text-sm text-neutral-400 whitespace-nowrap">
                {exp.startDate} — {exp.endDate}
              </span>
            </div>
            {exp.summary && (
              <p className="text-sm text-neutral-500 mb-1.5 leading-relaxed">{exp.summary}</p>
            )}
            {exp.highlights.length > 0 && (
              <ul className="text-sm text-neutral-600 space-y-0.5">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="relative pl-3.5 before:absolute before:left-0 before:top-[0.45em] before:text-[0.6em] before:text-accent before:content-['▸']">
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
