import Link from "next/link";
import { getAllDocs } from "@/lib/docs";

const categories = [
  { slug: "ui-patterns", label: "UI Patterns", emoji: "🎨", desc: "Navbar, Modal, Sidebar, Table, Pagination" },
  { slug: "forms-validation", label: "Forms & Validation", emoji: "📋", desc: "Zod, React Hook Form, VeeValidate, Livewire" },
  { slug: "authentication", label: "Authentication", emoji: "🔐", desc: "NextAuth, Nuxt Auth, Laravel Sanctum, JWT" },
  { slug: "state-management", label: "State Management", emoji: "🗃️", desc: "Pinia, Zustand, Server state, Cache" },
  { slug: "api-integration", label: "API Integration", emoji: "🔌", desc: "Axios, Fetch, Error handling, Loading states" },
  { slug: "routing", label: "Routing", emoji: "🧭", desc: "Next.js Routes, Nuxt.js Routes, Nested Routes, Dynamic Routes, Middleware" },
  { slug: "database", label: "Database", emoji: "🗄️", desc: "MySQL, PostgreSQL, Redis, SQLite, Migrations" },
  { slug: "laravel", label: "Laravel", emoji: "⚡", desc: "Eloquent, Sanctum, Queues, Policies, Artisan" },
  { slug: "typescript", label: "TypeScript", emoji: "🔷", desc: "Types, Generics, Zod schemas, Utility types" },
  { slug: "performance", label: "Performance", emoji: "🚀", desc: "Lazy loading, Caching, Bundle size, Core Web Vitals" },
  { slug: "devops", label: "DevOps", emoji: "🐳", desc: "Docker, CI/CD, Nginx, Deployment" },
  { slug: "system-design", label: "System Design", emoji: "🏗️", desc: "Architecture, Patterns, Scalability" },
  { slug: "interviews", label: "Interviews", emoji: "🎯", desc: "Questions, Answers, Tips per topic" },
];

export default function Home() {
  const allDocs = getAllDocs();
  const totalDocs = allDocs.length;
  const completeDocs = allDocs.filter((d) => d.status === "complete").length;
  const draftDocs = allDocs.filter((d) => d.status === "draft").length;

  // Get the 5 most recently updated docs
  const recentDocs = [...allDocs]
    .filter((d) => d.lastUpdated)
    .sort((a, b) =>
      new Date(b.lastUpdated!).getTime() - new Date(a.lastUpdated!).getTime()
    )
    .slice(0, 5);

  return (
    <div className="max-w-5xl">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          🧠 DevBrain
        </h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl">
          My personal reference as a software engineer — every problem I solved, every pattern I used, everything I will need in the future.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
          <p className="text-2xl font-bold">{totalDocs}</p>
          <p className="text-sm text-neutral-500 mt-1">Total pages</p>
        </div>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-green-600">{completeDocs}</p>
          <p className="text-sm text-neutral-500 mt-1">Complete</p>
        </div>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-500">{draftDocs}</p>
          <p className="text-sm text-neutral-500 mt-1">In progress</p>
        </div>
      </div>

      {/* Recently updated */}
      {recentDocs.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
            Recently updated
          </h2>
          <div className="space-y-2">
            {recentDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={doc.url}
                className="flex items-center justify-between px-4 py-3 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-400 dark:hover:border-blue-600 transition-colors group"
              >
                <div>
                  <span className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {doc.title}
                  </span>
                  <span className="text-xs text-neutral-400 ml-3">
                    {doc.categoryFromPath}
                  </span>
                </div>
                <span className="text-xs text-neutral-400">
                  {new Date(doc.lastUpdated!).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Category grid */}
      <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
        Browse by topic
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const count = allDocs.filter(
            (d) => d.categoryFromPath === cat.slug
          ).length;

          return (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                  {count} {count === 1 ? "page" : "pages"}
                </span>
              </div>
              <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                {cat.label}
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {cat.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}