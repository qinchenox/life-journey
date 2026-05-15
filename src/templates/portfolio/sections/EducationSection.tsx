import { EducationEntry } from "@/lib/types";

interface EducationSectionProps {
  education: EducationEntry[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
        教育
      </h2>
      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="flex justify-between flex-wrap gap-x-4">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800">
                {edu.institution}
              </h3>
              <p className="text-sm text-neutral-500">
                {edu.degree}
                {edu.field ? ` · ${edu.field}` : ""}
              </p>
            </div>
            <span className="text-sm text-neutral-400 whitespace-nowrap">
              {edu.startDate} — {edu.endDate}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
