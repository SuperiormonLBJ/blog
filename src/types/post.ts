export interface Post {
  id: string;
  title: string;
  description: string;
  date: Date;
  link: string;
  tags: string[];
  category: string;
  image: string;
  featured: boolean;
  content?: string;
}

export interface FeaturedPost extends Post {
  featured: true;
} 