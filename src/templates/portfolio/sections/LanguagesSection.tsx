import { LanguageEntry } from "@/lib/types";

interface LanguagesSectionProps {
  languages: LanguageEntry[];
}

export function LanguagesSection({ languages }: LanguagesSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-semibold text-neutral-900 mb-5 pb-2 border-b-2 border-neutral-100 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        语言能力
      </h2>
      <div className="flex flex-wrap gap-3">
        {languages.map((lang) => (
          <span
            key={lang.id}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-700 text-sm"
          >
            <span className="font-medium">{lang.language}</span>
            <span className="text-neutral-400">— {lang.proficiency}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
