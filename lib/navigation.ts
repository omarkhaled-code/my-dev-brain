import { getAllDocs } from "@/lib/docs";

export type NavItem = {
  title: string;
  href: string;
  tools: string[];
  status: string;
};

export type NavSection = {
  category: string;
  label: string;
  items: NavItem[];
};

const categoryLabels: Record<string, string> = {
  "ui-patterns":      "UI Patterns",
  "forms-validation": "Forms & Validation",
  "authentication":   "Authentication",
  "state-management": "State Management",
  "api-integration":  "API Integration",
  "database":         "Database",
  "laravel":          "Laravel",
  "inertia":          "Inertia.js",
  "livewire":         "Livewire",
  "devops":           "DevOps",
  "typescript":       "TypeScript",
  "performance":      "Performance",
  "system-design":    "System Design",
  "interviews":       "Interviews",
};

const categoryOrder = [
  "ui-patterns",
  "forms-validation",
  "authentication",
  "state-management",
  "api-integration",
  "database",
  "laravel",
  "inertia",
  "livewire",
  "typescript",
  "performance",
  "devops",
  "system-design",
  "interviews",
];

export function getNavigation(): NavSection[] {
  const docs = getAllDocs();
  const grouped: Record<string, NavItem[]> = {};

  for (const doc of docs) {
    const category = doc.categoryFromPath;
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push({
      title: doc.title,
      href: doc.url,
      tools: doc.tools ?? [],
      status: doc.status ?? "draft",
    });
  }

  const sorted = Object.keys(grouped).sort((a, b) => {
    const ai = categoryOrder.indexOf(a);
    const bi = categoryOrder.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return sorted.map((category) => ({
    category,
    label: categoryLabels[category] ?? category,
    items: grouped[category].sort((a, b) => a.title.localeCompare(b.title)),
  }));
}