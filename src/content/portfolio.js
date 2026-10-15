export const resumeUrl = "https://drive.google.com/file/d/18iIJKeYRWinJt6txgjgd-gxQgHISpy-M/view?usp=sharing";
export const navigation = [
  { id: "portfolio", label: "Projects" }, { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" }, { id: "about", label: "About" }, { id: "contact", label: "Contact" },
];
// Source evidence and ownership limits: docs/phase-0/projects.md.
export const featuredProjects = [
  {
    id: "career-nexus", title: "CareerNexus", role: "Team Lead & Backend Developer",
    description: "A campus recruitment platform connecting students, placement officers, and recruiters through job and application workflows.",
    focus: "Recruitment APIs and application workflows", tech: ["Java", "Spring Boot", "PostgreSQL", "JWT"],
    githubUrl: "https://github.com/CareerNexus-Platform/CareerNexus-Backend", liveUrl: "https://carrernexus-c413a.web.app/",
    details: ["Application endpoints accept resumes and use authenticated student identities.",
      "Controllers delegate recruitment operations to services and return structured DTOs.",
      "The backend configures stateless JWT authentication and BCrypt password encoding."],
  },
  {
    id: "devbridge-ide", title: "DevBridge IDE", role: "Individual Contributor",
    description: "A collaborative coding application with a backend that broadcasts editor messages and restores saved session state.",
    focus: "WebSocket connections and session persistence", tech: ["Java", "Spring Boot", "WebSockets", "PostgreSQL"],
    githubUrl: "https://github.com/22A31A0525/DevBridgeIde", liveUrl: "https://dev-bridge-ide.vercel.app/",
    details: ["A WebSocket handler groups connections into coding sessions and broadcasts messages.",
      "New connections receive initial code state loaded from memory or a database repository.",
      "Active room state is held within one server instance; final state is saved when a room becomes empty."],
  },
  {
    id: "intelliagents-autoauth", title: "IntelliAgents AutoAuth", role: "Team Project",
    description: "An AI-assisted prior-authorization workflow prototype with case APIs, agent orchestration, and human review stages.",
    focus: "Case-state tracking and background orchestration", tech: ["Python", "FastAPI", "SQLAlchemy", "LangChain"],
    githubUrl: "https://github.com/IntelliAgents-AutoAuth/backend",
    details: ["Case routes schedule background tasks through a centralized orchestrator.",
      "Workflow steps include gap analysis, eligibility, document generation, and staff review.",
      "The orchestrator tracks prior work and uses process-local locks to limit duplicate runs."],
  },
];

export const otherProjects = [
  { title: "DSA Showcase", description: "Java implementations of data structures and algorithms.", url: "https://github.com/22A31A0525/DSA-Projects" },
  { title: "Now-Weather", description: "A React weather application using external APIs.", url: "https://github.com/22A31A0525/Now-Weather" },
  { title: "Browser automation", description: "Python scripts for repetitive browser tasks.", url: "https://github.com/22A31A0525/Automated-Browser-Tasks" },
];

