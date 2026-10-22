export type EvidenceLabel =
  | "Editorial summary"
  | "Firsthand account"
  | "Public source"
  | "Needs review";

export type Role = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  tasks: string[];
  skills: string[];
  tools: string[];
  considerations: string[];
  entry: string;
  evidence: EvidenceLabel;
};

export const categories = [
  "Software Engineering",
  "AI Applications",
  "Data & BI",
  "QA & Testing",
  "Cloud & DevOps",
  "Cybersecurity",
  "Product & Business Analysis",
  "Design & Research",
  "Sales & Customer Success",
  "Business Operations",
  "Entrepreneurship",
  "Small-Business Operations",
] as const;

export const roles: Role[] = [
  { slug: "software-engineer", title: "Software Engineer", category: "Software Engineering", summary: "Builds and maintains software by turning a user or business need into reliable, testable systems.", tasks: ["Break a problem into small technical decisions", "Write, review and maintain code", "Collaborate with design, product and operations"], skills: ["Problem framing", "Programming fundamentals", "Testing and communication"], tools: ["A programming language", "Git", "Issue tracker and code review"], considerations: ["The work involves more reading and coordination than most beginner tutorials show.", "Requirements change, and trade-offs matter as much as syntax."], entry: "A small project, clear README and comfort debugging are useful starting signals. Hiring paths vary by team.", evidence: "Editorial summary" },
  { slug: "data-analyst", title: "Data Analyst", category: "Data & BI", summary: "Helps teams make decisions by asking precise questions of data and explaining what the numbers can and cannot say.", tasks: ["Clarify the decision behind a request", "Clean and query data", "Share findings with caveats and next steps"], skills: ["SQL", "Data interpretation", "Clear writing"], tools: ["SQL editor", "Spreadsheets", "A dashboard or notebook"], considerations: ["A strong question is often more valuable than a complicated chart.", "Definitions and data quality can take longer than analysis."], entry: "Practice with public datasets and explain your assumptions. Domain context is a differentiator.", evidence: "Editorial summary" },
  { slug: "product-manager", title: "Product Manager", category: "Product & Business Analysis", summary: "Connects customer needs, business goals and delivery decisions without owning every implementation detail.", tasks: ["Understand a user problem", "Prioritise a sequence of bets", "Align people around a measurable outcome"], skills: ["Research", "Prioritisation", "Facilitation"], tools: ["Interview notes", "Roadmap", "Analytics and documentation"], considerations: ["Influence usually happens without direct authority.", "The job includes saying no and making decisions with incomplete information."], entry: "Study a product you use, interview users ethically and practise writing concise problem briefs.", evidence: "Editorial summary" },
  { slug: "qa-engineer", title: "QA Engineer", category: "QA & Testing", summary: "Finds risk in software and helps teams build confidence through thoughtful, repeatable testing.", tasks: ["Explore expected and unexpected user paths", "Design useful test cases", "Automate checks where they provide lasting value"], skills: ["Curiosity", "Risk-based thinking", "Technical communication"], tools: ["Browser devtools", "Test runner", "Issue tracker"], considerations: ["Quality is a team responsibility, not a final gate.", "Good testing balances speed, coverage and maintenance cost."], entry: "Learn how web applications work, document bug reports clearly and automate one small repeated check.", evidence: "Editorial summary" },
  { slug: "devops-engineer", title: "DevOps Engineer", category: "Cloud & DevOps", summary: "Improves how software is built, deployed and operated so teams can deliver safely and learn from failures.", tasks: ["Automate delivery steps", "Make systems observable", "Improve reliability and recovery"], skills: ["Networking basics", "Automation", "Incident learning"], tools: ["Shell", "Containers", "CI/CD and cloud consoles"], considerations: ["On-call expectations vary and should be asked about directly.", "The work rewards steady systems thinking more than tool collecting."], entry: "Build a small deployment pipeline and learn the fundamentals before chasing provider-specific badges.", evidence: "Editorial summary" },
  { slug: "ux-researcher", title: "UX Researcher", category: "Design & Research", summary: "Studies how people experience a product and turns evidence into better questions and design decisions.", tasks: ["Plan ethical research", "Listen for patterns without leading participants", "Share findings with context and uncertainty"], skills: ["Interviewing", "Synthesis", "Facilitation"], tools: ["Research plan", "Notes repository", "Prototype or product"], considerations: ["A handful of conversations are directional, not universal proof.", "Recruitment and stakeholder alignment are part of the job."], entry: "Practise structured observation and summarise evidence without exposing participant identity.", evidence: "Editorial summary" },
  { slug: "cybersecurity-analyst", title: "Cybersecurity Analyst", category: "Cybersecurity", summary: "Helps protect systems and people by monitoring risk, investigating signals and improving controls.", tasks: ["Review alerts and context", "Document and escalate incidents", "Translate risk into practical improvements"], skills: ["Networking", "Investigation", "Calm written communication"], tools: ["Logs", "Ticketing", "Security monitoring tools"], considerations: ["The work can involve sensitive information and careful access boundaries.", "Security is continuous, not a one-time checklist."], entry: "Use legal training labs, learn core networking and keep detailed, non-sensitive investigation notes.", evidence: "Editorial summary" },
  { slug: "business-operations", title: "Business Operations Associate", category: "Business Operations", summary: "Makes recurring work clearer and more dependable by connecting people, processes and information.", tasks: ["Map a current process", "Spot bottlenecks and handoff gaps", "Measure whether a change helped"], skills: ["Organisation", "Process thinking", "Stakeholder communication"], tools: ["Spreadsheets", "Documentation", "Simple automation"], considerations: ["The problems are often ambiguous and cross-team.", "Small, well-measured improvements compound."], entry: "Document a real process you know, identify friction and propose a reversible improvement.", evidence: "Editorial summary" },
];

export type KnowledgeItem = { slug: string; title: string; type: string; summary: string; role: string; evidence: EvidenceLabel; updated: string };
export const library: KnowledgeItem[] = [
  { slug: "how-to-read-a-role-description", title: "How to read a role description without guessing", type: "Checklist", summary: "A practical way to separate responsibilities, signals and questions worth asking.", role: "All roles", evidence: "Editorial summary", updated: "Starter guide" },
  { slug: "questions-before-learning-tool", title: "Questions to ask before learning a new tool", type: "Practical example", summary: "Start with the work and decision, then decide whether a tool belongs in your learning path.", role: "All roles", evidence: "Editorial summary", updated: "Starter guide" },
  { slug: "data-analyst-first-project", title: "A first data analyst project with honest boundaries", type: "Role guide", summary: "How to show your reasoning with a small public dataset without claiming business impact.", role: "Data Analyst", evidence: "Editorial summary", updated: "Starter guide" },
];

export const navItems = [
  ["/explore", "Explore roles"],
  ["/sessions", "Live sessions"],
  ["/library", "Knowledge library"],
  ["/community", "Community"],
  ["/contribute", "For speakers"],
] as const;

export function getRole(slug: string) { return roles.find((role) => role.slug === slug); }
export function getKnowledge(slug: string) { return library.find((item) => item.slug === slug); }
