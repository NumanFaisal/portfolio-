import { z } from "zod";

export const StatSchema = z.object({
  value: z.number(),
  label: z.string(),
  suffix: z.string(),
});

export const TechLogoSchema = z.object({
  name: z.string(),
  icon: z.string(),
});

export const ProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  headline: z.string(),
  subheadline: z.string(),
  bio: z.string(),
  currently_building: z.string(),
  open_to_work: z.boolean(),
  location: z.string(),
  email: z.string().email(),
  github: z.string().url(),
  linkedin: z.string().url(),
  cal_url: z.string(),
  resume_pdf: z.string(),
  photo: z.string(),
  stats: z.array(StatSchema),
  tech_logos: z.array(TechLogoSchema),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type Stat = z.infer<typeof StatSchema>;
