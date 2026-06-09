import type { MDXComponents } from "mdx/types";

// ── Callout ──────────────────────────────────────────────────────────────────

function Callout({
  type = "tip",
  children,
}: {
  type?: "tip" | "warning" | "danger" | "note";
  children: React.ReactNode;
}) {
  const styles = {
    tip:     "bg-green-50 border-green-400 text-green-900 dark:bg-green-950 dark:text-green-200",
    warning: "bg-amber-50 border-amber-400 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
    danger:  "bg-red-50 border-red-400 text-red-900 dark:bg-red-950 dark:text-red-200",
    note:    "bg-blue-50 border-blue-400 text-blue-900 dark:bg-blue-950 dark:text-blue-200",
  };
  const icons = { tip: "💡", warning: "⚠️", danger: "🚨", note: "📝" };

  return (
    <div className={`border-l-4 px-4 py-3 rounded-r-lg my-6 text-sm leading-relaxed ${styles[type]}`}>
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
}

// ── MyNotes ──────────────────────────────────────────────────────────────────

function MyNotes({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-300 dark:border-yellow-700 rounded-xl px-5 py-4 my-6">
      <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-2 uppercase tracking-wide">
        🖊️ My notes
      </p>
      <div className="text-sm text-yellow-900 dark:text-yellow-200 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// ── InterviewQ ───────────────────────────────────────────────────────────────

function InterviewQ({
  question,
  difficulty = "mid",
  children,
}: {
  question: string;
  difficulty?: "easy" | "mid" | "hard";
  children: React.ReactNode;
}) {
  const diffColors = {
    easy: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    mid:  "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    hard: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <details className="border border-neutral-200 dark:border-neutral-800 rounded-xl my-3 overflow-hidden">
      <summary className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors list-none select-none">
        <span className="text-sm font-medium">{question}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-3 shrink-0 ${diffColors[difficulty]}`}>
          {difficulty}
        </span>
      </summary>
      <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {children}
      </div>
    </details>
  );
}

// ── WrongRight ───────────────────────────────────────────────────────────────
// Usage in MDX:
//
// <WrongRight>
// <Wrong>
// ```ts
// bad code here
// ```
// </Wrong>
// <Right>
// ```ts
// good code here
// ```
// </Right>
// </WrongRight>

function Wrong({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border border-red-200 dark:border-red-900">
      <div className="bg-red-100 dark:bg-red-950 px-4 py-2 text-xs font-semibold text-red-700 dark:text-red-400">
        ❌ Wrong
      </div>
      <div className="[&>pre]:!m-0 [&>pre]:rounded-none [&>pre]:border-none">
        {children}
      </div>
    </div>
  );
}

function Right({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border border-green-200 dark:border-green-900">
      <div className="bg-green-100 dark:bg-green-950 px-4 py-2 text-xs font-semibold text-green-700 dark:text-green-400">
        ✅ Correct
      </div>
      <div className="[&>pre]:!m-0 [&>pre]:rounded-none [&>pre]:border-none">
        {children}
      </div>
    </div>
  );
}

function WrongRight({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
      {children}
    </div>
  );
}

// ── Headings with anchor IDs ──────────────────────────────────────────────────

function makeId(text: React.ReactNode): string {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

// ── Export ───────────────────────────────────────────────────────────────────

export const mdxComponents: MDXComponents = {
  // Headings
  h2: ({ children }) => (
    <h2 id={makeId(children)} className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={makeId(children)} className="text-lg font-semibold mt-8 mb-3 scroll-mt-20">
      {children}
    </h3>
  ),

  // Inline code ONLY — do NOT override pre/code for fenced blocks
  // rehype-pretty-code handles fenced blocks, we only style inline `code`
  code: ({ children, className, ...props }) => {
    // If className exists it means rehype-pretty-code already handled it
    // Leave it alone so syntax highlighting works
    if (className) {
      return <code className={className} {...props}>{children}</code>;
    }
    // Inline code only
    return (
      <code
        className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },

  // Custom components available in every MDX file
  Callout,
  MyNotes,
  InterviewQ,
  WrongRight,
  Wrong,
  Right,
};