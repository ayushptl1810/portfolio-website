// Import project images
import influenceNetImage from "../assets/images/InfluenceNet.png";
import codecircuitImage from "../assets/images/Codecircuit.png";
import quizAppImage from "../assets/images/QuizApp.png";
import zentryImage from "../assets/images/Zentry.png";
import todoListImage from "../assets/images/TodoList.png";
import virtualTeachingAssistantImage from "../assets/images/VirtualTeachingAssistant.png";
import projectAegisImage from "../assets/images/ProjectAegis.png";

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
    video: null,
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
    video: null,
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
    video: null,
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
    image: null,
    video: null,
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
    image: null,
    video: null,
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
    video: null,
    deployed_url: "https://zentryclone-one.vercel.app/",
  },
  {
    id: "web-7",
    name: "ToDo App",
    tags: ["NextJs", "MongoDB", "TailwindCSS", "Express"],
    github_url: "https://github.com/ayushptl1810/ToDoList",
    owner: "ayushptl1810",
    repo: "ToDoList",
    description:
      "A minimal full-stack To-Do application showcasing a clean CRUD API with a modern client UI. The project is split into a Next.js client and an Express + MongoDB server, designed for clarity, rapid iteration, and easy local replication.",
    points: [
      "Built a full-stack to-do application with Next.js (App Router), React, Express, and MongoDB (Mongoose), delivering clean RESTful CRUD endpoints and a schema-driven model for extensibility.",
      "Implemented a responsive, accessible UI with Tailwind CSS and React hooks, using Axios for API communication and @react-spring/web for smooth, animated list interactions and state changes.",
      "Engineered a configurable, deployment-ready setup using environment variables (e.g., MONGO_URI), CORS-enabled server, and a clear client/server monorepo for seamless local replication and cloud deployment.",
    ],
    image: todoListImage,
    video: null,
    deployed_url: "https://todolist-w5aa.onrender.com/",
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
    video: null,
    deployed_url: "https://mumbai-hacks-jbbr-u5g4.vercel.app/",
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
    video: "https://virtual-teaching-assistant-iitm.streamlit.app/",
    deployed_url: "https://tds-project-1-ujvv.onrender.com",
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
    video: null,
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
    video: null,
    deployed_url:
      "https://huggingface.co/Meshyboi/Multi-Emotion-Classification",
  },
];

const ProjectList = [...WebProjectList, ...AIProjectList];
export { WebProjectList, AIProjectList, ProjectList };
