"use client";

import { useResumeStore } from "@/store/resume-store";

export function EducationSection() {
  const education = useResumeStore((s) => s.data.education);
  const add = useResumeStore((s) => s.addEducation);
  const remove = useResumeStore((s) => s.removeEducation);
  const update = useResumeStore((s) => s.updateEducation);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-800">教育背景</h3>
        <button
          onClick={add}
          className="text-sm text-accent hover:underline"
        >
          + 添加教育经历
        </button>
      </div>
      {education.length === 0 && (
        <p className="text-sm text-neutral-400 py-4 text-center border border-dashed rounded-lg">
          暂无教育背景。
        </p>
      )}
      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 border border-neutral-200 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-neutral-500">教育经历</span>
              <button
                onClick={() => remove(edu.id)}
                className="text-sm text-red-400 hover:text-red-600"
              >
                删除
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={edu.institution}
                onChange={(e) => update(edu.id, "institution", e.target.value)}
                placeholder="学校名称"
                className="px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <input
                value={edu.degree}
                onChange={(e) => update(edu.id, "degree", e.target.value)}
                placeholder="学位（如 本科）"
                className="px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <input
                value={edu.field}
                onChange={(e) => update(edu.id, "field", e.target.value)}
                placeholder="专业"
                className="px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <div className="flex gap-2">
                <input
                  value={edu.startDate}
                  onChange={(e) => update(edu.id, "startDate", e.target.value)}
                  placeholder="开始日期"
                  className="flex-1 px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
                <input
                  value={edu.endDate}
                  onChange={(e) => update(edu.id, "endDate", e.target.value)}
                  placeholder="结束日期"
                  className="flex-1 px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
