"use client";

import { useResumeStore } from "@/store/resume-store";

export function SkillsSection() {
  const skills = useResumeStore((s) => s.data.skills);
  const add = useResumeStore((s) => s.addSkillCategory);
  const remove = useResumeStore((s) => s.removeSkillCategory);
  const update = useResumeStore((s) => s.updateSkillCategory);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-800">技能</h3>
        <button
          onClick={add}
          className="text-sm text-accent hover:underline"
        >
          + 添加技能类别
        </button>
      </div>
      {skills.length === 0 && (
        <p className="text-sm text-neutral-400 py-4 text-center border border-dashed rounded-lg">
          暂无技能信息。点击上方按钮添加，或从简历中自动解析。
        </p>
      )}
      <div className="space-y-6">
        {skills.map((cat) => (
          <div key={cat.id} className="p-4 border border-neutral-200 rounded-lg">
            <div className="flex gap-3 mb-3">
              <input
                value={cat.category}
                onChange={(e) => update(cat.id, "category", e.target.value)}
                placeholder="类别名称（如：编程语言）"
                className="flex-1 px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <button
                onClick={() => remove(cat.id)}
                className="text-sm text-red-400 hover:text-red-600 transition-colors"
              >
                删除
              </button>
            </div>
            <textarea
              value={cat.items.join(", ")}
              onChange={(e) =>
                update(
                  cat.id,
                  "items",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              placeholder="具体技能，用逗号分隔（如：React, TypeScript, Node.js）"
              rows={2}
              className="w-full px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
