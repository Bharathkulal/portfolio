export const projectsData = [
  {
    id: "civicsolve",
    name: "CivicSolve",
    description: "Smart Civic Complaint Management System and public utility reporting platform.",
    status: "Live",
    statusType: "live", // live, dev, proto
    tags: ["React", "Node.js", "MongoDB", "Maps API"],
    problem: "[ CivicSolve: Problem Statement ]\nPublic infrastructure issues (like potholes, streetlights, or waste) often go unreported due to complex municipal channels. This module provides direct logging for citizens.",
    solution: "[ CivicSolve: Solution Architecture ]\nA responsive web client map mapping coordinates to a database. Uses local storage or basic web databases to report, categorize, and track resolution steps.",
    features: [
      "Geolocation tags for issue precision",
      "Real-time progress status dashboard",
      "Image upload/preview for damage description",
      "Administrative validation panel"
    ],
    learned: "Managing asynchronous state changes in frontend clients, storing relational records securely, and designing intuitive user experiences for public utility web apps.",
    github: "https://github.com",
    demo: "https://civicsolve.demo",
    image: "/images/projects/civicsolve.png"
  },
  {
    id: "bimbaai",
    name: "Bimba AI",
    description: "AI-powered Career and Resume Intelligence Platform & computer vision inference pipeline.",
    status: "In Development",
    statusType: "dev",
    tags: ["Python", "Machine Learning", "Computer Vision", "React"],
    problem: "[ Bimba AI: Problem Statement ]\nExtracting structured intelligence from resumes and career records requires multimodal machine learning and cognitive classification.",
    solution: "[ Bimba AI: Solution Architecture ]\nA Python-driven pipeline testing neural frameworks to process local image and document assets, optimize resolution, and run predictive classification.",
    features: [
      "Modular resume & profile ingestion pipelines",
      "Core career trajectory categorization layers",
      "Real-time inference visualizer outputs",
      "Configurable neural parameter settings"
    ],
    learned: "Pre-processing text & image tensors, evaluating confidence metrics, and integrating FastAPI inference backends with React frontend clients.",
    github: "https://github.com",
    demo: "https://bimba-ai.demo",
    image: "/images/projects/bimba-ai.png"
  },
  {
    id: "eduverseai",
    name: "EduVerse AI",
    description: "Adaptive AI Learning Platform and dynamic LLM tutor engine.",
    status: "Prototype",
    statusType: "proto",
    tags: ["Generative AI", "React", "Tailwind CSS", "LLM APIs"],
    problem: "[ EduVerse AI: Problem Statement ]\nTraditional educational frameworks present static curricula that fail to adapt dynamically to learner comprehension speeds.",
    solution: "[ EduVerse AI: Solution Architecture ]\nAn adaptive interface generating personalized educational flows using LLM prompt pipelines to analyze user answers and adjust curriculum depth.",
    features: [
      "Dynamic generation of topical modules",
      "AI tutor assistant dialog interface",
      "Real-time comprehension tracking charts",
      "Instant quiz generation feedback layers"
    ],
    learned: "Structuring prompt pipelines to extract strict JSON schemas from AI models and managing session state efficiently.",
    github: "https://github.com",
    demo: "https://eduverse-ai.demo",
    image: "/images/projects/eduverse-ai.png"
  },
  {
    id: "novaai",
    name: "Nova AI",
    description: "AI Assistant and Automation Platform for local system tasks and contextual workflows.",
    status: "In Development",
    statusType: "dev",
    tags: ["Python", "AI APIs", "React", "Automation"],
    problem: "[ Nova AI: Problem Statement ]\nVirtual assistants often lack domain-specific execution power, functioning only as search tools rather than systemic automation agents.",
    solution: "[ Nova AI: Solution Architecture ]\nAn orchestrator system matching natural language commands to structured internal automation scripts and OS utility layers.",
    features: [
      "Command line terminal control panel",
      "Context memory buffers for dialogue retention",
      "Direct local system execution plugins",
      "Modular script integrations"
    ],
    learned: "Creating custom intent parsing logic, standardizing utility modules, and handling runtime exceptions during agent command executions.",
    github: "https://github.com",
    demo: "https://nova-ai.demo",
    image: "/images/projects/nova-ai.png"
  },
  {
    id: "scholarai",
    name: "Scholar AI",
    description: "AI-powered Academic Assistant and literature mining search index.",
    status: "Prototype",
    statusType: "proto",
    tags: ["Generative AI", "Python", "MongoDB", "NLP"],
    problem: "[ Scholar AI: Problem Statement ]\nResearchers and students spend countless hours manually scanning academic papers for reference metadata and key arguments.",
    solution: "[ Scholar AI: Solution Architecture ]\nA document extraction pipeline parsing academic papers, extracting reference graphs, and generating concise technical summaries.",
    features: [
      "Multi-document PDF parser modules",
      "Reference graph map extractor tools",
      "Bullet-point automatic summary engines",
      "Citation tracker exports"
    ],
    learned: "Working with PDF text streams, token limit optimization for large context requests, and vector indexing.",
    github: "https://github.com",
    demo: "https://scholar-ai.demo",
    image: "/images/projects/scholar-ai.png"
  },
  {
    id: "gymmanagement",
    name: "Gym Management System",
    description: "Digital Gym Management Platform with membership logs, scheduling, and analytics.",
    status: "Live",
    statusType: "live",
    tags: ["React", "Node.js", "MongoDB", "MySQL"],
    problem: "[ Gym Management: Problem Statement ]\nGms and fitness clubs require streamlined membership registration, trainer scheduling, and payment records without heavy enterprise bloat.",
    solution: "[ Gym Management: Solution Architecture ]\nA database-driven application built using normalized schemas, custom query logic, and an intuitive administrative portal.",
    features: [
      "Client profile registration & subscription tracking",
      "Scheduling sheets for personal trainers",
      "Payment logging database records",
      "Weekly administration statistics panel"
    ],
    learned: "Designing normalized database schemas to prevent redundancy, writing optimized query logic, and managing secure state.",
    github: "https://github.com",
    demo: "https://gym-management.demo",
    image: "/images/projects/gym.png"
  }
];

