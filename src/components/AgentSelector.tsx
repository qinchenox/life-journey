"use client";

import { AGENTS, DEFAULT_AGENT_ID } from "@/lib/agents";
import { t } from "@/i18n";

interface AgentSelectorProps {
  value: string;
  onChange: (id: string) => void;
  compact?: boolean;
}

export function AgentSelector({ value, onChange, compact }: AgentSelectorProps) {
  const current = AGENTS.find((a) => a.id === value) || AGENTS[4];

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-neutral-400">{t("edit.agentSelector.label")}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm border border-neutral-200 rounded-lg px-2 py-1 bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          {AGENTS.map((a) => (
            <option key={a.id} value={a.id}>
              {a.icon} {t(`agents.${a.id}.name`)}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-neutral-400 font-medium">{t("edit.agentSelector.label")}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {AGENTS.map((a) => (
          <button
            key={a.id}
            onClick={() => onChange(a.id)}
            className={`text-left p-3 rounded-lg border-2 transition-all text-sm ${
              value === a.id
                ? "border-accent bg-accent/5 shadow-sm"
                : "border-neutral-200 hover:border-neutral-300"
            }`}
          >
            <div className="text-xl mb-1">{a.icon}</div>
            <div className="font-medium text-neutral-800 text-xs">{t(`agents.${a.id}.name`)}</div>
            <div className="text-xs text-neutral-400 mt-0.5 leading-tight">{t(`agents.${a.id}.description`)}</div>
          </button>
        ))}
      </div>
      {current && (
        <p className="text-xs text-neutral-400 leading-relaxed pt-1">
          {t("edit.agentSelector.suitable")}：{t(`agents.${current.id}.suitable`)}
        </p>
      )}
    </div>
  );
}
