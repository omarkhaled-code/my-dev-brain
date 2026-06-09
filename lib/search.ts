import { getAllDocs } from "@/lib/docs";

export type SearchItem = {
  title: string;
  description: string;
  url: string;
  category: string;
  tools: string[];
  tags: string[];
  difficulty: string;
};

export function getSearchIndex(): SearchItem[] {
  const docs = getAllDocs();

  return docs.map((doc) => ({
    title: doc.title,
    description: doc.description,
    url: doc.url,
    category: doc.categoryFromPath,
    tools: doc.tools ?? [],
    tags: doc.tags ?? [],
    difficulty: doc.difficulty ?? "intermediate",
  }));
}