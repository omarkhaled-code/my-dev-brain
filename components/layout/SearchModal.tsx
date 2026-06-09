"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import type { SearchItem } from "@/lib/search";
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

const categoryEmoji: Record<string, string> = {
  "ui-patterns":      "🎨",
  "forms-validation": "📋",
  "authentication":   "🔐",
  "state-management": "🗃️",
  "api-integration":  "🔌",
  "database":         "🗄️",
  "laravel":          "⚡",
  "inertia":          "🌉",
  "livewire":         "🔴",
  "typescript":       "🔷",
  "performance":      "🚀",
  "devops":           "🐳",
  "system-design":    "🏗️",
  "interviews":       "🎯",
};

type Props = {
  searchIndex: SearchItem[];
};

export function SearchModal({ searchIndex }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Open on ⌘K or Ctrl+K
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSelect = useCallback(
    (url: string) => {
      router.push(url);
      setOpen(false);
      setQuery("");
    },
    [router]
  );

  // Filter results based on query
  const results = query.trim() === ""
    ? searchIndex.slice(0, 8) // show recent when no query
    : searchIndex.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)) ||
          item.tools.some((t) => t.toLowerCase().includes(q)) ||
          item.category.toLowerCase().includes(q)
        );
      }).slice(0, 10);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4">
        <Command
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
          shouldFilter={false}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-neutral-400 text-lg">🔍</span>
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search a problem, tool, or topic..."
              className="flex-1 bg-transparent outline-none text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-neutral-400 hover:text-neutral-600 text-xs"
              >
                Clear
              </button>
            )}
            <kbd className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-500 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-96 overflow-y-auto py-2">
            {/* Empty state */}
            <Command.Empty className="px-4 py-8 text-center text-sm text-neutral-400">
              No results for "{query}"
            </Command.Empty>

            {/* Section label */}
            {results.length > 0 && (
              <div className="px-4 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                {query.trim() === "" ? "All pages" : `${results.length} result${results.length !== 1 ? "s" : ""}`}
              </div>
            )}

            {/* Results */}
            {results.map((item) => (
              <Command.Item
                key={item.url}
                value={item.url}
                onSelect={() => handleSelect(item.url)}
                className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors aria-selected:bg-neutral-50 dark:aria-selected:bg-neutral-800"
              >
                {/* Category emoji */}
                <span className="text-lg mt-0.5 shrink-0">
                  {categoryEmoji[item.category] ?? "📄"}
                </span>

                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                    {item.title}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-neutral-400 truncate mt-0.5">
                    {item.description}
                  </p>

                  {/* Tools + difficulty */}
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    {item.tools.map((tool) => (
                      <span
                        key={tool}
                        className={clsx(
                          "text-[10px] px-1.5 py-0.5 rounded font-medium",
                          toolColors[tool] ?? "bg-neutral-100 text-neutral-600"
                        )}
                      >
                        {tool}
                      </span>
                    ))}
                    <span className="text-[10px] text-neutral-400 capitalize">
                      · {item.category.replace(/-/g, " ")}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <span className="text-neutral-300 dark:text-neutral-600 mt-1 shrink-0">
                  →
                </span>
              </Command.Item>
            ))}
          </Command.List>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-4 text-[11px] text-neutral-400">
            <span><kbd className="font-mono">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono">↵</kbd> open</span>
            <span><kbd className="font-mono">ESC</kbd> close</span>
            <span className="ml-auto">⌘K to toggle</span>
          </div>
        </Command>
      </div>
    </>
  );
}