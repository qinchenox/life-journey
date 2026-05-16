import { ResumeBasics } from "@/lib/types";

interface HeroSectionProps {
  basics: ResumeBasics;
}

export function HeroSection({ basics }: HeroSectionProps) {
  const contacts = [
    basics.email ? { href: `mailto:${basics.email}`, label: basics.email } : null,
    basics.phone ? { href: null, label: basics.phone } : null,
    basics.location ? { href: null, label: basics.location } : null,
    basics.website ? { href: basics.website, label: basics.website.replace(/^https?:\/\//, "") } : null,
  ].filter(Boolean);

  return (
    <header className="mb-12">
      <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-neutral-900 leading-tight mb-1">
        {basics.name || "姓名"}
      </h1>
      <p className="text-[clamp(1.1rem,2.5vw,1.35rem)] text-neutral-500 mb-4">
        {basics.title}
      </p>
      {contacts.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-400">
          {contacts.map((c, i) =>
            c!.href ? (
              <a key={i} href={c!.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                {c!.label}
              </a>
            ) : (
              <span key={i}>{c!.label}</span>
            )
          )}
        </div>
      )}
    </header>
  );
}
