"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";

type Heading = {
  id: string;
  text: string;
  level: number;
};

function extractHeadings(content: string): Heading[] {
  const lines = content.split("\n");
  const headings: Heading[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ id, text, level });
    }
  }

  return headings;
}

export function TableOfContents({ content }: { content: string }) {
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-8">
      <p className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
        On this page
      </p>
      <ul className="space-y-0.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={clsx(
                "block text-[12px] py-0.5 leading-snug transition-colors border-l-2",
                h.level === 3 ? "pl-3" : "pl-2",
                activeId === h.id
                  ? "text-blue-600 dark:text-blue-400 border-blue-500"
                  : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 border-transparent"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}