// Import project images
import influenceNetImage from "../assets/images/InfluenceNet.webp";
import codecircuitImage from "../assets/images/Codecircuit.webp";
import quizAppImage from "../assets/images/QuizApp.webp";
import zentryImage from "../assets/images/Zentry.webp";
import virtualTeachingAssistantImage from "../assets/images/VirtualTeachingAssistant.webp";
import projectAegisImage from "../assets/images/ProjectAegis.webp";
import itinaryGeneratorImage from "../assets/images/PujaTravels.webp";
import stackItImage from "../assets/images/StackIt.webp";
import PhoenixGCSImage from "../assets/images/PhoenixGCS.webp";
import CryptixImage from "../assets/images/Cryptix.webp";
import ARFLImage from "../assets/images/ARFL.webp";
import AmbrosiaImage from "../assets/images/Ambrosia.webp";
import ConstitutionImage from "../assets/images/ConstitutionAgent.webp";

const WebProjectList = [
  {
    id: "web-1",
    name: "InfluenceNet",
    tags: ["Flask", "Flask-SQLAlchemy", "Flask-Restful"],
    github_url:
      "https://github.com/23f2001281/Influencer-Sponsorship-System-v1-MAD-1",
    owner: "23f2001281",
    repo: "Influencer-Sponsorship-System-v1-MAD-1",
    description:
      "A platform to connect sponsors with influencers so that sponsors can get their products/services advertised and influencers can get monetary benefits.",
    points: [
      "Designed a role-based dashboard for streamlined campaign and ad request management.",
      "Implemented a dynamic ad request system with renegotiation capabilities.",
      "Developed search, filter, and analytics features for improved user insights.",
      "Created optimized RESTful API endpoints with secure authentication.",
    ],
    image: influenceNetImage,
    deployed_url: null,
  },
  {
    id: "web-2",
    name: "Zoom Trip - 3D Globe Explorer",
    tags: ["React", "Cesium", "Gemini AI"],
    github_url: "https://github.com/ayushptl1810/codecircuit",
    owner: "ayushptl1810",
    repo: "codecircuit",
    description:
      "A modern web application that helps users discover and explore places around the world using an interactive 3D globe visualization. ",
    points: [
      "Built an interactive 3D globe application to help users explore global destinations using CesiumJS, React and Gemini AI for intelligent place suggestions based on user preferences and activity types.",
      "Implemented real-time visualization with smooth camera transitions, animated globe interactions, and instant location highlighting.",
      "Developed dynamic filtering and search capabilities, allowing users to refine results with contextual filters per activity type.",
    ],
    image: codecircuitImage,
    deployed_url: "https://codecircuit-one.vercel.app/",
  },
  {
    id: "web-3",
    name: "Quiz Master App",
    tags: ["VueJs", "ChartJs", "Redux", "Celery", "Flask", "Flask-SQLAlchemy"],
    github_url: "https://github.com/23f2001281/Quiz-Master-App-V2",
    owner: "23f2001281",
    repo: "Quiz-Master-App-V2",
    description:
      "A comprehensive web-based quiz management system with real-time quiz taking, automated reporting, personalized summary generation and administrative controls.",
    points: [
      "Designed a role-based dashboard for students and administrators with secure JWT authentication.",
      "Implemented real-time quiz workflows with timer functionality, answer tracking, and instant scoring.",
      "Built content management tools for subjects, chapters, quizzes, and student records.",
      "Developed automated reporting and analytics with Celery background tasks and interactive Chart.js dashboards.",
    ],
    image: quizAppImage,
    deployed_url: null,
  },
  {
    id: "web-4",
    name: "Itinary Generator",
    tags: [
      "NextJs",
      "TailwindCSS",
      "Cesium",
      "CrewAI",
      "LangChain",
      "Pydantic",
      "FastAPI",
    ],
    github_url: "https://github.com/JayGuri/Codeshastra_XI_PUJA",
    owner: "JayGuri",
    repo: "Codeshastra_XI_PUJA",
    description:
      "An innovative travel planning platform that combines immersive 3D visualization with AI-powered itinerary generation.",
    points: [
      "Developed the Community feature, enabling interactive user engagement through a dedicated platform for discussions and content sharing.",
      "Implemented the Scrapbook component, allowing users to post and share memorable events.",
      "Debugged critical issues on the home page, enhancing load speed and user experience.",
    ],
    image: itinaryGeneratorImage,
    deployed_url: null,
  },
  {
    id: "web-5",
    name: "StackIt - Community Q&A Forum",
    tags: ["NextJs", "TailwindCSS", "SocketIO", "JWT", "Express"],
    github_url: "https://github.com/HarshilForWork/Odoo_JBBR",
    owner: "HarshilForWork",
    repo: "Odoo_JBBR",
    description:
      "A modern, feature-rich Q&A forum for asking questions, sharing knowledge, and building a community around knowledge exchange.",
    points: [
      "Designed a role-based Q&A platform with secure JWT authentication, user profiles, and rich content editor supporting images, tags, and edit tracking.",
      "Implemented real-time updates and notifications via Socket.IO for answers, votes, and content interactions.",
      "Built an admin dashboard for user management, content moderation, analytics, and global announcements.",
      "Integrated search, filtering, and pagination workflows for efficient content discovery and seamless user experience.",
    ],
    image: stackItImage,
    deployed_url: null,
  },
  {
    id: "web-6",
    name: "Zentry Clone",
    tags: ["HTML", "CSS", "JavaScript"],
    github_url: "https://github.com/ayushptl1810/zentryclone",
    owner: "ayushptl1810",
    repo: "zentryclone",
    description:
      "A responsive and animated landing page for Zentry, a gaming platform",
    points: [
      "Developed a basic clone of Zentry.com, replicating core UI components and layout.",
      "Implemented multiple animations using pure CSS, enhancing user experience with smooth transitions and effects.",
      "A clean, dark-themed design with a focus on user experience.",
    ],
    image: zentryImage,
    deployed_url: "https://zentryclone-one.vercel.app/",
  },
  {
    id: "web-8",
    name: "Project Aegis",
    tags: [
      "FastAPI",
      "MERN",
      "Razorpay",
      "WebSockets",
      "Redis",
      "Transformers",
    ],
    github_url: "https://github.com/ayushptl1810/MumbaiHacksJBBR",
    owner: "ayushptl1810",
    repo: "ProjectAegis",
    description:
      "An end-to-end fact-checking and media literacy platform that monitors rumours in real time, debunks them using AI, and offers curated educational modules.",
    points: [
      "Developed a real-time rumour monitoring system with AI-driven debunking and confidence scoring.",
      "Built a personalized educational platform featuring interactive modules and domain-based content filtering.",
      "Integrated a role-based subscription model (Free, Pro, Enterprise) using Razorpay for payment processing.",
      "Implemented a multi-modal verification chatbot supporting text, image, audio and video analysis for misinformation detection.",
      "Developed a Chrome extension for real-time browsing monitoring, automatically alerting users to potential misinformation and linking to verified debunks.",
    ],
    image: projectAegisImage,
    deployed_url: "https://mumbai-hacks-jbbr-u5g4.vercel.app/",
  },
  {
    id: "web-9",
    name: "Phoenix Ground Control Station",
    tags: [
      "NextJs",
      "TailwindCSS",
      "FastAPI",
      "Python",
      "Google Gemini",
      "YOLO",
      "Mavlink",
    ],
    github_url: "https://github.com/DJSPhoenix/SAE-Aerothon-GCS-25",
    owner: "DJSPhoenix",
    repo: "SAE-Aerothon-GCS-25",
    description:
      "A high-performance Ground Control Station (GCS) system designed for autonomous drone fleet management, featuring advanced mission planning and a dual-engine AI architecture for versatile object detection.",
    points: [
      "Engineered a flexible AI pipeline supporting both Google Gemini for contextual analysis and YOLO for high-speed, real-time inference.",
      "Developed a high-throughput FastAPI backend to manage concurrent telemetry streams and command execution for multiple drones.",
      "Implemented complex waypoint mission planning and dynamic path optimization algorithms for autonomous navigation.",
      "Architected a scalable communication layer using Mavlink to ensure reliable fleet synchronization and control.",
    ],
    image: PhoenixGCSImage,
    deployed_url: null,
  },
  {
    id: "web-10",
    name: "AMBROSIA - Global Flood Intelligence Platform",
    tags: [
      "React",
      "Vite",
      "CesiumJS",
      "TailwindCSS",
      "Zustand",
      "Framer Motion",
      "FastAPI",
    ],
    github_url: "https://github.com/JayGuri/LastStrawHackX",
    owner: "JayGuri",
    repo: "LastStrawHackX",
    description:
      "A full-stack flood intelligence platform fusing satellite SAR imagery, LSTM deep learning forecasting, road-network graph analysis, and an immersive 3D globe frontend for global flood detection and lifeline infrastructure assessment.",
    points: [
      "Built a cinematic scroll-driven landing page with 240 pre-rendered animation frames, LERP-based Apple-style scroll interpolation, and Framer Motion section transitions.",
      "Developed a three-view CesiumJS 3D globe interface supporting flood detection, district-level risk scoring with population-scaled markers, and lifeline infrastructure point rendering with type-coded symbology.",
      "Implemented a full JWT authentication flow with Google OAuth, token blacklisting, and a React SPA routing system with auth guards — all served via a Vercel serverless FastAPI backend.",
      "Integrated a jsPDF report generator and Recharts analytics dashboard within a historical flood run explorer, enabling users to review SAR imagery, patch-level data, and AI-generated insights.",
    ],
    image: AmbrosiaImage,
    deployed_url: "https://last-straw-ps-6.vercel.app",
  },
  {
    id: "web-11",
    name: "Cryptix - AI-Powered Cyber Defense Platform",
    tags: [
      "React",
      "Vite",
      "TailwindCSS",
      "FastAPI",
      "SHAP",
      "Transformers",
      "Twilio",
    ],
    github_url: "https://github.com/ayushptl1810/KES-Hack",
    owner: "ayushptl1810",
    repo: "KES-Hack",
    description:
      "A multi-layered cyber defense platform combining ML-based threat detection, explainable AI, and a Chrome extension to protect against phishing, deepfakes, voice scams, and prompt injection attacks.",
    points: [
      "Developed the React dashboard frontend covering nine threat monitoring pages — Phishing, Voice, Email, Deepfake, XAI, Prompt Guard, Mitigation, and Pricing — with a shared sidebar, metric cards, and a token-level SHAP heatmap visualization.",
      "Built the PhishGuard Chrome extension (Manifest V3) with real-time URL interception, Gmail DOM parsing for automatic email threat banners, and live textarea monitoring for prompt injection pattern detection.",
      "Implemented a multi-signal score fusion engine combining rule-based heuristics (40%) and DistilBERT ML scoring (60%), with user vulnerability profiling and false positive feedback collection for continuous learning.",
      "Integrated real-time voice scam interception via Twilio webhooks with SSE-streamed live call updates to the dashboard and automated WhatsApp alerts on high-risk calls.",
    ],
    image: CryptixImage,
    deployed_url: "https://wingineers.vercel.app",
  },
];

