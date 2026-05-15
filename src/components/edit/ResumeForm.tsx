"use client";

import { useRouter } from "next/navigation";
import { BasicsSection } from "./sections/BasicsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { useResumeStore } from "@/store/resume-store";

export function ResumeForm() {
  const router = useRouter();
  const reset = useResumeStore((s) => s.reset);
  const hasData = useResumeStore((s) => s.data.basics.name !== "");

  if (!hasData) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <p className="text-lg text-neutral-500 mb-4">尚未上传简历或解析数据为空。</p>
        <button
          onClick={() => router.push("/")}
          className="text-accent hover:underline"
        >
          返回上传简历
        </button>
        <p className="text-sm text-neutral-400 mt-4">也可手动填写以下信息创建个人主页。</p>
        <div className="mt-8">
          <FormContent />
        </div>
      </div>
    );
  }

  return <FormContent />;
}

function FormContent() {
  const router = useRouter();
  const reset = useResumeStore((s) => s.reset);
  const warnings = useResumeStore((s) => s.warnings);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-neutral-800">编辑简历信息</h2>
          <p className="text-sm text-neutral-400 mt-1">
            AI 解析结果可能有误，请检查并修正以下信息。
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="text-sm text-neutral-400 hover:text-red-500 transition-colors"
          >
            清空重填
          </button>
          <button
            onClick={() => router.push("/preview")}
            className="px-4 py-2 bg-[#0a0a0a] text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            预览主页
          </button>
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          {warnings.map((w, i) => (
            <p key={i} className="text-sm text-yellow-700">{w}</p>
          ))}
        </div>
      )}

      <div className="space-y-10">
        <BasicsSection />
        <hr className="border-neutral-200" />
        <ExperienceSection />
        <hr className="border-neutral-200" />
        <EducationSection />
        <hr className="border-neutral-200" />
        <SkillsSection />
        <hr className="border-neutral-200" />
        <ProjectsSection />
      </div>

      <div className="mt-10 pb-16 flex justify-end">
        <button
          onClick={() => router.push("/preview")}
          className="px-6 py-3 bg-[#0a0a0a] text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        >
          预览生成结果
        </button>
      </div>
    </div>
  );
}
