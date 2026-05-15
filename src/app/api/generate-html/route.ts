import { NextRequest, NextResponse } from "next/server";
import { generatePortfolioHTML } from "@/lib/html-generator";
import { ResumeData } from "@/lib/types";
import { z } from "zod";

const basicsSchema = z.object({
  name: z.string(),
  title: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string(),
  website: z.string(),
  summary: z.string(),
  avatar: z.string(),
});

const resumeDataSchema: z.ZodType<ResumeData> = z.object({
  basics: basicsSchema,
  skills: z.array(z.object({
    id: z.string(),
    category: z.string(),
    items: z.array(z.string()),
  })),
  experience: z.array(z.object({
    id: z.string(),
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    summary: z.string(),
    highlights: z.array(z.string()),
  })),
  education: z.array(z.object({
    id: z.string(),
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  })),
  projects: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    url: z.string(),
    highlights: z.array(z.string()),
  })),
  languages: z.array(z.object({
    id: z.string(),
    language: z.string(),
    proficiency: z.string(),
  })),
  certifications: z.array(z.object({
    id: z.string(),
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
  })),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = resumeDataSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "无效的简历数据", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const html = generatePortfolioHTML(parsed.data);
    const name = parsed.data.basics.name || "个人主页";

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(name)}-个人主页.html"`,
      },
    });
  } catch (error) {
    console.error("Generate HTML error:", error);
    return NextResponse.json(
      { error: "HTML 生成失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
