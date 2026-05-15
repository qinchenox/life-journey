import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { ResumeData } from "./types";
import { EMPTY_RESUME, CLAUDE_SYSTEM_PROMPT } from "./constants";

export async function parseResumeWithClaude(
  rawText: string
): Promise<{ data: ResumeData; warnings: string[] }> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 4096,
    temperature: 0,
    system: CLAUDE_SYSTEM_PROMPT,
    messages: [{ role: "user", content: `请解析以下简历文本：\n\n${rawText}` }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Extract JSON from response
  const jsonMatch =
    text.match(/```(?:json)?\n?([\s\S]*?)\n?```/) ||
    text.match(/(\{[\s\S]*\})/);

  const warnings: string[] = [];

  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      const data = mergeWithDefaults(parsed, warnings);
      return { data, warnings };
    } catch {
      warnings.push("AI 返回的 JSON 格式有误，已尝试降级提取部分字段。");
      const fallback = fallbackRegexParse(rawText);
      return { data: fallback, warnings };
    }
  }

  warnings.push("AI 未返回有效 JSON，已降级使用正则表达式提取部分信息。");
  const fallback = fallbackRegexParse(rawText);
  return { data: fallback, warnings };
}

function mergeWithDefaults(
  parsed: Partial<ResumeData>,
  warnings: string[]
): ResumeData {
  const merged = structuredClone(EMPTY_RESUME);
  if (parsed.basics) {
    const b = parsed.basics;
    merged.basics = {
      name: b.name || "",
      title: b.title || "",
      email: b.email || "",
      phone: b.phone || "",
      location: b.location || "",
      website: b.website || "",
      summary: b.summary || "",
      avatar: b.avatar || "",
    };
    if (!b.name) warnings.push("未检测到姓名。");
    if (!b.email && !b.phone) warnings.push("未检测到联系方式。");
  } else {
    warnings.push("未检测到基本信息。");
  }

  merged.skills = Array.isArray(parsed.skills) ? parsed.skills : [];
  merged.experience = Array.isArray(parsed.experience) ? parsed.experience : [];
  merged.education = Array.isArray(parsed.education) ? parsed.education : [];
  merged.projects = Array.isArray(parsed.projects) ? parsed.projects : [];
  merged.languages = Array.isArray(parsed.languages) ? parsed.languages : [];
  merged.certifications = Array.isArray(parsed.certifications)
    ? parsed.certifications
    : [];

  return merged;
}

function fallbackRegexParse(rawText: string): ResumeData {
  const data = structuredClone(EMPTY_RESUME);

  // Email
  const emailMatch = rawText.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  if (emailMatch) data.basics.email = emailMatch[0];

  // Phone (Chinese mobile)
  const phoneMatch = rawText.match(
    /1[3-9]\d[-]?\d{4}[-]?\d{4}/
  );
  if (phoneMatch) data.basics.phone = phoneMatch[0];

  // First non-empty line as name
  const lines = rawText.split("\n").filter((l) => l.trim());
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    // If first line is short and not an email/phone, treat as name
    if (firstLine.length <= 20 && !firstLine.includes("@") && !/^\d/.test(firstLine)) {
      data.basics.name = firstLine.replace(/简历|个人简历/g, "").trim();
    }
  }

  return data;
}
