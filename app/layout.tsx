import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { SearchModal } from "@/components/layout/SearchModal";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { getNavigation } from "@/lib/navigation";
import { getSearchIndex } from "@/lib/search";

export const metadata: Metadata = {
  title: {
    default: "DevBrain — Omar's Knowledge Base",
    template: "%s | DevBrain",
  },
  description: "My personal engineering reference.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = getNavigation();
  const searchIndex = getSearchIndex();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen">
            <Sidebar navigation={navigation} />
            <div className="flex-1 min-w-0 overflow-x-hidden">
              <main className="px-10 py-10 max-w-8xl">
                {children}
              </main>
            </div>
          </div>
          <SearchModal searchIndex={searchIndex} />
        </ThemeProvider>
      </body>
    </html>
  );
}