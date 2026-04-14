import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="animate-fade-in">
      <div className="container-blog py-20 lg:py-32 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c] mb-4">Error 404</p>
        <h1 className="serif-headline text-4xl lg:text-5xl mb-4">Page Not Found</h1>
        <p className="text-gray-500 max-w-md mx-auto mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Try browsing our latest articles instead.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white bg-[#1a2b3c] hover:bg-[#2a3f54] rounded-[0.125rem] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-gray-600 border border-gray-200 hover:border-[#1a2b3c] hover:text-[#1a2b3c] rounded-[0.125rem] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
