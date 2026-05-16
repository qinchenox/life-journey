import { CertificationEntry } from "@/lib/types";

interface CertificationsSectionProps {
  certifications: CertificationEntry[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-semibold text-neutral-900 mb-5 pb-2 border-b-2 border-neutral-100 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        证书
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {certifications.map((cert) => (
          <div key={cert.id} className="p-4 rounded-lg bg-neutral-50 border border-neutral-100">
            <h3 className="text-sm font-semibold text-neutral-800">{cert.name}</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              {cert.issuer}
              {cert.date ? ` · ${cert.date}` : ""}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
