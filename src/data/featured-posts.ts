import { FeaturedPost } from '@/types/post';

export const featuredPosts: FeaturedPost[] = [
  {
    id: "1",
    title: "Terminal-Based Transaction Management System for Bank",
    description: "A terminal-based banking system built with Java and PostgreSQL, featuring role-based access, secure authentication, transaction management, and a user-friendly CLI interface with audio feedback.",
    date: new Date("2023-09-15"),
    link: "https://github.com/SuperiormonLBJ/java-capstone",
    tags: ["java.png", "maven.png", "bash.png", "docker.png","spring.png"],
    category: "Backend",
    image: "/Tech-Project/java-capstone.png",
    featured: true,
    content: "Full blog post content here..."
  },
  {
    id: "2",
    title: "Role-Based Banking Management System",
    description: "A secure banking management system with role-based access control, designed to streamline operations, protect user data, and ensure reliable financial record-keeping.",
    date: new Date("2023-10-15"),
    link: "https://github.com/SuperiormonLBJ/capstone3",
    tags: ["java.png", "html.png", "css-3.png", "docker.png","spring.png","postgres.png"],
    category: "Full-Stack",
    image: "/Tech-Project/capstone3.png",
    featured: true,
    content: "Full blog post content here..."
  },
  {
    id: "3",
    title: "LLM-Based Bitbucket Code Reviewer",
    description: "A interactive platform for bitbucket pull request with AI-powered reviews, providing comprehensive feedback on code quality, syntax errors, and logic issues.",
    date: new Date("2024-10-1"),
    link: "https://github.com/SuperiormonLBJ/PR-AI-Code-Reviewer",
    tags: ["python.png", "ts.png", "tailwindCSS.png", "docker.png","nextjs.png","postgres.png","bitbucket.png","vercel.png"],
    category: "AI/Full-Stack",
    image: "/Tech-Project/hackathon.png",
    featured: true,
    content: "Full blog post content here..."
  },
  {
    id: "4",
    title: "AI Agent with n8n on JIRA Integration",
    description: "AI agent workflow by n8n on JIRA integration, showcasing the feasible AI solution on JIRA workflow automation on the aspect of Creat/Search/Update. All is possible now with a piece of information in chat window",
    date: new Date("2025-3-1"),
    link: "https://www.youtube.com/watch?v=odSHcgLP-GE",
    tags: ["n8n.png", "prompt-engineering.png","jira.png"],
    category: "AI",
    image: "/Tech-Project/n8n.png",
    featured: true,
    content: "Full blog post content here..."
  },
  {
    id: "5",
    title: "Prompt Library",
    description: "Prompt Library built with React+Nodejs, managing the lifecycle of prompt template inside bitbucket",
    date: new Date("2025-4-1"),
    link: "https://github.com/Jianwei07/prompt-temp-v1",
    tags: ["ts.png","nodejs.png","react.png","bitbucket.png","nodejs.png","prompt-engineering.png"],
    category: "AI/Full-Stack",
    image: "/Tech-Project/promptlibrary.png",
    featured: true,
    content: "Full blog post content here..."
  },
  {
    id: "6",
    title: "Personal Blog",
    description: "Personal Portfolio built with Next.js and Tailwind CSS",
    date: new Date("2025-5-15"),
    link: "vercel link.....",
    tags: ["ts.png", "tailwindCSS.png", "vercel.png","nextjs.png"],
    category: "Frontend",
    image: "/Tech-Project/blog.png",
    featured: true,
    content: "Full blog post content here..."
  }
];