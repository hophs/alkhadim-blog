export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "...";
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

export function generateExcerpt(content: string, length = 160): string {
  const text = stripHtml(content);
  return truncate(sanitizeApiText(text), length);
}

// Remove common API artifacts from text (truncation markers, source prefixes, etc.)
export function sanitizeApiText(text: string): string {
  if (!text) return "";
  return text
    .replace(/\.{3,}\s*\[\+\d+\s*chars?\]/gi, "")
    .replace(/…\s*\[\+\d+\s*chars?\]/gi, "")
    .replace(/\[\+\d+\s*chars?\]/gi, "")
    .replace(/\[Removed\]/gi, "")
    .replace(/\(Source:\s*https?:\/\/[^)]+\)\s*/gi, "")
    .trim();
}
