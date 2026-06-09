import type { Doc } from "@/lib/docs";
import { clsx } from "clsx";
import { Breadcrumb } from "./Breadcrumb";

const difficultyStyles = {
  beginner:     "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  advanced:     "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

const statusStyles = {
  complete:      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  draft:         "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
  "needs-update": "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
};

const toolColors: Record<string, string> = {
  nextjs:     "bg-black text-white dark:bg-white dark:text-black",
  react:      "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  nuxt:       "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  vue:        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  laravel:    "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  inertia:    "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  livewire:   "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
  alpine:     "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
  zod:        "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  typescript: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  tailwind:   "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
  shadcn:     "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
};

type Props = { doc: Doc };

export function DocHeader({ doc }: Props) {
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8">

      {/* Breadcrumb */}
      <Breadcrumb category={doc.categoryFromPath} title={doc.title} />

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight mb-3">{doc.title}</h1>

      {/* Description */}
      <p className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed mb-5">
        {doc.description}
      </p>

      {/* Badges row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={clsx(
          "text-xs font-medium px-2.5 py-1 rounded-full",
          difficultyStyles[doc.difficulty ?? "intermediate"]
        )}>
          {doc.difficulty}
        </span>

        <span className={clsx(
          "text-xs font-medium px-2.5 py-1 rounded-full",
          statusStyles[doc.status ?? "draft"]
        )}>
          {doc.status}
        </span>

        {doc.tools.length > 0 && (
          <span className="text-neutral-300 dark:text-neutral-700">|</span>
        )}

        {doc.tools.map((tool) => (
          <span
            key={tool}
            className={clsx(
              "text-xs font-medium px-2.5 py-1 rounded-full",
              toolColors[tool] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
            )}
          >
            {tool}
          </span>
        ))}

        {doc.lastUpdated && (
          <>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <span className="text-xs text-neutral-400">
              Updated{" "}
              {new Date(doc.lastUpdated).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </>
        )}
      </div>

      {doc.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {doc.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}