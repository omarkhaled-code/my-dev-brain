"use client";

import { useEffect, useState } from "react";

export function SearchTrigger() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  const handleClick = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
    >
      <span>🔍</span>
      <span>Search a problem...</span>
      <span className="ml-auto text-xs border border-neutral-300 dark:border-neutral-600 rounded px-1.5 py-0.5">
        {isMac ? "⌘K" : "Ctrl+K"}
      </span>
    </button>
  );
}