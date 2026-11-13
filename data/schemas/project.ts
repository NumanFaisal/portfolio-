import { z } from "zod";

const CaseStudySchema = z.object({
  problem: z.string(),
  approach: z.string(),
  architecture: z.string(),
  key_decisions: z.array(z.string()),
  result: z.string(),
  stack_detail: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  summary: z.string(),
  status: z.enum(["production", "shipped", "hackathon", "wip", "archived"]),
  featured: z.boolean(),
  github: z.string().url().nullable(),
  live: z.string().url().nullable(),
  video: z.string().nullable(),
  screenshot: z.string().nullable(),
  tech: z.array(z.string()),
  outcome: z.string(),
  case_study: CaseStudySchema,
  repoName: z.string().nullable(),
  tags: z.array(z.string()),
});

export const ProjectsArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;
export type CaseStudy = z.infer<typeof CaseStudySchema>;
