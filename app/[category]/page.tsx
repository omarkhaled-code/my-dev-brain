import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllDocs } from "@/lib/docs";
import { clsx } from "clsx";

type Props = {
  params: Promise<{ category: string }>;
};

const categoryMeta: Record<string, { label: string; emoji: string; desc: string }> = {
  "ui-patterns":      { label: "UI Patterns",        emoji: "🎨", desc: "Reusable UI solutions — Navbar, Modal, Sidebar, Table, Pagination and more." },
  "forms-validation": { label: "Forms & Validation",  emoji: "📋", desc: "Form handling and validation with Zod, React Hook Form, VeeValidate, and Livewire." },
  "authentication":   { label: "Authentication",      emoji: "🔐", desc: "Auth systems across different stacks — NextAuth, Nuxt Auth, Laravel Sanctum, JWT." },
  "state-management": { label: "State Management",    emoji: "🗃️", desc: "Client and server state with Pinia, Zustand, and more." },
  "api-integration":  { label: "API Integration",     emoji: "🔌", desc: "Consuming APIs with Axios, Fetch, handling errors and loading states." },
  "database":         { label: "Database",            emoji: "🗄️", desc: "MySQL, PostgreSQL, Redis, SQLite — queries, relations, migrations." },
  "laravel":          { label: "Laravel",             emoji: "⚡", desc: "Eloquent, Sanctum, Queues, Policies, Artisan commands." },
  "inertia":          { label: "Inertia.js",          emoji: "🌉", desc: "Laravel + Vue/React with Inertia — forms, auth, SSR." },
  "livewire":         { label: "Livewire",            emoji: "🔴", desc: "Full-stack Laravel components with Livewire and Alpine.js." },
  "typescript":       { label: "TypeScript",          emoji: "🔷", desc: "Types, Generics, Zod schemas, Utility types." },
  "performance":      { label: "Performance",         emoji: "🚀", desc: "Lazy loading, caching, bundle size, Core Web Vitals." },
  "devops":           { label: "DevOps",              emoji: "🐳", desc: "Docker, CI/CD, Nginx, deployment strategies." },
  "system-design":    { label: "System Design",       emoji: "🏗️", desc: "Architecture patterns, scalability, system thinking." },
  "interviews":       { label: "Interviews",          emoji: "🎯", desc: "Interview questions and answers organized by topic." },
};

const difficultyStyles = {
  beginner:     "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  advanced:     "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

const statusStyles = {
  complete:       "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  draft:          "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
  "needs-update": "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
};

const toolColors: Record<string, string> = {
  nextjs:     "bg-black text-white",
  react:      "bg-blue-100 text-blue-700",
  nuxt:       "bg-green-100 text-green-700",
  vue:        "bg-emerald-100 text-emerald-700",
  laravel:    "bg-red-100 text-red-700",
  inertia:    "bg-purple-100 text-purple-700",
  livewire:   "bg-pink-100 text-pink-700",
  alpine:     "bg-cyan-100 text-cyan-700",
  zod:        "bg-orange-100 text-orange-700",
  typescript: "bg-blue-100 text-blue-800",
  tailwind:   "bg-teal-100 text-teal-700",
  pinia:       "bg-green-100 text-green-700",
  zustand:     "bg-purple-100 text-purple-700",
  axios:       "bg-blue-100 text-blue-700",
  fetch:       "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  mysql:       "bg-blue-100 text-blue-700",
  postgresql:  "bg-blue-100 text-blue-700",
  redis:       "bg-red-100 text-red-700",
  sqlite:      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

export async function generateStaticParams() {
  const docs = getAllDocs();
  const categories = [...new Set(docs.map((d) => d.categoryFromPath))];
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const meta = categoryMeta[category];
  if (!meta) return {};
  return {
    title: meta.label,
    description: meta.desc,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const allDocs = getAllDocs();
  const docs = allDocs.filter((d) => d.categoryFromPath === category);

  if (docs.length === 0) notFound();

  const meta = categoryMeta[category] ?? {
    label: category,
    emoji: "📄",
    desc: "",
  };

  const complete = docs.filter((d) => d.status === "complete").length;
  const draft = docs.filter((d) => d.status === "draft").length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{meta.emoji}</span>
          <h1 className="text-3xl font-bold tracking-tight">{meta.label}</h1>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
          {meta.desc}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-4 text-sm text-neutral-400">
          <span>{docs.length} {docs.length === 1 ? "page" : "pages"}</span>
          <span>·</span>
          <span className="text-green-600 dark:text-green-400">{complete} complete</span>
          <span>·</span>
          <span className="text-amber-500">{draft} draft</span>
        </div>
      </div>

      {/* Doc cards */}
      <div className="grid grid-cols-1 gap-3">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            href={doc.url}
            className="group flex items-start gap-4 p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-sm transition-all"
          >
            {/* Left */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {doc.title}
                </h2>
              </div>

              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3">
                {doc.description}
              </p>

              {/* Tools */}
              {doc.tools.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {doc.tools.map((tool) => (
                    <span
                      key={tool}
                      className={clsx(
                        "text-[11px] px-2 py-0.5 rounded-full font-medium",
                        toolColors[tool] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                      )}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right — badges */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className={clsx(
                "text-[11px] px-2.5 py-1 rounded-full font-medium capitalize",
                difficultyStyles[doc.difficulty ?? "intermediate"]
              )}>
                {doc.difficulty}
              </span>
              <span className={clsx(
                "text-[11px] px-2.5 py-1 rounded-full font-medium capitalize",
                statusStyles[doc.status ?? "draft"]
              )}>
                {doc.status}
              </span>
              {doc.lastUpdated && (
                <span className="text-[11px] text-neutral-400">
                  {new Date(doc.lastUpdated).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}