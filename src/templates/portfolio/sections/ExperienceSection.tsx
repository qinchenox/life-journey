import { ExperienceEntry } from "@/lib/types";

interface ExperienceSectionProps {
  experience: ExperienceEntry[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
        工作经历
      </h2>
      <div className="space-y-10">
        {experience.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-baseline flex-wrap gap-x-4 mb-1">
              <h3 className="text-lg font-semibold text-neutral-800">
                {exp.position}{" "}
                <span className="text-neutral-400 font-normal">@ {exp.company}</span>
              </h3>
              <span className="text-sm text-neutral-400 whitespace-nowrap">
                {exp.startDate} — {exp.endDate}
              </span>
            </div>
            {exp.summary && (
              <p className="text-sm text-neutral-500 mb-2">{exp.summary}</p>
            )}
            {exp.highlights.length > 0 && (
              <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
