"use client";

import { useResumeStore } from "@/store/resume-store";

export function BasicsSection() {
  const basics = useResumeStore((s) => s.data.basics);
  const update = useResumeStore((s) => s.updateBasics);

  const fields: { key: keyof typeof basics; label: string; type?: string; rows?: number }[] = [
    { key: "name", label: "姓名" },
    { key: "title", label: "职位/头衔" },
    { key: "email", label: "邮箱", type: "email" },
    { key: "phone", label: "电话" },
    { key: "location", label: "所在城市" },
    { key: "website", label: "个人网站" },
    { key: "summary", label: "个人简介", rows: 4 },
  ];

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-800">基本信息</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ key, label, type, rows }) => (
          <div key={key} className={key === "summary" ? "sm:col-span-2" : ""}>
            <label className="block text-sm font-medium text-neutral-500 mb-1.5">
              {label}
            </label>
            {rows ? (
              <textarea
                value={basics[key]}
                onChange={(e) => update(key, e.target.value)}
                rows={rows}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-y"
                placeholder={`请输入${label}`}
              />
            ) : (
              <input
                type={type || "text"}
                value={basics[key]}
                onChange={(e) => update(key, e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                placeholder={`请输入${label}`}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
