import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // بنعرف Next.js إنه يقبل ملفات الـ mdx كـ صفحات لو احتاجنا
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],

  // قفلنا الـ mdxRs عشان نسمح لـ rehype-pretty-code إنه يشتغل ويلون الكود
  experimental: {},
  
  // تقدر تسيب turbopack لو بتستخدمه في الـ dev عادي
  turbopack: {},
};

export default nextConfig;