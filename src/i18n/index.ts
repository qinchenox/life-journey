"use client";

import { createContext, useContext } from "react";
import { zh } from "./zh";
import { en } from "./en";

export type Locale = "zh" | "en";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dictionaries: Record<Locale, any> = { zh, en };

function getLocale(): Locale {
  if (typeof window === "undefined") return process.env.NEXT_PUBLIC_LOCALE as Locale || "zh";
  // Cookie override takes priority
  const cookie = document.cookie.match(/locale=([^;]+)/);
  if (cookie && (cookie[1] === "zh" || cookie[1] === "en")) return cookie[1];
  // Then env var
  const envLocale = process.env.NEXT_PUBLIC_LOCALE;
  if (envLocale === "zh" || envLocale === "en") return envLocale;
  return "zh";
}

export function setLocaleCookie(locale: Locale) {
  document.cookie = `locale=${locale};path=/;max-age=31536000;SameSite=Lax`;
}

export function useLocale() {
  return getLocale();
}

function rawT(key: string, dict: Record<string, unknown>): unknown {
  let value: unknown = dict;
  for (const part of key.split(".")) {
    value = (value as Record<string, unknown>)?.[part];
    if (value === undefined) return key;
  }
  return value;
}

export function t(key: string, replacements?: Record<string, string>): string {
  const locale = getLocale();
  const dict = dictionaries[locale];
  const value = rawT(key, dict);

  if (typeof value !== "string") return key;

  if (replacements) {
    return Object.entries(replacements).reduce(
      (acc, [k, v]) => acc.replaceAll(`{${k}}`, v),
      value
    );
  }
  return value;
}

/** Get a value from the dictionary by dot-separated key. Returns the raw type (string, array, object). */
export function tv(key: string) {
  const locale = getLocale();
  const dict = dictionaries[locale];
  return rawT(key, dict);
}

// Re-export server utilities for backward compatibility — prefer importing from "@/i18n/server" directly
export { serverT } from "./server";

// React Context for optional provider use
const LocaleContext = createContext<Locale>("zh");
export const LocaleProvider = LocaleContext.Provider;
export function useLocaleContext() {
  return useContext(LocaleContext);
}
