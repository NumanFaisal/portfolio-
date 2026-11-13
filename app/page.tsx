import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { Projects } from "@/components/sections/Projects";
import { ExperienceSection } from "@/components/sections/Experience";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";
import { ProfileSchema } from "@/data/schemas/profile";
import { ExperienceArraySchema } from "@/data/schemas/experience";
import { ProjectsArraySchema } from "@/data/schemas/project";

// Validate at build time
const profile = ProfileSchema.parse(profileData);
const experiences = ExperienceArraySchema.parse(experienceData);
const projects = ProjectsArraySchema.parse(projectsData);

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip profile={profile} />
      <Projects projects={projects} />
      <ExperienceSection experiences={experiences} />
      <About profile={profile} />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}
