import { ReactNode } from 'react';

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: ReactNode;
}