const AIProjectList = [
  {
    id: "ai-1",
    name: "Virtual Teaching Assistant",
    tags: ["FastAPI", "Pinecone", "BS4", "Playwright"],
    github_url: "https://github.com/ayushptl1810/TDS-PROJECT-1",
    owner: "ayushptl1810",
    repo: "TDS-PROJECT-1",
    description:
      "A virtual teaching assistant for the Tools in Data Science (TDS) course at IIT Madras, powered by Pinecone vector search and Google's Gemini AI.",
    points: [
      "Built Robust Web and Forum Scrapers: Extracted structured content and metadata from both Markdown course files and Discourse forums, ensuring seamless integration and high-quality downstream data processing.",
      "Deployed Scalable Vector Search Infrastructure: Deployed scalable vector search infrastructure using Pinecone and LLaMA v2 embeddings after migrating from FAISS and Sentence Transformers, with optimized batch upserts, rate-limit handling, and metadata-aware indexing for efficient, large-scale semantic search.",
      "Implemented Adaptive, TF-IDF-Driven Search Logic: Developed a hybrid search algorithm that dynamically learns keyword weights, chunks and ranks context intelligently, and fuses course and forum content to return rich, relevant results, which are then passed to Gemini AI for final answer generation.",
    ],
    image: virtualTeachingAssistantImage,
    deployed_url: "https://virtual-teaching-assistant-iitm.streamlit.app/",
  },
  {
    id: "ai-2",
    name: "Data Analyst Agent",
    tags: [
      "FastAPI",
      "LangChain",
      "CrewAI",
      "Pydantic",
      "Pinecone",
      "Mammoth",
      "PyMuPDF",
      "PDFPlumber",
      "BS4",
      "Playwright",
    ],
    github_url: "https://github.com/23f2001281/Data-Analyst-Agent",
    owner: "23f2001281",
    repo: "Data-Analyst-Agent",
    description:
      "An AI-powered Data Analyst Agent that connects to diverse data sources, performs advanced analysis, and delivers valuable insights from databases, PDFs, or the web.",
    points: [
      "Built an AI-powered Data Analyst Agent with CrewAI, FastAPI, and LangChain to analyze SQL databases, PDFs, and web data through natural language queries.",
      "Implemented semantic search with Pinecone vector embeddings and ONNX-optimized All-MiniLM-L6-v2 model for efficient document retrieval and intelligent chunking.",
      "Developed data visualization and analysis workflows using pandas and chart generation for trend detection and actionable insights.",
      "Integrated web scraping, PDF parsing, and REST API endpoints, enabling seamless data ingestion, interaction, and integration with external applications.",
    ],
    image: null,
    deployed_url: null,
  },
  {
    id: "ai-3",
    name: "Multi-Label Emotion Classification",
    tags: ["FastAPI", "TensorFlow", "Transformers", "Docker", "WandB"],
    github_url: "https://github.com/23f2001281/DL-GenAI-Project-Sept",
    owner: "23f2001281",
    repo: "DL-GenAI-Project-Sept",
    description:
      "A robust multi-label text classification system capable of detecting multiple emotions (Anger, Fear, Joy, Sadness, Surprise) simultaneously using fine-tuned RoBERTa transformers.",
    points: [
      "Architected State-of-the-Art NLP Models: Benchmarked and fine-tuned multiple Transformer architectures (RoBERTa, BERT, DeBERTa) against RNNs, achieving a superior Macro F1 score of 0.852 with the RoBERTa Base model.",
      "Optimized Training for Imbalanced Data: Implemented weighted binary cross-entropy loss and custom per-label threshold tuning to address dataset imbalance, ensuring high sensitivity even for minority emotion classes.",
      "Production-Ready API Deployment: Developed a containerized FastAPI service for real-time inference, featuring efficient tokenization strategies, input validation, and scalable deployment configurations for cloud environments.",
    ],
    image: null,
    deployed_url:
      "https://huggingface.co/Meshyboi/Multi-Emotion-Classification",
  },
  {
    id: "ai-4",
    name: "Project Aegis",
    tags: [
      "FastAPI",
      "MERN",
      "Razorpay",
      "WebSockets",
      "Redis",
      "Transformers",
    ],
    github_url: "https://github.com/ayushptl1810/MumbaiHacksJBBR",
    owner: "ayushptl1810",
    repo: "ProjectAegis",
    description:
      "An end-to-end fact-checking and media literacy platform that monitors rumours in real time, debunks them using AI, and offers curated educational modules.",
    points: [
      "Developed a real-time rumour monitoring system with AI-driven debunking and confidence scoring.",
      "Built a personalized educational platform featuring interactive modules and domain-based content filtering.",
      "Integrated a role-based subscription model (Free, Pro, Enterprise) using Razorpay for payment processing.",
      "Implemented a multi-modal verification chatbot supporting text, image, audio and video analysis for misinformation detection.",
      "Developed a Chrome extension for real-time browsing monitoring, automatically alerting users to potential misinformation and linking to verified debunks.",
    ],
    image: projectAegisImage,
    deployed_url: "https://mumbai-hacks-jbbr-u5g4.vercel.app/",
  },
  {
    id: "ai-5",
    name: "Samvidha - Constitutional Intelligence Agent",
    tags: [
      "React",
      "FastAPI",
      "LangGraph",
      "Neo4j",
      "Qdrant",
      "Groq",
      "Three.js",
    ],
    github_url: "https://github.com/ayushptl1810/ConstitutionAgent",
    owner: "ayushptl1810",
    repo: "ConstitutionAgent",
    description:
      "A GraphRAG-powered constitutional research platform that transforms the Indian Constitution into a queryable intelligence network, enabling users to trace the evolution of laws across decades of amendments.",
    points: [
      "Architected a multi-agent LangGraph orchestration pipeline combining Neo4j graph traversal and Qdrant vector search, fused via a BGE-Reranker model for high-precision hybrid retrieval.",
      "Built a real-time streaming interface using Server-Sent Events (SSE) to broadcast live agent execution traces and legal reasoning steps to the frontend terminal.",
      "Developed an interactive 3D constitutional knowledge graph using react-force-graph-3d (Three.js), with color-coded nodes, a scrubbable temporal timeline, and a mobile-responsive adaptive layout.",
      "Implemented a zero-config lifecycle manager that auto-provisions Neo4j and Qdrant Docker containers locally and switches to Aura/Cloud connections in production without code changes.",
    ],
    image: ConstitutionImage,
    deployed_url: "https://constitution-agent.vercel.app",
  },
  {
    id: "ai-6",
    name: "ARFL - Asynchronous Robust Federated Learning",
    tags: [
      "React",
      "Vite",
      "FastAPI",
      "PyTorch",
      "WebSockets",
      "MongoDB",
      "Terraform",
    ],
    github_url: "https://github.com/JayGuri/DevHacks",
    owner: "JayGuri",
    repo: "DevHacks",
    description:
      "A production-ready asynchronous federated learning framework with Byzantine fault tolerance, differential privacy, and a real-time React monitoring dashboard for distributed ML training.",
    points: [
      "Developed the real-time React + Vite monitoring dashboard that streams live training metrics, client trust scores, and aggregation events from the server via Server-Sent Events (SSE).",
      "Built the FastAPI backend managing WebSocket-based client connections, asynchronous buffer aggregation, and JWT-secured node registration backed by MongoDB.",
      "Implemented staleness-aware Byzantine defense combining an L2-Norm Gatekeeper with advanced aggregation strategies (Krum, Trimmed Mean, Coordinate Median) and dynamic client trust scoring.",
      "Integrated client-side Differential Privacy via DP-SGD (Opacus) and a configurable network degradation simulator supporting packet loss, latency injection, and partition scenarios.",
    ],
    image: ARFLImage,
    deployed_url: null,
  },
];

const ProjectList = [...WebProjectList, ...AIProjectList];
export { WebProjectList, AIProjectList, ProjectList };
