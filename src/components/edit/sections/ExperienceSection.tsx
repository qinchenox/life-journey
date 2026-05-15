"use client";

import { useResumeStore } from "@/store/resume-store";

export function ExperienceSection() {
  const experience = useResumeStore((s) => s.data.experience);
  const add = useResumeStore((s) => s.addExperience);
  const remove = useResumeStore((s) => s.removeExperience);
  const update = useResumeStore((s) => s.updateExperience);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-800">工作经历</h3>
        <button
          onClick={add}
          className="text-sm text-accent hover:underline"
        >
          + 添加工作经历
        </button>
      </div>
      {experience.length === 0 && (
        <p className="text-sm text-neutral-400 py-4 text-center border border-dashed rounded-lg">
          暂无工作经历。
        </p>
      )}
      <div className="space-y-6">
        {experience.map((exp) => (
          <div key={exp.id} className="p-4 border border-neutral-200 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-neutral-500">工作经历</span>
              <button
                onClick={() => remove(exp.id)}
                className="text-sm text-red-400 hover:text-red-600"
              >
                删除
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={exp.company}
                onChange={(e) => update(exp.id, "company", e.target.value)}
                placeholder="公司名称"
                className="px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <input
                value={exp.position}
                onChange={(e) => update(exp.id, "position", e.target.value)}
                placeholder="职位"
                className="px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <input
                value={exp.startDate}
                onChange={(e) => update(exp.id, "startDate", e.target.value)}
                placeholder="开始日期（如 2023-01）"
                className="px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <input
                value={exp.endDate}
                onChange={(e) => update(exp.id, "endDate", e.target.value)}
                placeholder="结束日期（如 至今）"
                className="px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>
            <input
              value={exp.summary}
              onChange={(e) => update(exp.id, "summary", e.target.value)}
              placeholder="工作概述"
              className="w-full px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
            <textarea
              value={exp.highlights.join("\n")}
              onChange={(e) =>
                update(
                  exp.id,
                  "highlights",
                  e.target.value.split("\n").filter(Boolean)
                )
              }
              placeholder="工作亮点（每行一条）"
              rows={3}
              className="w-full px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
