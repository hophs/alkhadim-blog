import { prisma } from "@/lib/prisma";
import { generateSlug, calculateReadTime, generateExcerpt } from "@/lib/utils";

interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string | null;
  source: { name: string };
  publishedAt: string;
}

interface ApiProvider {
  name: string;
  dailyLimit: number;
  fetch: (query: string, pageSize: number, apiKey: string) => Promise<NewsArticle[]>;
}

// Sub-topic keywords for war & international politics news
const topicQueries: Record<string, string> = {
  "war": "war OR armed conflict OR military operation OR invasion OR ceasefire OR battlefield",
  "international-politics": "international politics OR foreign policy OR United Nations OR G7 OR bilateral relations OR summit",
  "diplomacy": "diplomacy OR peace talks OR treaty OR negotiations OR ambassador OR sanctions",
  "military": "military OR defense OR army OR navy OR air force OR missile OR weapons",
  "geopolitics": "geopolitics OR territorial dispute OR NATO OR alliance OR border conflict OR annexation",
};

// Shorter queries for APIs that don't support long queries
const shortTopicQueries: Record<string, string> = {
  "war": "war conflict",
  "international-politics": "international politics",
  "diplomacy": "diplomacy peace talks",
  "military": "military defense",
  "geopolitics": "geopolitics NATO",
};

// --- API Provider Implementations ---

