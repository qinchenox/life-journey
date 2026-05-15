"use client";

import { useResumeStore } from "@/store/resume-store";

export function ProjectsSection() {
  const projects = useResumeStore((s) => s.data.projects);
  const add = useResumeStore((s) => s.addProject);
  const remove = useResumeStore((s) => s.removeProject);
  const update = useResumeStore((s) => s.updateProject);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-800">项目经历</h3>
        <button
          onClick={add}
          className="text-sm text-accent hover:underline"
        >
          + 添加项目
        </button>
      </div>
      {projects.length === 0 && (
        <p className="text-sm text-neutral-400 py-4 text-center border border-dashed rounded-lg">
          暂无项目经历。
        </p>
      )}
      <div className="space-y-6">
        {projects.map((proj) => (
          <div key={proj.id} className="p-4 border border-neutral-200 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-neutral-500">项目</span>
              <button
                onClick={() => remove(proj.id)}
                className="text-sm text-red-400 hover:text-red-600"
              >
                删除
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={proj.name}
                onChange={(e) => update(proj.id, "name", e.target.value)}
                placeholder="项目名称"
                className="px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <input
                value={proj.url}
                onChange={(e) => update(proj.id, "url", e.target.value)}
                placeholder="项目链接（可选）"
                className="px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>
            <input
              value={proj.description}
              onChange={(e) => update(proj.id, "description", e.target.value)}
              placeholder="项目描述"
              className="w-full px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
            <textarea
              value={proj.highlights.join("\n")}
              onChange={(e) =>
                update(
                  proj.id,
                  "highlights",
                  e.target.value.split("\n").filter(Boolean)
                )
              }
              placeholder="项目亮点（每行一条）"
              rows={3}
              className="w-full px-3 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
