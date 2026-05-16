import { ResumeData } from "./types";
import { EMPTY_RESUME } from "./constants";
import { detectTheme } from "./themes";
import { getAgent, DEFAULT_AGENT_ID } from "./agents";

const BASE_URL = process.env.LLM_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1";
const API_KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = process.env.LLM_MODEL || "qwen-plus";

export async function parseResumeWithClaude(
  rawText: string,
  agentId?: string
): Promise<{ data: ResumeData; warnings: string[] }> {
  const agent = getAgent(agentId || DEFAULT_AGENT_ID);

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      temperature: 0.3,
      messages: [
        { role: "system", content: agent.systemPrompt },
        { role: "user", content: `请解析以下简历文本，按照上述角色定位和优化原则进行润色：\n\n${rawText}` },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`LLM API 调用失败 (${response.status}): ${errText.slice(0, 200)}`);
  }

  const json = await response.json() as {
    choices: Array<{ message: { content: string } }>;
  };
  const text = json.choices?.[0]?.message?.content || "";

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
  merged.certifications = Array.isArray(parsed.certifications) ? parsed.certifications : [];

  const allSkills = merged.skills.flatMap((s) => s.items);
  merged.themeId = detectTheme(merged.basics.title, merged.basics.summary, allSkills);

  return merged;
}

function fallbackRegexParse(rawText: string): ResumeData {
  const data = structuredClone(EMPTY_RESUME);

  const emailMatch = rawText.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  if (emailMatch) data.basics.email = emailMatch[0];

  const phoneMatch = rawText.match(/1[3-9]\d[-]?\d{4}[-]?\d{4}/);
  if (phoneMatch) data.basics.phone = phoneMatch[0];

  const lines = rawText.split("\n").filter((l) => l.trim());
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (
      firstLine.length <= 20 &&
      !firstLine.includes("@") &&
      !/^\d/.test(firstLine)
    ) {
      data.basics.name = firstLine.replace(/简历|个人简历/g, "").trim();
    }
  }

  return data;
}
