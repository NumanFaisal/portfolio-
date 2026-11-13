import type { MetadataRoute } from "next";
import projectsData from "@/data/projects.json";
import { ProjectsArraySchema } from "@/data/schemas/project";

const projects = ProjectsArraySchema.parse(projectsData);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://numanfaisal.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectRoutes,
  ];
}
