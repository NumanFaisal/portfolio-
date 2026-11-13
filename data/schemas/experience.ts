import { z } from "zod";

export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  type: z.enum(["Full-time", "Internship", "Contract", "Freelance"]),
  start: z.string().regex(/^\d{4}-\d{2}$/),
  end: z.string().regex(/^\d{4}-\d{2}$/).nullable(),
  current: z.boolean(),
  location: z.string(),
  bullets: z.array(z.string()).min(1).max(5),
  tech: z.array(z.string()),
  learned: z.string(),
});

export const ExperienceArraySchema = z.array(ExperienceSchema);

export type Experience = z.infer<typeof ExperienceSchema>;
