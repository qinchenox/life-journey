import { getAgentPrompt } from "@/i18n/prompts";
import { serverT } from "@/i18n/server";

export interface AgentProfile {
  id: string;
  name: string;
  icon: string;
  description: string;
  suitable: string;
  systemPrompt: string;
}

function agentName(id: string): string {
  const map: Record<string, string> = {
    "tech-geek": "agents.techGeek.name",
    "creative-master": "agents.creativeMaster.name",
    "business-elite": "agents.businessElite.name",
    "academic-rigor": "agents.academicRigor.name",
    "general-allround": "agents.generalAllround.name",
  };
  return map[id] || map["general-allround"];
}

function agentDesc(id: string): string {
  const map: Record<string, string> = {
    "tech-geek": "agents.techGeek.description",
    "creative-master": "agents.creativeMaster.description",
    "business-elite": "agents.businessElite.description",
    "academic-rigor": "agents.academicRigor.description",
    "general-allround": "agents.generalAllround.description",
  };
  return map[id] || map["general-allround"];
}

function agentSuitable(id: string): string {
  const map: Record<string, string> = {
    "tech-geek": "agents.techGeek.suitable",
    "creative-master": "agents.creativeMaster.suitable",
    "business-elite": "agents.businessElite.suitable",
    "academic-rigor": "agents.academicRigor.suitable",
    "general-allround": "agents.generalAllround.suitable",
  };
  return map[id] || map["general-allround"];
}

export const AGENTS: AgentProfile[] = [
  {
    id: "tech-geek",
    name: serverT(agentName("tech-geek")),
    icon: "💻",
    description: serverT(agentDesc("tech-geek")),
    suitable: serverT(agentSuitable("tech-geek")),
    systemPrompt: getAgentPrompt("tech-geek"),
  },
  {
    id: "creative-master",
    name: serverT(agentName("creative-master")),
    icon: "🎨",
    description: serverT(agentDesc("creative-master")),
    suitable: serverT(agentSuitable("creative-master")),
    systemPrompt: getAgentPrompt("creative-master"),
  },
  {
    id: "business-elite",
    name: serverT(agentName("business-elite")),
    icon: "💼",
    description: serverT(agentDesc("business-elite")),
    suitable: serverT(agentSuitable("business-elite")),
    systemPrompt: getAgentPrompt("business-elite"),
  },
  {
    id: "academic-rigor",
    name: serverT(agentName("academic-rigor")),
    icon: "📚",
    description: serverT(agentDesc("academic-rigor")),
    suitable: serverT(agentSuitable("academic-rigor")),
    systemPrompt: getAgentPrompt("academic-rigor"),
  },
  {
    id: "general-allround",
    name: serverT(agentName("general-allround")),
    icon: "⭐",
    description: serverT(agentDesc("general-allround")),
    suitable: serverT(agentSuitable("general-allround")),
    systemPrompt: getAgentPrompt("general-allround"),
  },
];

export function getAgent(id: string): AgentProfile {
  return AGENTS.find((a) => a.id === id) || AGENTS[4];
}

export const DEFAULT_AGENT_ID = "general-allround";
