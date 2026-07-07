import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { artikelen } from "@/content/library/artikelen";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { pad: string; prioriteit: number }[] = [
    { pad: "", prioriteit: 1 },
    { pad: "/afvalscan", prioriteit: 0.9 },
    { pad: "/hoe-werkt-het", prioriteit: 0.8 },
    { pad: "/voor-mbo", prioriteit: 0.9 },
    { pad: "/sectoren", prioriteit: 0.7 },
    { pad: "/onafhankelijk", prioriteit: 0.8 },
    { pad: "/cases", prioriteit: 0.6 },
    { pad: "/kennis", prioriteit: 0.6 },
    ...artikelen.map((a) => ({ pad: `/kennis/${a.slug}`, prioriteit: 0.5 })),
    { pad: "/over", prioriteit: 0.5 },
    { pad: "/contact", prioriteit: 0.7 },
    { pad: "/privacy", prioriteit: 0.2 },
  ];

  return routes.map((route) => ({
    url: `${site.url}${route.pad}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.prioriteit,
  }));
}
