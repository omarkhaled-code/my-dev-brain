"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { NavSection } from "@/lib/navigation";
import { SearchTrigger } from "@/components/layout/SearchTrigger";
import { ThemeToggle } from "./ThemeToggle";


// Tool badge colors
const toolColors: Record<string, string> = {
  nextjs: "bg-black text-white",
  react: "bg-blue-100 text-blue-700",
  nuxt: "bg-green-100 text-green-700",
  vue: "bg-emerald-100 text-emerald-700",
  laravel: "bg-red-100 text-red-700",
  inertia: "bg-purple-100 text-purple-700",
  livewire: "bg-pink-100 text-pink-700",
  alpine: "bg-cyan-100 text-cyan-700",
  zod: "bg-orange-100 text-orange-700",
  typescript: "bg-blue-100 text-blue-800",
};

type Props = {
  navigation: NavSection[];
};

export function Sidebar({ navigation }: Props) {
  const pathname = usePathname();

  // Auto-open the section that matches the current URL
  const activeCategory = pathname.split("/")[1];
  const [openSections, setOpenSections] = useState<string[]>(
    activeCategory ? [activeCategory] : [navigation[0]?.category]
  );

  const toggle = (category: string) => {
    setOpenSections((prev) =>
      prev.includes(category)
        ? prev.filter((s) => s !== category)
        : [...prev, category]
    );
  };

  return (
    <aside className="w-72 shrink-0 border-r border-neutral-200 dark:border-neutral-800 min-h-screen sticky top-0 h-screen overflow-y-auto flex flex-col">

      <div className="flex-1">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-neutral-200 dark:border-neutral-800">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">🧠 DevBrain</span>
          </Link>
          <p className="text-xs text-neutral-400 mt-1">Omar's engineering reference</p>
        </div>

        {/* Search hint */}
        <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <SearchTrigger />
        </div>

        {/* Dynamic nav */}
        <nav className="px-3 py-4 space-y-0.5">
          {navigation.map((section) => {
            const isOpen = openSections.includes(section.category);
            const isActive = pathname.startsWith(`/${section.category}`);

            return (
              <div key={section.category}>
                {/* Section toggle */}
                <button
                  onClick={() => toggle(section.category)}
                  className={clsx(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  )}
                >
                  <span>{section.label}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">
                      {section.items.length}
                    </span>
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform duration-200 text-neutral-400",
                        isOpen && "rotate-180"
                      )}
                    />
                  </span>
                </button>

                {/* Section pages */}
                {isOpen && (
                  <div className="mt-0.5 mb-1 ml-3 pl-3 border-l border-neutral-200 dark:border-neutral-700 space-y-0.5">
                    {section.items.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={clsx(
                            "flex flex-col gap-1 px-2 py-2 rounded-lg text-sm transition-colors",
                            active
                              ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                          )}
                        >
                          <span className="font-medium leading-tight">
                            {item.title}
                          </span>

                          {/* Tool badges */}
                          {item.tools.length > 0 && (
                            <span className="flex flex-wrap gap-1">
                              {item.tools.map((tool) => (
                                <span
                                  key={tool}
                                  className={clsx(
                                    "text-[10px] px-1.5 py-0.5 rounded font-medium",
                                    toolColors[tool] ?? "bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
                                  )}
                                >
                                  {tool}
                                </span>
                              ))}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
      <div className="px-3 py-4 border-t border-neutral-200 dark:border-neutral-800 mt-auto">
        <ThemeToggle />
      </div>
    </aside>
  );
}