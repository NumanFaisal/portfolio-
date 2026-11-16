import { VoxPortfolioApp } from "@/components/sections/VoxPortfolioApp";
import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";
import { ProfileSchema } from "@/data/schemas/profile";
import { ExperienceArraySchema } from "@/data/schemas/experience";
import { ProjectsArraySchema } from "@/data/schemas/project";

// Strict build-time validation
ProfileSchema.parse(profileData);
ExperienceArraySchema.parse(experienceData);
ProjectsArraySchema.parse(projectsData);

export default function HomePage() {
  return <VoxPortfolioApp />;
}
