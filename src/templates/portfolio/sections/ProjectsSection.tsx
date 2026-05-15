import { ProjectEntry } from "@/lib/types";

interface ProjectsSectionProps {
  projects: ProjectEntry[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">
        项目
      </h2>
      <div className="space-y-8">
        {projects.map((proj) => (
          <div key={proj.id}>
            <h3 className="text-lg font-semibold text-neutral-800">
              {proj.name}
              {proj.url && (
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-sm font-normal text-neutral-400 hover:text-accent transition-colors"
                >
                  ↗
                </a>
              )}
            </h3>
            {proj.description && (
              <p className="text-sm text-neutral-500 mt-1">{proj.description}</p>
            )}
            {proj.highlights.length > 0 && (
              <ul className="list-disc list-inside text-sm text-neutral-600 mt-2 space-y-1">
                {proj.highlights.map((h, i) => (
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
