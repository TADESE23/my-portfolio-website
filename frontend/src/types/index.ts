export interface Profile {
  id: number;
  name: string;
  title: string;
  about: string;
  profile_image: string | null;
  cv: string | null;
  email: string;
  phone: string;
  location: string;
  mission: string;
  vision: string;
  goals: string;
  achievements: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  description: string;
  current: boolean;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  current: boolean;
}

export interface Skill {
  id: number;
  name: string;
  percentage: number;
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'programming' | 'tools';
  icon: string;
}

export interface Technology {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  image: string | null;
  github_url: string;
  live_url: string;
  technologies_names: string[];
  features: string[];
  order: number;
  created_at: string;
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  image: string | null;
  description: string;
  url: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  category_name: string | null;
  category_details: Category | null;
  created_at: string;
  updated_at: string;
  views: number;
  is_published: boolean;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface Resume {
  id: number;
  title: string;
  file: string;
  is_active: boolean;
  uploaded_at: string;
}

export interface GithubRepo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface DashboardStats {
  projects_count: number;
  skills_count: number;
  blogs_count: number;
  messages_count: number;
  unread_messages: number;
}
