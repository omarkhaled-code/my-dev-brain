import Link from "next/link";
import { getAllDocs } from "@/lib/docs";
import { clsx } from "clsx";

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
};

const difficultyStyles = {
  beginner:     "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  advanced:     "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

type Props = {
  relatedTopics: string[];  // slugs from frontmatter
  currentSlug: string;
};

export function RelatedTopics({ relatedTopics, currentSlug }: Props) {
  if (!relatedTopics || relatedTopics.length === 0) return null;

  const allDocs = getAllDocs();

  // Match related topics — support both full slug and partial name match
  const related = relatedTopics
    .map((topic) =>
      allDocs.find(
        (d) =>
          d.slug === topic ||
          d.slug.endsWith(topic) ||
          d.slugAsParams === topic
      )
    )
    .filter(Boolean)
    .filter((d) => d!.slug !== currentSlug);

  if (related.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
        Related topics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((doc) => (
          <Link
            key={doc!.slug}
            href={doc!.url}
            className="group flex flex-col gap-2 p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-sm transition-all"
          >
            {/* Title */}
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
              {doc!.title}
            </p>

            {/* Description */}
            <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
              {doc!.description}
            </p>

            {/* Footer row */}
            <div className="flex items-center gap-1.5 flex-wrap mt-auto pt-1">
              {/* Tools */}
              {doc!.tools.slice(0, 3).map((tool) => (
                <span
                  key={tool}
                  className={clsx(
                    "text-[10px] px-1.5 py-0.5 rounded font-medium",
                    toolColors[tool] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                  )}
                >
                  {tool}
                </span>
              ))}

              {/* Difficulty */}
              <span className={clsx(
                "text-[10px] px-1.5 py-0.5 rounded-full font-medium ml-auto capitalize",
                difficultyStyles[doc!.difficulty ?? "intermediate"]
              )}>
                {doc!.difficulty}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}