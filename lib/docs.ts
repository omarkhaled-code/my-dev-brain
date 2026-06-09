import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type DocFrontmatter = {
  title: string;
  description: string;
  category: string;
  tools: string[];
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  status: "draft" | "complete" | "needs-update";
  lastUpdated?: string;
};



export type Doc = DocFrontmatter & {
  slug: string;          // e.g. authentication/auth-nextauth
  url: string;           // e.g. /authentication/auth-nextauth
  categoryFromPath: string;
  content: string;       // raw MDX string
};

// Read one MDX file by its slug
export function getDocBySlug(slug: string): Doc | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as DocFrontmatter;

  return {
    ...frontmatter,
    tools: frontmatter.tools ?? [],
    tags: frontmatter.tags ?? [],
    slug,
    url: `/${slug}`,
    categoryFromPath: slug.split("/")[0],
    content,
  };
}

// Get all docs (for sidebar + search index)
export function getAllDocs(): Doc[] {
  const docs: Doc[] = [];
  readDirRecursive(CONTENT_DIR, CONTENT_DIR, docs);
  return docs;
}

function readDirRecursive(base: string, dir: string, docs: Doc[]) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      readDirRecursive(base, fullPath, docs);
    } else if (entry.name.endsWith(".mdx")) {
      const relativePath = path.relative(base, fullPath);
      const slug = relativePath.replace(/\\/g, "/").replace(/\.mdx$/, "");
      const doc = getDocBySlug(slug);
      if (doc) docs.push(doc);
    }
  }
}

// Get all unique category slugs (for generateStaticParams)
export function getAllCategories(): string[] {
  const docs = getAllDocs();
  return [...new Set(docs.map((d) => d.categoryFromPath))];
}