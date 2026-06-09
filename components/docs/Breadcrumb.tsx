import Link from "next/link";

const categoryLabels: Record<string, string> = {
  "ui-patterns":      "UI Patterns",
  "forms-validation": "Forms & Validation",
  "authentication":   "Authentication",
  "state-management": "State Management",
  "api-integration":  "API Integration",
  "routing":          "Routing",
  "database":         "Database",
  "laravel":          "Laravel",
  "typescript":       "TypeScript",
  "performance":      "Performance",
  "devops":           "DevOps",
  "system-design":    "System Design",
  "interviews":       "Interviews",
};

type Props = {
  category: string;   // e.g. "authentication"
  title: string;      // e.g. "Social Login with NextAuth.js"
};

export function Breadcrumb({ category, title }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-neutral-400 dark:text-neutral-500 mb-6 flex-wrap"
    >
      {/* Home */}
      <Link
        href="/"
        className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
      >
        Home
      </Link>

      <span>/</span>

      {/* Category */}
      <Link
        href={`/${category}`}
        className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors capitalize"
      >
        {categoryLabels[category] ?? category.replace(/-/g, " ")}
      </Link>

      <span>/</span>

      {/* Current page — not a link */}
      <span className="text-blue-600 dark:text-blue-300 font-medium truncate max-w-xs">
        {title}
      </span>
    </nav>
  );
}