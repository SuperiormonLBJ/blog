import { FeaturedPost } from '@/types/post';

export const featuredPosts: FeaturedPost[] = [
  {
    id: "1",
    title: "Terminal-Based Transaction Management System for Bank",
    description: "A terminal-based banking system built in Java with PostgreSQL, featuring role-based access (Admin/Teller/Customer), secure authentication, transaction management, and a user-friendly CLI interface with audio feedback. Uses Docker for database deployment and Maven for build management.",
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
    title: "The Art of Clean Code: Best Practices for Modern Developers",
    description: "Explore essential clean code principles and practices that every developer should know, with practical examples and real-world applications.",
    date: new Date("2024-03-10"),
    link: "/blog/clean-code-practices",
    tags: ["Clean Code", "Best Practices", "Software Development", "Programming"],
    category: "Programming",
    image: "/blog/clean-code.jpg",
    featured: true,
    content: "Full blog post content here..."
  },
  {
    id: "3",
    title: "Mastering TypeScript: Advanced Types and Patterns",
    description: "Dive deep into TypeScript's advanced type system, exploring complex type patterns, generics, and type utilities for robust type-safe applications.",
    date: new Date("2024-03-05"),
    link: "/blog/typescript-advanced-patterns",
    tags: ["TypeScript", "JavaScript", "Programming", "Web Development"],
    category: "Development",
    image: "/blog/typescript.jpg",
    featured: true,
    content: "Full blog post content here..."
  }
]; 