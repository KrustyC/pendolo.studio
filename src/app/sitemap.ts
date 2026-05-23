import type { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";

const BASE_URL = "https://www.pendolo.studio";

const getSitemap = unstable_cache(
  async (): Promise<MetadataRoute.Sitemap> => {
    const now = new Date().toISOString();
    return [
      {
        url: BASE_URL,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 1,
      },
      {
        url: `${BASE_URL}/services`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/contact`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.7,
      },
    ];
  },
  ["sitemap"],
  { revalidate: 60 * 60 * 24 * 30 } // 30 days
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getSitemap();
}
