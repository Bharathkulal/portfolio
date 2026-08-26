export const projectsData = [
  {
    id: "civicsolve",
    name: "CivicSolve",
    description: "Smart civic problem solving and public utility reporting platform.",
    status: "Live",
    statusType: "live", // live, dev, proto
    tags: ["React", "Node.js", "MongoDB", "Maps API"],
    problem: "[ CivicSolve: Problem Statement ]\nPublic infrastructure issues (like potholes, streetlights, or waste) often go unreported due to complex municipal channels. This module provides direct logging for citizens.",
    solution: "[ CivicSolve: Solution Architecture ]\nA responsive web client map mapping coordinates to a database. Uses local storage or basic web databases to report, categorize, and track resolution steps.",
    features: [
      "[ADD FEATURES]",
      "Geolocation tags for issue precision",
      "Real-time progress status dashboard",
      "Image upload/preview for damage description",
      "Administrative validation panel"
    ],
    learned: "Managing asynchronous state changes in frontend clients, storing relational records securely, and designing intuitive user experiences for public utility web apps.",
    github: "[ADD GITHUB URL]",
    demo: "[ADD DEMO URL]",
    image: "/images/projects/civicsolve.png"
  },
  {
    id: "bimbaai",
    name: "Bimba AI",
    description: "Vision intelligence and cognitive object classification model pipeline.",
    status: "In Development",
    statusType: "dev",
    tags: ["Python", "TensorFlow", "Computer Vision", "FastAPI"],
    problem: "[ Bimba AI: Problem Statement ]\nImage parsing and cognitive object classification are challenging to build as lightweight, accessible client services without heavy cloud dependencies.",
    solution: "[ Bimba AI: Solution Architecture ]\nA Python-driven pipeline testing neural frameworks to process local image assets, optimize resolution, and run bounding box predictions.",
    features: [
      "[ADD FEATURES]",
      "Modular image ingestion pipelines",
      "Core object categorization layers",
      "Real-time inference visualizer outputs",
      "Configurable parameter settings panel"
    ],
    learned: "Pre-processing image tensors and sizing constraints, evaluating confidence metrics and prediction matrices, and integrating native Python scripting frameworks.",
    github: "[ADD GITHUB URL]",
    demo: "[ADD DEMO URL]",
    image: "/images/projects/bimba-ai.png"
  },
  {
    id: "eduverseai",
    name: "EduVerse AI",
    description: "Adaptive teaching workflow platform and dynamic LLM tutor engine.",
    status: "Prototype",
    statusType: "proto",
    tags: ["Generative AI", "React", "Tailwind CSS", "LLM APIs"],
    problem: "[ EduVerse AI: Problem Statement ]\nTraditional educational frameworks present static, non-adaptive curricula. Learners encounter barriers when concepts do not adapt to current comprehension speeds.",
    solution: "[ EduVerse AI: Solution Architecture ]\nAn adaptive interface generating educational flows using large language model prompts to analyze answers and dynamically adjust text difficulty.",
    features: [
      "[ADD FEATURES]",
      "Dynamic generation of topical modules",
      "AI tutor assistant dialog interface",
      "Real-time comprehension tracking charts",
      "Instant quiz generation feedback layers"
    ],
    learned: "Structuring prompt structures to extract JSON formats from AI models, managing session histories efficiently without database overflow, and designing accessible text blocks.",
    github: "[ADD GITHUB URL]",
    demo: "[ADD DEMO URL]",
    image: "/images/projects/eduverse-ai.png"
  },
  {
    id: "novaai",
    name: "Nova AI",
    description: "Intelligent virtual assistant and local automation agent orchestrator.",
    status: "In Development",
    statusType: "dev",
    tags: ["LLM Integration", "Python", "Automation", "OS Utilities"],
    problem: "[ Nova AI: Problem Statement ]\nVirtual assistants often lack domain-specific execution power, running general search lookups rather than acting as systemic utility tools.",
    solution: "[ Nova AI: Solution Architecture ]\nAn orchestrator system matching user phrases to structured internal tools. Written in Python, calling automation layers.",
    features: [
      "[ADD FEATURES]",
      "Command line terminal control panel",
      "Context memory buffers for dialogue retention",
      "Direct local system execution plugins",
      "Modular script integrations"
    ],
    learned: "Creating custom intent parsing logic, standardizing utility modules across operating systems, and handling runtime exceptions during command executions.",
    github: "[ADD GITHUB URL]",
    demo: "[ADD DEMO URL]",
    image: "/images/projects/nova-ai.png"
  },
  {
    id: "scholarai",
    name: "Scholar AI",
    description: "Academic literature mining pipeline and contextual search index.",
    status: "Prototype",
    statusType: "proto",
    tags: ["Python", "Natural Language Processing", "Data Mining"],
    problem: "[ Scholar AI: Problem Statement ]\nStudents and researchers scan thousands of PDF documents to extract key insights. Manual scanning is highly time-consuming.",
    solution: "[ Scholar AI: Solution Architecture ]\nA document extraction pipeline parsing academic papers, extracting reference metadata, and outputting summaries.",
    features: [
      "[ADD FEATURES]",
      "Multi-document PDF parser modules",
      "Reference graph map extractor tools",
      "Bullet-point automatic summary engines",
      "Citation tracker exports"
    ],
    learned: "Working with PDF text stream layouts and structured data, token limit optimization for large context requests, and developing modular file upload systems.",
    github: "[ADD GITHUB URL]",
    demo: "[ADD DEMO URL]",
    image: "/images/projects/scholar-ai.png"
  },
  {
    id: "gymmanagement",
    name: "Gym Management System",
    description: "Membership portal, scheduling system, and analytical database manager.",
    status: "Live",
    statusType: "live",
    tags: ["MySQL", "Java", "JDBC", "Desktop Swing"],
    problem: "[ Gym Management: Problem Statement ]\nIndependent gyms require membership management, subscription scheduling, and trainer allocation logs without complex enterprise software.",
    solution: "[ Gym Management: Solution Architecture ]\nA database-driven application built using MySQL schemas, custom query logic, and a Java or web interface controller.",
    features: [
      "[ADD FEATURES]",
      "Client profile registration and subscription tracking",
      "Scheduling sheets for personal trainers",
      "Payment logging database records",
      "Weekly administration statistics panel"
    ],
    learned: "Designing normalized database schemas to prevent redundancy, writing optimized SQL join statements, and maintaining secure state records in localized apps.",
    github: "[ADD GITHUB URL]",
    demo: "[ADD DEMO URL]",
    image: "/images/projects/gym.png"
  },
  {
    id: "vbms",
    name: "VBMS",
    description: "Vehicle Booking & Monitoring System for fleet management.",
    status: "In Development",
    statusType: "dev",
    tags: ["React.js", "MongoDB", "Express", "Node.js"],
    problem: "[ VBMS: Problem Statement ]\nFleet vehicle scheduling is prone to booking conflicts, double allocations, and lack of real-time telemetry logs.",
    solution: "[ VBMS: Solution Architecture ]\nA React frontend dashboard binding fleet allocations to a MongoDB database, charting availability calendars.",
    features: [
      "[ADD FEATURES]",
      "Interactive booking calendar grid modules",
      "Conflict prevention validation filters",
      "Fleet availability visual status trackers",
      "Vehicle metadata registration forms"
    ],
    learned: "Building stateful calendar UI grids that update asynchronously, handling date/time comparison exceptions in databases, and custom component states management in React.",
    github: "[ADD GITHUB URL]",
    demo: "[ADD DEMO URL]",
    image: "/images/projects/vbms.png"
  }
];

export const skillsData = {
  frontend: ["HTML", "CSS", "JavaScript", "React.js (Beginner)"],
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
