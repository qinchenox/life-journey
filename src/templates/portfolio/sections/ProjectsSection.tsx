import { ProjectEntry } from "@/lib/types";

interface ProjectsSectionProps {
  projects: ProjectEntry[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-semibold text-neutral-900 mb-5 pb-2 border-b-2 border-neutral-100 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        项目
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-5 rounded-xl bg-neutral-50 border border-neutral-100 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-neutral-200"
          >
            <h3 className="text-base font-semibold text-neutral-800 mb-1 flex items-center gap-1">
              {proj.name}
              {proj.url && (
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-normal text-neutral-400 hover:text-accent transition-colors"
                >
                  ↗
                </a>
              )}
            </h3>
            {proj.description && (
              <p className="text-sm text-neutral-500 mb-2 leading-relaxed">{proj.description}</p>
            )}
            {proj.highlights.length > 0 && (
              <ul className="text-sm text-neutral-600 space-y-0.5">
                {proj.highlights.map((h, i) => (
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
