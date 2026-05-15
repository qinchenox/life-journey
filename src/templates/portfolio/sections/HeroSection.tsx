import { ResumeBasics } from "@/lib/types";

interface HeroSectionProps {
  basics: ResumeBasics;
}

export function HeroSection({ basics }: HeroSectionProps) {
  return (
    <header className="mb-16">
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-3">
        {basics.name || "姓名"}
      </h1>
      <p className="text-xl text-neutral-500 mb-4">{basics.title}</p>
      {(basics.email || basics.phone || basics.location || basics.website) && (
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-400">
          {basics.email && (
            <a
              href={`mailto:${basics.email}`}
              className="hover:text-accent transition-colors"
            >
              {basics.email}
            </a>
          )}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{basics.location}</span>}
          {basics.website && (
            <a
              href={basics.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {basics.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
      )}
    </header>
  );
}
