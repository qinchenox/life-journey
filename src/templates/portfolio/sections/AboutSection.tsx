interface AboutSectionProps {
  summary: string;
}

export function AboutSection({ summary }: AboutSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-semibold text-neutral-900 mb-4 pb-2 border-b-2 border-neutral-100 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        关于
      </h2>
      <p className="text-[clamp(0.9rem,2vw,1rem)] leading-relaxed text-neutral-600 whitespace-pre-line">
        {summary}
      </p>
    </section>
  );
}
