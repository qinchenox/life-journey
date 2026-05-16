import { SkillCategory } from "@/lib/types";

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-semibold text-neutral-900 mb-5 pb-2 border-b-2 border-neutral-100 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        技能
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((cat) => (
          <div key={cat.id}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-sm transition-all hover:-translate-y-0.5 hover:shadow-sm"
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
