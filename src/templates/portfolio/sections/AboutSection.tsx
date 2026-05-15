interface AboutSectionProps {
  summary: string;
}

export function AboutSection({ summary }: AboutSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
        关于
      </h2>
      <p className="text-base leading-relaxed text-neutral-600 whitespace-pre-line">
        {summary}
      </p>
    </section>
  );
}
