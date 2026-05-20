// Server-safe prompt getter (no "use client")
import { zh } from "./zh";
import { en } from "./en";

type Locale = "zh" | "en";

function getLocale(): Locale {
  return (process.env.NEXT_PUBLIC_LOCALE as Locale) || "zh";
}

export function getSharedOutputFormat(locale?: Locale): string {
  const loc = locale || getLocale();
  return (loc === "en" ? en : zh).prompts.sharedOutputFormat;
}

export function getAgentPrompt(agentId: string, locale?: Locale): string {
  const loc = locale || getLocale();
  const prompts = (loc === "en" ? en : zh).prompts;
  switch (agentId) {
    case "tech-geek": return prompts.techGeekPrompt + prompts.sharedOutputFormat;
    case "creative-master": return prompts.creativeMasterPrompt + prompts.sharedOutputFormat;
    case "business-elite": return prompts.businessElitePrompt + prompts.sharedOutputFormat;
    case "academic-rigor": return prompts.academicRigorPrompt + prompts.sharedOutputFormat;
    case "general-allround":
    default: return prompts.generalAllroundPrompt + prompts.sharedOutputFormat;
  }
}

export function getMergePrompt(locale?: Locale): string {
  const loc = locale || getLocale();
  return (loc === "en" ? en : zh).prompts.mergePrompt;
}

export function getReportPrompt(locale?: Locale): string {
  const loc = locale || getLocale();
  return (loc === "en" ? en : zh).prompts.reportPrompt;
}
