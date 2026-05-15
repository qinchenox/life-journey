import { SkillCategory } from "@/lib/types";

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
        技能
      </h2>
      <div className="space-y-4">
        {skills.map((cat) => (
          <div key={cat.id}>
            <h3 className="text-sm font-medium text-neutral-500 mb-2">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item, i) => (
                <span
                  key={i}
                  className="inline-block rounded-full px-3 py-1 bg-neutral-100 text-neutral-700 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
