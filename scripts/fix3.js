const fs = require('fs');

const content = `"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, ChevronRight, User, Newspaper, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Header({ settings, categories = [] }: { settings?: any, categories?: {name: string, slug: string}[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = \`/search?q=\${encodeURIComponent(query.trim())}\`;
    }
  };

  const headerStyle = settings?.headerStyle || "default";

  // Static links requested
  const staticLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ];
  
  return (
    <header
      className={\`sticky top-0 z-50 transition-all duration-300 bg-white \${
        scrolled ? "shadow-sm border-b border-gray-200" : "border-b border-gray-100"
      }\`}
    >
      <div className="container-blog">
        <div className={\`flex items-center h-20 \${headerStyle === 'centered' ? 'justify-between lg:grid lg:grid-cols-3' : 'justify-between'}\`}>
          
          {/* Logo */}
          <Link href="/" className={\`flex items-center gap-3 \${headerStyle === 'centered' ? 'lg:justify-center col-span-1' : ''}\`}>
            {settings?.logoUrl ? (
              <Image src={settings.logoUrl} alt={settings?.siteName || "Logo"} width={140} height={40} className="object-contain h-10 w-auto" />
            ) : (
              <>
                <div className="w-10 h-10 bg-[#1a2b3c] rounded-[0.25rem] flex items-center justify-center">
                  <Newspaper className="w-5 h-5 text-white" />
                </div>
                <span className="serif-headline text-2xl text-[#1a2b3c] font-bold">{settings?.siteName || "AutoBlog"}</span>
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {staticLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] font-bold uppercase tracking-widest text-slate-700 hover:text-[#1a2b3c] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Blogs Dropdown */}
            <div className="relative group" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-[#1a2b3c] hover:text-[#1a2b3c]/80 transition-colors focus:outline-none py-2"
              >
                Blogs
                <ChevronDown className={\`w-4 h-4 transition-transform \${dropdownOpen ? 'rotate-180' : ''}\`} />
              </button>
              
              {/* Dropdown Menu */}
              <div 
                className={\`absolute top-full left-0 mt-2 w-64 bg-white border border-slate-100 rounded-xl shadow-xl transition-all duration-200 transform origin-top z-50 \${dropdownOpen ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-2'}\`}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="py-2 max-h-[60vh] overflow-y-auto hide-scrollbar flex flex-col">
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link 
                        key={cat.slug} 
                        href={\`/category/\${cat.slug}\`}
                        className="px-5 py-3 text-sm font-medium text-slate-600 hover:text-[#1a2b3c] hover:bg-slate-50 transition-colors block w-full text-left"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-5 py-3 text-sm text-slate-400 italic">No categories available</div>
                  )}
                </div>
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 xl:gap-5">
            
            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-[0.35rem] px-3 py-2 transition-all hover:bg-white hover:border-slate-300 focus-within:bg-white focus-within:border-[#1a2b3c] focus-within:ring-1 focus-within:ring-[#1a2b3c]/20">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent text-sm w-32 xl:w-48 focus:w-64 transition-all outline-none placeholder:text-slate-400 text-slate-700 font-medium"
                />
              </form>
            </div>

            {/* Mobile search toggle */}
            <button
              onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }}
              className="md:hidden p-2 text-slate-500 hover:text-[#1a2b3c] transition-colors"
              aria-label="Search"
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            <Link
              href="/admin"
              className="hidden sm:flex items-center justify-center p-2 text-slate-400 hover:text-[#1a2b3c] transition-colors shrink-0"
              aria-label="Admin"
              title="Dashboard"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}
              className="lg:hidden p-2 text-slate-500 hover:text-[#1a2b3c] transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Expanded Mobile Search */}
        {searchOpen && (
          <div className="md:hidden py-4 animate-scale-in border-t border-slate-100">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 text-base font-medium bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2b3c]/20 focus:border-[#1a2b3c] transition-colors"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 text-sm font-bold tracking-wide text-white bg-[#1a2b3c] hover:bg-[#2a3f54] rounded-lg transition-colors"
              >
                Go
              </button>
            </form>
          </div>
        )}

        {/* Mobile Nav Menu */}
        {menuOpen && (
          <nav className="lg:hidden py-4 animate-slide-up border-t border-slate-100 max-h-[75vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {staticLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-[13px] font-bold uppercase tracking-widest text-slate-700 hover:text-[#1a2b3c] hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>
              ))}
              
              <div className="px-4 py-3 border-t border-slate-100 mt-2 pt-4">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 ml-2">Blog Categories</h4>
                 <div className="grid grid-cols-1 gap-1">
                    {categories && categories.length > 0 ? (
                      categories.map((cat) => (
                        <Link 
                          key={cat.slug} 
                          href={\`/category/\${cat.slug}\`}
                          className="px-3 py-3 text-[14px] font-medium text-slate-600 hover:text-[#1a2b3c] hover:bg-slate-50 rounded-lg transition-colors"
                          onClick={() => setMenuOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      ))
                    ) : null}
                 </div>
              </div>
            </div>
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 mt-6 mx-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#1a2b3c] rounded-[0.25rem] hover:bg-[#2a3f54] transition-colors"
            >
              Dashboard
              <User className="w-4 h-4" />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
`;

fs.writeFileSync('src/components/Header.tsx', content, 'utf8');
