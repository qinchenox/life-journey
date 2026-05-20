import { zh } from "./zh";
import { en } from "./en";

export type Locale = "zh" | "en";

function getLocale(): Locale {
  return (process.env.NEXT_PUBLIC_LOCALE as Locale) || "zh";
}

export function serverT(key: string, locale?: Locale): string {
  const loc = locale || getLocale();
  const dict = loc === "en" ? en : zh;
  let value: unknown = dict;
  for (const part of key.split(".")) {
    value = (value as Record<string, unknown>)?.[part];
    if (value === undefined) break;
  }
  return typeof value === "string" ? value : key;
}

// Re-export prompts for convenience
export { getAgentPrompt, getMergePrompt, getReportPrompt } from "./prompts";