async function fetchFromGNews(query: string, pageSize: number, apiKey: string): Promise<NewsArticle[]> {
  const shortQuery = shortTopicQueries[query] || query;
  const res = await fetch(
    `https://gnews.io/api/v4/search?q=${encodeURIComponent(shortQuery)}&lang=en&max=${pageSize}&token=${encodeURIComponent(apiKey)}`,
    { next: { revalidate: 0 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.articles || []).map((a: { title: string; description: string; content: string; url: string; image: string | null; source: { name: string }; publishedAt: string }) => ({
    title: a.title,
    description: a.description || "",
    content: a.content || a.description || "",
    url: a.url,
    urlToImage: a.image || null,
    source: { name: a.source?.name || "GNews" },
    publishedAt: a.publishedAt,
  }));
}

async function fetchFromNewsApi(query: string, pageSize: number, apiKey: string): Promise<NewsArticle[]> {
  const fullQuery = topicQueries[query] || query;
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(fullQuery)}&language=en&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${encodeURIComponent(apiKey)}`,
    { next: { revalidate: 0 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.articles || [];
}

async function fetchFromCurrents(query: string, pageSize: number, apiKey: string): Promise<NewsArticle[]> {
  const shortQuery = shortTopicQueries[query] || query;
  const res = await fetch(
    `https://api.currentsapi.services/v1/search?keywords=${encodeURIComponent(shortQuery)}&language=en&apiKey=${encodeURIComponent(apiKey)}`,
    { next: { revalidate: 0 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.news || []).slice(0, pageSize).map((a: { title: string; description: string; url: string; image: string; author: string; published: string }) => ({
    title: a.title,
    description: a.description || "",
    content: a.description || "",
    url: a.url,
    urlToImage: a.image && a.image !== "None" ? a.image : null,
    source: { name: a.author || "Currents" },
    publishedAt: a.published,
  }));
}

async function fetchFromNewsData(query: string, pageSize: number, apiKey: string): Promise<NewsArticle[]> {
  const shortQuery = shortTopicQueries[query] || query;
  const res = await fetch(
    `https://newsdata.io/api/1/latest?apikey=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(shortQuery)}&language=en&size=${pageSize}`,
    { next: { revalidate: 0 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.results || []).map((a: { title: string; description: string; content: string; link: string; image_url: string | null; source_id: string; pubDate: string }) => ({
    title: a.title,
    description: a.description || "",
    content: a.content || a.description || "",
    url: a.link,
    urlToImage: a.image_url || null,
    source: { name: a.source_id || "NewsData" },
    publishedAt: a.pubDate,
  }));
}

async function fetchFromMediaStack(query: string, pageSize: number, apiKey: string): Promise<NewsArticle[]> {
  const shortQuery = shortTopicQueries[query] || query;
  const res = await fetch(
    `http://api.mediastack.com/v1/news?access_key=${encodeURIComponent(apiKey)}&keywords=${encodeURIComponent(shortQuery)}&languages=en&limit=${pageSize}`,
    { next: { revalidate: 0 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.data || []).map((a: { title: string; description: string; url: string; image: string | null; source: string; published_at: string }) => ({
    title: a.title,
    description: a.description || "",
    content: a.description || "",
    url: a.url,
    urlToImage: a.image || null,
    source: { name: a.source || "MediaStack" },
    publishedAt: a.published_at,
  }));
}

async function fetchFromTheNewsApi(query: string, pageSize: number, apiKey: string): Promise<NewsArticle[]> {
  const shortQuery = shortTopicQueries[query] || query;
  const res = await fetch(
    `https://api.thenewsapi.com/v1/news/all?api_token=${encodeURIComponent(apiKey)}&search=${encodeURIComponent(shortQuery)}&language=en&limit=${pageSize}`,
    { next: { revalidate: 0 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.data || []).map((a: { title: string; description: string; url: string; image_url: string | null; source: string; published_at: string; snippet: string }) => ({
    title: a.title,
    description: a.description || a.snippet || "",
    content: a.description || a.snippet || "",
    url: a.url,
    urlToImage: a.image_url || null,
    source: { name: a.source || "TheNewsAPI" },
    publishedAt: a.published_at,
  }));
}

// --- Content Cleaning & Filtering ---

export function cleanContent(text: string): string {
  if (!text) return "";
  let cleaned = text;

  // 1. Remove standard scraping truncation markers
  cleaned = cleaned.replace(/\.{3,}\s*\[\+\d+\s*chars?\]/gi, "");
  cleaned = cleaned.replace(/…\s*\[\+\d+\s*chars?\]/gi, "");
  cleaned = cleaned.replace(/\[\+\d+\s*chars?\]/gi, "");
  
  // 2. Remove common news artifacts and calls to action
  const artifacts = [
    "View image in fullscreen",
    "Read more",
    "Prefer the Guardian on Google",
    "Subscribe to our newsletter",
    "Click here to read",
    "Sign up for free",
    "Advertisement",
    "Supported by",
    "Follow us on",
    "Share this article",
    "Watch the video",
    /Photograph:.*?\n/gi, // e.g. Photograph: Robbie Stephenson/PA
    /Image credit:.*?\n/gi
  ];
  
  for (const artifact of artifacts) {
    if (typeof artifact === "string") {
      // Escape string for regex and remove it globally, case-insensitive
      const escaped = artifact.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      cleaned = cleaned.replace(new RegExp(escaped, 'gi'), "");
    } else {
      cleaned = cleaned.replace(artifact, "");
    }
  }
  
  // 3. Remove [Removed] placeholders and source links
  cleaned = cleaned.replace(/\[Removed\]/gi, "");
  cleaned = cleaned.replace(/\(Source:\s*https?:\/\/[^)]+\)\s*/gi, "");

  // 4. Remove excess whitespace that may result from stripping text
  cleaned = cleaned.replace(/\n\s*\n/g, "\n\n");
  cleaned = cleaned.trim();
  
  return cleaned;
}

// Fetch full article text from the source URL
async function scrapeArticleContent(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AutoBlogBot/1.0)",
        "Accept": "text/html",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const html = await res.text();

    // Extract text from <article> tag first, then fall back to <p> tags
    let articleHtml = "";
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (articleMatch) {
      articleHtml = articleMatch[1];
    } else {
      // Try common content containers
      const contentMatch =
        html.match(/<div[^>]*class="[^"]*(?:article-body|post-content|entry-content|story-body|article-content|article__body)[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
        html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
      if (contentMatch) {
        articleHtml = contentMatch[1];
      } else {
        articleHtml = html;
      }
    }

    // Extract text from <p> tags
    const paragraphs: string[] = [];
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let match;
    while ((match = pRegex.exec(articleHtml)) !== null) {
      // Strip inner HTML tags
      const text = match[1]
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();

      // Only include substantial paragraphs (skip nav items, captions, etc.)
      if (text.length > 40) {
        paragraphs.push(text);
      }
    }

    if (paragraphs.length < 2) return null;

    // Return as HTML paragraphs
    return paragraphs.map((p) => `<p>${p}</p>`).join("\n\n");
  } catch {
    return null;
  }
}

// Check if text appears truncated
function isTruncated(text: string): boolean {
  if (!text) return true;
  const trimmed = text.trim();
  // Ends with ellipsis
  if (trimmed.endsWith("…") || trimmed.endsWith("...")) return true;
  // Ends mid-word (no sentence-ending punctuation)
  if (!/[.!?"\u201D]$/.test(trimmed)) return true;
  // Contains [+N chars] marker (shouldn't after cleaning, but just in case)
  if (/\[\+\d+\s*chars?\]/.test(trimmed)) return true;
  return false;
}

// Try to get full content: scrape source URL, fall back to API content
export async function getFullContent(article: NewsArticle): Promise<string> {
  const apiContent = cleanContent(article.content || article.description || "");
  const truncated = isTruncated(apiContent);

  // Always try scraping if content seems truncated or is short
  if (truncated || apiContent.length < 1000) {
    if (article.url && !article.url.includes("example.com")) {
      console.log(`Scraping full article from: ${article.url} (truncated=${truncated}, len=${apiContent.length})`);
      const scraped = await scrapeArticleContent(article.url);
      if (scraped && scraped.replace(/<[^>]+>/g, "").length > apiContent.length) {
        console.log(`Scraped ${scraped.length} chars (vs ${apiContent.length} from API)`);
        return scraped;
      }
    }
  }

  // Fall back to formatted API content
  return formatContentAsHtml(article);
}

// Keywords that indicate war/politics relevance
const relevanceKeywords = [
  "war", "conflict", "military", "army", "defense", "defence", "troops", "soldier",
  "missile", "weapon", "bomb", "attack", "strike", "invasion", "ceasefire",
  "politics", "political", "government", "president", "minister", "parliament",
  "diplomacy", "diplomatic", "treaty", "sanctions", "embargo", "summit",
  "nato", "united nations", "security council", "geopolitics", "geopolitical",
  "territory", "border", "occupation", "humanitarian", "refugee", "asylum",
  "nuclear", "ballistic", "drone", "airstrike", "insurgent", "rebel",
  "peace", "negotiation", "alliance", "coalition", "foreign policy",
  "intelligence", "espionage", "coup", "regime", "dictator", "authoritarian",
];

// Keywords that indicate irrelevant content (entertainment, sports, tech, etc.)
const exclusionKeywords = [
  "star wars", "jedi", "marvel", "movie", "film", "tv show", "netflix", "disney",
  "celebrity", "kardashian", "hollywood", "anime", "manga", "comic",
  "football", "soccer", "basketball", "tennis", "cricket", "nfl", "nba",
  "recipe", "cooking", "fashion", "beauty", "makeup", "skincare",
  "gaming", "playstation", "xbox", "nintendo", "fortnite",
  "cryptocurrency", "bitcoin", "ethereum", "nft",
  "horoscope", "zodiac", "astrology",
  "brand awareness", "marketing strategy", "seo tips", "social media marketing",
  "weight loss", "fitness routine", "workout",
];

// Check if an article is relevant to war/politics
function isRelevant(article: NewsArticle): boolean {
  const text = `${article.title} ${article.description}`.toLowerCase();

  // Reject if it matches exclusion keywords
  if (exclusionKeywords.some((kw) => text.includes(kw))) return false;

  // Must match at least one relevance keyword
  const matchCount = relevanceKeywords.filter((kw) => text.includes(kw)).length;
  return matchCount >= 1;
}

// Format raw content into proper HTML paragraphs
export function formatContentAsHtml(article: NewsArticle): string {
  const title = cleanContent(article.title);
  const description = cleanContent(article.description);
  const rawContent = cleanContent(article.content);

  // If content is very short or same as description, build a structured article
  const mainText = rawContent.length > description.length ? rawContent : description;

  if (!mainText || mainText.length < 50) {
    return `<p>${description || title}</p>`;
  }

  // Split by double newlines or periods followed by capital letters for paragraphs
  const sentences = mainText
    .split(/(?:\n\n|\r\n\r\n)/)
    .flatMap((block) => {
      // If a block is very long, split by sentences
      if (block.length > 500) {
        return block.match(/[^.!?]+[.!?]+/g) || [block];
      }
      return [block];
    })
    .map((s) => s.trim())
    .filter((s) => s.length > 20);

  if (sentences.length <= 1) {
    // Single block — split into ~3-4 sentence paragraphs
    const allSentences = mainText.match(/[^.!?]+[.!?]+/g) || [mainText];
    const paragraphs: string[] = [];
    for (let i = 0; i < allSentences.length; i += 3) {
      paragraphs.push(allSentences.slice(i, i + 3).join(" ").trim());
    }
    return paragraphs.map((p) => `<p>${p}</p>`).join("\n\n");
  }

  return sentences.map((p) => `<p>${p}</p>`).join("\n\n");
}

// All supported API providers
const apiProviders: Record<string, ApiProvider> = {
  gnewsApiKey:     { name: "GNews",       dailyLimit: 100, fetch: fetchFromGNews },
  newsApiKey:      { name: "NewsAPI",      dailyLimit: 100, fetch: fetchFromNewsApi },
  currentsApiKey:  { name: "Currents",     dailyLimit: 20,  fetch: fetchFromCurrents },
  newsDataApiKey:  { name: "NewsData",     dailyLimit: 200, fetch: fetchFromNewsData },
  mediaStackApiKey:{ name: "MediaStack",   dailyLimit: 100, fetch: fetchFromMediaStack },
  theNewsApiKey:   { name: "TheNewsAPI",   dailyLimit: 3,   fetch: fetchFromTheNewsApi },
};

// Get all configured API keys from settings
async function getConfiguredApis(): Promise<{ key: string; provider: ApiProvider }[]> {
  const settings = await prisma.settings.findUnique({ where: { id: "default" } });
  if (!settings) return [];

  const configured: { key: string; provider: ApiProvider }[] = [];

  const keyMap: Record<string, string | null | undefined> = {
    gnewsApiKey:      settings.gnewsApiKey,
    newsApiKey:       settings.newsApiKey,
    currentsApiKey:   settings.currentsApiKey,
    newsDataApiKey:   settings.newsDataApiKey,
    mediaStackApiKey: settings.mediaStackApiKey,
    theNewsApiKey:    settings.theNewsApiKey,
  };

  const preferred = settings.preferredNewsApi || "random";

  for (const [field, value] of Object.entries(keyMap)) {
    if (value && value.trim() && value !== "your_news_api_key_here") {
      const providerName = field.replace("ApiKey", "").toLowerCase();
      // If a preference is set, only return that API (unless random)
      if (preferred === "random" || preferred === providerName) {
        configured.push({ key: value, provider: apiProviders[field] });
      }
    }
  }

  // Fallback: If preferred is set but has no key, use fallback random APIs
  if (configured.length === 0 && preferred !== "random") {
    for (const [field, value] of Object.entries(keyMap)) {
      if (value && value.trim() && value !== "your_news_api_key_here") {
        configured.push({ key: value, provider: apiProviders[field] });
      }
    }
  }

  return configured;
}

export async function fetchLatestNews(
  topic = "war",
  pageSize = 5
): Promise<NewsArticle[]> {
  const apis = await getConfiguredApis();

  if (apis.length === 0) {
    console.log("No API keys configured, using mock data");
    return generateMockNews(topic, pageSize);
  }

  // Try each configured API in order until one succeeds
  for (const { key, provider } of apis) {
    try {
      const articles = await provider.fetch(topic, pageSize * 2, key);
      // Filter for relevance and clean content
      const relevant = articles.filter(isRelevant).slice(0, pageSize).map((a) => ({
        ...a,
        title: cleanContent(a.title),
        description: cleanContent(a.description),
        content: cleanContent(a.content),
      }));
      if (relevant.length > 0) {
        console.log(`Fetched ${relevant.length} relevant articles from ${provider.name} (${articles.length} total)`);
        return relevant;
      }
    } catch (error) {
      console.error(`${provider.name} failed:`, error);
    }
  }

  console.log("All APIs failed or no relevant articles, using mock data");
  return generateMockNews(topic, pageSize);
}

// Fetch from ALL configured APIs to maximize daily limits, returns batched articles
export async function fetchFromAllApis(
  topic = "war",
  pageSize = 5
): Promise<{ articles: NewsArticle[]; apiUsed: string }[]> {
  const apis = await getConfiguredApis();

  if (apis.length === 0) {
    return [{ articles: generateMockNews(topic, pageSize), apiUsed: "Mock" }];
  }

  const results: { articles: NewsArticle[]; apiUsed: string }[] = [];

  for (const { key, provider } of apis) {
    try {
      const articles = await provider.fetch(topic, pageSize * 2, key);
      const relevant = articles.filter(isRelevant).slice(0, pageSize).map((a) => ({
        ...a,
        title: cleanContent(a.title),
        description: cleanContent(a.description),
        content: cleanContent(a.content),
      }));
      if (relevant.length > 0) {
        results.push({ articles: relevant, apiUsed: provider.name });
        console.log(`${provider.name}: fetched ${relevant.length} relevant articles`);
      }
    } catch (error) {
      console.error(`${provider.name} failed:`, error);
    }
  }

  return results.length > 0 ? results : [{ articles: generateMockNews(topic, pageSize), apiUsed: "Mock" }];
}

// Get total daily limit across all configured APIs
export async function getTotalDailyLimit(): Promise<{ total: number; breakdown: { name: string; limit: number }[] }> {
  const apis = await getConfiguredApis();
  const breakdown = apis.map(({ provider }) => ({ name: provider.name, limit: provider.dailyLimit }));
  const total = breakdown.reduce((sum, b) => sum + b.limit, 0);
  return { total, breakdown };
}

function generateMockNews(topic: string, count: number): NewsArticle[] {
  const topics: Record<string, string[]> = {
    "war": [
      "Ceasefire Negotiations Resume as Fighting Intensifies on Eastern Front",
      "UN Security Council Holds Emergency Session on Escalating Conflict",
      "Humanitarian Aid Convoys Reach Besieged Regions After Week-Long Blockade",
      "Military Analysts Warn of Wider Conflict as Alliances Shift",
      "War-Torn Nation Faces Deepening Crisis as Infrastructure Collapses",
    ],
    "international-politics": [
      "World Leaders Gather for Emergency Summit on Global Security Threats",
      "New UN Resolution Passes with Historic Supermajority Vote",
      "Foreign Ministers Meet to Discuss Stalled Peace Process",
      "G7 Summit Concludes with Bold Stance on International Order",
      "Rising Tensions Between Major Powers Reshape Global Diplomacy",
    ],
    "diplomacy": [
      "Landmark Peace Agreement Signed After Months of Secret Negotiations",
      "Diplomatic Envoy Embarks on Shuttle Diplomacy Mission Across Region",
      "Ambassador Recalled as Bilateral Relations Reach Breaking Point",
      "New Sanctions Package Targets Key Figures in Authoritarian Regime",
      "Back-Channel Diplomacy Offers Glimmer of Hope for Conflict Resolution",
    ],
    "military": [
      "Defense Ministers Announce Joint Military Exercise Amid Regional Tensions",
      "New Generation Missile Defense System Successfully Tested",
      "Military Buildup Along Contested Border Raises Alarm",
      "Naval Fleet Deployed to Strategic Waterway to Ensure Free Navigation",
      "Defense Budget Surge Signals Shift in National Security Priorities",
    ],
    "geopolitics": [
      "Territorial Dispute Escalates as Both Nations Claim Sovereignty",
      "NATO Expansion Talks Trigger Strong Response from Rival Bloc",
      "Strategic Resource Competition Fuels New Geopolitical Rivalries",
      "Small Island Nations Form Alliance Against Maritime Aggression",
      "Disputed Region Holds Controversial Independence Referendum",
    ],
  };

  const topicArticles = topics[topic] || Array.from({ length: 5 }, (_, i) => `Breaking News: Major Developments in ${topic.charAt(0).toUpperCase() + topic.slice(1)} Sector`);

  return Array.from({ length: Math.min(count, topicArticles.length) }, (_, i) => ({
    title: topicArticles[i],
    description: `Breaking coverage: ${topicArticles[i]}. In-depth analysis of the latest developments in ${topic}, with expert commentary and on-the-ground reporting.`,
    content: generateArticleContent(topicArticles[i], topic),
    url: `https://example.com/news/${generateSlug(topicArticles[i])}`,
    urlToImage: `https://picsum.photos/seed/${generateSlug(topicArticles[i])}/1200/630`,
    source: { name: "Global News Wire" },
    publishedAt: new Date().toISOString(),
  }));
}

function generateArticleContent(title: string, topic: string): string {
  const topicLabels: Record<string, string> = {
    "war": "war and armed conflict",
    "international-politics": "international politics",
    "diplomacy": "diplomacy and peace negotiations",
    "military": "military and defense affairs",
    "geopolitics": "geopolitics and territorial disputes",
  };
  const label = topicLabels[topic] || `${topic} industry`;

  return `
<h2>${title}</h2>

<p>In a rapidly evolving situation that has drawn the attention of governments worldwide, the latest developments in ${label} are raising critical questions about the future of international stability. Security analysts and diplomatic sources have been closely monitoring events, and the implications extend far beyond the immediate region.</p>

<h3>Key Developments</h3>

<p>According to official statements and intelligence reports, the situation surrounding ${title.toLowerCase()} has entered a new phase. Multiple nations have issued formal responses, and the United Nations Security Council is expected to convene for an urgent session on the matter.</p>

<p>"This represents a significant turning point in the ongoing crisis," said Dr. James Thornton, a senior fellow at the International Strategic Studies Institute. "The decisions made in the coming days will have lasting consequences for regional security and the broader international order."</p>

<h3>International Response</h3>

<p>World leaders have been swift to react, with major powers issuing statements urging restraint and calling for diplomatic solutions. The European Union, NATO, and the African Union have all weighed in, reflecting the global dimensions of the crisis.</p>

<p>Behind the scenes, diplomatic channels remain active, with envoys shuttling between capitals in search of a breakthrough. However, deep-seated disagreements and competing strategic interests continue to complicate negotiations.</p>

<h3>Humanitarian Impact</h3>

<p>On the ground, the human cost continues to mount. International humanitarian organizations report growing displacement, with civilian populations bearing the heaviest burden. Aid agencies are calling for unimpeded access to affected areas and increased funding for emergency relief operations.</p>

<h3>What Lies Ahead</h3>

<p>As the international community grapples with the crisis, experts warn that the window for a peaceful resolution may be narrowing. The coming weeks are expected to be decisive, with several planned summits and negotiations that could shape the trajectory of the conflict.</p>

<p>Our correspondents in the region will continue to provide live updates as the situation unfolds. Stay with us for comprehensive coverage and expert analysis on the latest developments in global security.</p>
`;
}

// Maps sub-topic slugs to human-readable category names
function getCategoryName(topic: string): string {
  const map: Record<string, string> = {
    "war": "War & Conflict",
    "international-politics": "International Politics",
    "diplomacy": "Diplomacy",
    "military": "Military & Defense",
    "geopolitics": "Geopolitics",
  };
  if (map[topic]) return map[topic];
  return topic.split(/[- ]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export async function generateAutoPost(topic = "technology"): Promise<string | null> {
  try {
    const articles = await fetchLatestNews(topic, 1);
    if (articles.length === 0) return null;

    const article = articles[0];

    const existingPost = await prisma.post.findFirst({
      where: { title: article.title },
    });
    if (existingPost) return null;

    let baseSlug = generateSlug(article.title);
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const categoryName = getCategoryName(topic);
    const categorySlug = generateSlug(topic);

    let dbCategory = await prisma.category.findFirst({
      where: { slug: categorySlug },
    });

    if (!dbCategory) {
      dbCategory = await prisma.category.create({
        data: {
          name: categoryName,
          slug: categorySlug,
        },
      });
    }

    const htmlContent = await getFullContent(article);
    const plainContent = cleanContent(article.content || article.description || "");
    const excerpt = generateExcerpt(cleanContent(article.description || plainContent));

    const post = await prisma.post.create({
      data: {
        title: cleanContent(article.title),
        slug,
        content: htmlContent,
        excerpt,
        featuredImage: article.urlToImage || `https://picsum.photos/seed/${slug}/1200/630`,
        published: true,
        autoGenerated: true,
        metaTitle: cleanContent(article.title),
        metaDesc: excerpt,
        metaKeywords: `${categoryName}, news, updates`,
        readTime: calculateReadTime(plainContent),
        sourceUrl: article.url,
        sourceName: article.source?.name || "Unknown",
        categoryId: dbCategory.id,
        publishedAt: new Date(),
      },
    });

    return post.id;
  } catch (error) {
    console.error("Error generating auto post:", error);
    return null;
  }
}
