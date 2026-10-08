const careerRoot = "https://github.com/CareerNexus-Platform/CareerNexus-Backend/blob/b75419d342bf1f9df9ed3e048431d3edceac272c";
const careerJava = `${careerRoot}/src/main/java/com/CareerNexus_Backend/CareerNexus`;
const bridgeRoot = "https://github.com/22A31A0525/DevBridgeIde/blob/577014509260e96f1d40274792a2113464ec4d9a";
const bridgeJava = `${bridgeRoot}/backend/RealTime-CodeSync/src/main/java/com/Real_Time/Collaborative/Editor/RealTime_CodeSync`;
const agentsRoot = "https://github.com/IntelliAgents-AutoAuth/backend/blob/6add5a55aa36511269d6adec1ae9dcec4d43f08a";

// Source-observed behavior is separate from personal ownership and measured outcomes.
// Tradeoffs explain the implementation; they do not attribute unconfirmed intent to the author.
export const caseStudies = [
  {
    id: "career-nexus", title: "CareerNexus", subtitle: "Recruitment workflows behind a campus platform",
    role: "Team Lead & Backend Developer",
    contribution: "I led the team and worked on the backend of CareerNexus. The implementation below describes the project’s recruitment API and authentication structure.",
    problem: "Students need to submit applications and resumes, while recruiters and placement officers need to manage recruitment activity. These workflows require a backend that connects user identity, jobs, and application records.",
    documentedContext: "CareerNexus is a team effort. The frontend README credits Akshay and Pranay for its implemented features; my confirmed role is team leadership and backend development. The backend story here is supported by controller and security source files.",
    flowLabel: "Submitting a job application",
    architecture: [
      { title: "Authenticated request", detail: "Student identity and a multipart resume upload enter the application API." },
      { title: "Application controller", detail: "The controller reads the authenticated identity and delegates the request." },
      { title: "Application service", detail: "The service performs the application operation and returns an application DTO." },
      { title: "HTTP response", detail: "The creation endpoint returns the DTO with a 201 Created status." },
    ],
    architectureNote: "The Maven configuration includes JPA and PostgreSQL. This diagram follows the inspected controller; persistence internals and resume storage are outside this flow’s verified boundary.",
    decisions: [
      { title: "Keep HTTP handling separate from application operations", implementation: "The controller delegates application creation and retrieval to ApplicationService and returns DTOs.", tradeoff: "This boundary separates transport concerns from business operations. Consistent validation and error mapping across the boundary still need their own tests." },
      { title: "Use authenticated identity for student operations", implementation: "Apply and personal-application endpoints derive the user identifier from Authentication. The security configuration uses a JWT filter and stateless sessions.", tradeoff: "This avoids taking the acting student’s identity from an arbitrary request field. Authentication alone does not establish complete authorization for every recruiter or administrative operation." },
    ],
    exampleTitle: "Application API contract",
    example: "POST /api/applications/apply/{jobId}\nContent-Type: multipart/form-data\nPart: resumeFile\nActing user: authenticated identity\nResponse: 201 Created + ApplicationDTO",
    exampleNote: "Contract summarized from the controller. No real applicant records or credentials are included.",
    reliability: "Several retrieval endpoints map missing resources, forbidden operations, and unexpected failures to HTTP status codes. The security configuration also includes BCrypt password encoding and explicit public-path exceptions.",
    outcome: "The source demonstrates a recruitment API organized around application operations, authenticated identities, and structured responses. It provides concrete implementation evidence beyond the frontend dashboards.",
    limitations: ["Production user counts, throughput, and latency have not been measured for this case study.", "Duplicate-application behavior, authorization coverage, and transaction boundaries require further verification."],
    nextSteps: "Verify ownership rules with integration tests, document the persistence model, and measure application endpoints against a defined workload before making scalability claims.",
    sources: [
      { label: "Application controller", url: `${careerJava}/controller/ApplicationController.java` },
      { label: "Security configuration", url: `${careerJava}/config/WebSecurityConfig.java` },
      { label: "Backend dependencies", url: `${careerRoot}/pom.xml` },
      { label: "Frontend team README", url: "https://github.com/CareerNexus-Platform/CareerNexus-Frontend#readme" },
    ],
    revision: "b75419d", githubUrl: "https://github.com/CareerNexus-Platform/CareerNexus-Backend",
  },
  {
    id: "devbridge-ide", title: "DevBridge IDE", subtitle: "Managing connections and state for collaborative coding",
    role: "Individual Contributor",
    contribution: "I contributed to DevBridge IDE as an individual contributor. The backend story focuses on room connections, editor message broadcasting, and session persistence.",
    problem: "Developers joining the same coding room need shared editor updates and an initial state they can continue from. The backend needs to track room participants and handle connections entering and leaving.",
    documentedContext: "The README describes shared coding sessions, participant presence, chat, and code execution. It documents a Dockerized Spring Boot backend on Render and a React frontend on Vercel, with Redis and advanced concurrency control listed as future improvements.",
    flowLabel: "Joining and leaving a coding session",
    architecture: [
      { title: "Editor connection", detail: "The WebSocket configuration registers the editor handler and JWT handshake interceptor." },
      { title: "Room handler", detail: "Connections are grouped by session; editor messages are broadcast to room participants." },
      { title: "Active session state", detail: "Initial code comes from process-local memory or a saved session repository." },
      { title: "Session persistence", detail: "When a room becomes empty, the handler saves its final code state." },
    ],
    architectureNote: "The diagram summarizes the connection lifecycle. Active connections and code caches are local to one server instance; it is not a distributed synchronization diagram.",
    decisions: [
      { title: "Group active connections by room", implementation: "ConcurrentHashMap and CopyOnWriteArraySet hold active connections and participant information for each coding session.", tradeoff: "In-memory collections make room access direct within a process. Multiple server instances would need a shared coordination or messaging strategy." },
      { title: "Restore saved state and persist on room closure", implementation: "The first connection can load a CodeSession from a repository. The handler saves final state when the room becomes empty.", tradeoff: "This provides a saved starting point for later connections. Saving on room closure does not guarantee recovery of every edit if the process stops while a room is active." },
    ],
    exampleTitle: "Initial-state message fields",
    example: "type: INITIAL_CODE_STATE\ncontent: code loaded from session state\nselectedLanguage: saved or default language\nuser: SERVER",
    exampleNote: "Field summary from the editor handler, rather than a captured user session.",
    reliability: "The handler rejects connections missing session identity or username, checks connection state before sending initial content, and includes connection-close cleanup and message-send error handling.",
    outcome: "The source shows room-scoped WebSocket broadcasting and database-backed restoration of coding-session state. These mechanisms make connection lifecycle and persistence tradeoffs visible.",
    limitations: ["Conflict resolution, lossless reconnect behavior, and crash recovery are not established by the inspected code.", "Concurrent-user capacity and cross-instance coordination have not been verified. An application test file exists, but test coverage and passing results are not established here."],
    nextSteps: "Test disconnect and reconnect scenarios, document message ordering, and evaluate persistence checkpoints and shared room coordination before scaling across instances.",
    sources: [
      { label: "Editor WebSocket handler", url: `${bridgeJava}/services/CodeEditorWebSocketHandler.java` },
      { label: "WebSocket configuration", url: `${bridgeJava}/config/WebSocketConfig.java` },
      { label: "Backend dependencies", url: `${bridgeRoot}/backend/RealTime-CodeSync/pom.xml` },
      { label: "Project README", url: `${bridgeRoot}/README.md` },
    ],
    revision: "5770145", githubUrl: "https://github.com/22A31A0525/DevBridgeIde",
  },
  {
    id: "intelliagents-autoauth", title: "IntelliAgents AutoAuth", subtitle: "Coordinating an AI-assisted case workflow",
    role: "Team Project",
    contribution: "A team project centered on an AI-assisted case workflow. This study describes the shared backend implementation and its orchestration design.",
    problem: "A prior-authorization workflow involves gathering evidence, finding gaps, checking eligibility, and preparing documents for review. The prototype organizes these stages around a case and its processing state.",
    documentedContext: "The README describes policy retrieval through ChromaDB, agent workflows built with LangChain, Phoenix tracing, and a SQLAdmin dashboard. Its setup uses configurable SQLAlchemy storage with SQLite as the example database. These are documented integrations; this case study’s code review centers on the case API and orchestrator.",
    flowLabel: "Scheduling case processing",
    architecture: [
      { title: "Case API", detail: "Authenticated case routes create or retrieve case records." },
      { title: "Background task", detail: "The API schedules case processing through FastAPI background tasks." },
      { title: "Case orchestrator", detail: "Central routing coordinates agent steps and loads prior workflow memory." },
      { title: "Case state and review", detail: "Workflow stages cover analysis, document generation, staff review, and submission." },
    ],
    architectureNote: "A source-derived overview of the prototype. It does not imply clinical validation, live payer integration, or a distributed task queue.",
    decisions: [
      { title: "Centralize workflow routing", implementation: "CaseOrchestrator owns the workflow step registry and routing, and uses stored memory of prior agent calls.", tradeoff: "Central coordination makes stage transitions easier to inspect. Correct retry and rerun behavior still depends on memory and persistence semantics." },
      { title: "Guard processing within an application instance", implementation: "Case routes check in-progress statuses, and the orchestrator uses a process-local asyncio lock table keyed by case.", tradeoff: "These controls reduce overlapping work within one process. Multiple workers and restarts require additional coordination; the locks do not provide distributed deduplication." },
    ],
    exampleTitle: "Workflow step registry",
    example: "ehr_fetch → gap_analysis → eligibility\npacket_gen → pending_approval → submit\n\nRouting is trigger- and state-dependent.\nStaff review pauses the workflow before submission.",
    exampleNote: "An abbreviated registry overview, not a guarantee that every case follows a single linear path. No patient data is included.",
    reliability: "The orchestrator loads case memory, records processing events, and defines trigger-specific rerun behavior. The repository contains tests for agents, memory, orchestration, and audit logging; their execution is not verified in this portfolio review.",
    outcome: "The prototype illustrates centralized orchestration around case state and background execution. Its technical value is in making the workflow and coordination boundaries explicit.",
    limitations: ["No accuracy, latency, cost saving, production deployment, or clinical outcome is established by this case study.", "Process-local locks and background tasks do not establish durable execution or exactly-once processing across workers."],
    nextSteps: "Validate failed-step recovery and multi-worker behavior with synthetic cases, then document durable execution and retrieval evaluation before making reliability or accuracy guarantees.",
    sources: [
      { label: "Case API", url: `${agentsRoot}/api/v1/endpoints/cases.py` },
      { label: "Case orchestrator", url: `${agentsRoot}/orchestrator/case_orchestrator.py` },
      { label: "Dependencies", url: `${agentsRoot}/Requirements.txt` },
      { label: "Project README", url: `${agentsRoot}/README.md` },
    ],
    revision: "6add5a5", githubUrl: "https://github.com/IntelliAgents-AutoAuth/backend",
  },
];
