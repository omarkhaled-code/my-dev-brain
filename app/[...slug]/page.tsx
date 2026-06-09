import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllDocs, getDocBySlug } from "@/lib/docs";
import { mdxComponents } from "@/components/docs/mdx-components";
import { DocHeader } from "@/components/docs/DocHeader";
import { TableOfContents } from "@/components/docs/TableOfContents";
import { RelatedTopics } from "@/components/docs/RelatedTopics";
import { ReadingProgress } from "@/components/docs/ReadingProgress";

// بنستورد الـ Plugins عشان نشغل تلوين الكود والعناوين تلقائياً
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug.split("/"),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = getDocBySlug(slug.join("/"));
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
  };
}

// تجهيز الـ Options لتمريرها لـ MDXRemote
const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypePrettyCode,
      {
        theme: "one-dark-pro", // تقدر تغيره لـ github-dark أو night-owl زي ما تحب
        keepBackground: true,   // بيحافظ على خلفية الثيم الأصلي المتناسق مع الألوان
      },
    ],
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
      },
    ],
  ],
};

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDocBySlug(slug.join("/"));

  if (!doc) notFound();

  return (
    <div className="flex gap-8 relative">
      {/* Progress bar — fixed to top of viewport */}
      <ReadingProgress />

      {/* Main content — takes all remaining space */}
      <article className="flex-1 min-w-0 max-w-4xl">
        <DocHeader doc={doc} />
        {/* شيلنا الـ prose-pre:bg-neutral-900 عشان نسيب Shiki يلون الخلفية 
          بناءً على الثيم اللي اخترناه فوق وميحصلش تضارب.
        */}
        <div className="prose prose-neutral dark:prose-invert max-w-none mt-8
          prose-headings:font-semibold
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:rounded-xl
        ">
          <MDXRemote
            source={doc.content}
            components={mdxComponents}
            options={{ mdxOptions: mdxOptions as any }}
          />
        </div>
      </article>

      {/* Related topics — reads from frontmatter relatedTopics[] */}
      <RelatedTopics
        relatedTopics={doc.relatedTopics ?? []}
        currentSlug={doc.slug}
      />

      {/* TOC — fixed narrow width, only on very wide screens */}
      <aside className="w-44 shrink-0 hidden 2xl:block">
        <TableOfContents content={doc.content} />
      </aside>
    </div>
  );
}