export const skillsData = {
  frontend: ["HTML", "CSS", "JavaScript", "React.js"],
  programming: ["Python", "C", "Java"],
  database: ["MySQL", "MongoDB"],
  aiMl: ["Artificial Intelligence", "Machine Learning", "Data Science", "Generative AI"],
  tools: ["Antigravity", "Cursor", "Visual Studio Code", "Git"],
  iot: ["ESP32", "Gas Management System"]
};

export const educationData = [
  {
    period: "2025 — 2028 (Expected)",
    degree: "BCA (Artificial Intelligence & Machine Learning)",
    institution: "Dr. B.B. Hegde First Grade College, Kundapura",
    description: "Focusing on computational logic, neural networking bases, database modeling, and generative workflows."
  },
  {
    period: "Completed",
    degree: "PUC (Pre-University Education)",
    institution: "RN Shetty PU College, Kundapura",
    description: "Core science coursework establishing standard logical and mathematics systems."
  },
  {
    period: "Completed",
    degree: "10th Grade (SSLC)",
    institution: "GHS Siddapur",
    description: "Secondary school education credentials."
  }
];

export const activitiesData = {
  exhibitions: [
    "Project Exhibitions & events",
    "Tech Manthan IT Model Event"
  ],
  competitions: [
    "Quiz Challenges",
    "Type Speeding",
    "IT Manager",
    "Ungoogle Challenges",
    "Poster Making",
    "Coding Competitions"
  ]
};

export const certificationsData = [
  { name: "Data Science", provider: "[ADD PROVIDER]", date: "[ADD DATE]" },
  { name: "DevOps", provider: "[ADD PROVIDER]", date: "[ADD DATE]" },
  { name: "Machine Learning", provider: "[ADD PROVIDER]", date: "[ADD DATE]" },
  { name: "Other Tech Courses", provider: "[ADD PROVIDER]", date: "[ADD DATE]" }
];
