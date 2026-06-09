import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <p className="text-6xl mb-4">📭</p>
      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-neutral-500 mb-6">
        This page doesn't exist yet — maybe it's time to write it!
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}