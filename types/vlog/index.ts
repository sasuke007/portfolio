import { Tag } from '@/prisma/generated/client'
import { z } from "zod";

export interface VlogTag {
  tag: Tag
}

export const createVlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  video_url: z.string().url("Valid video URL is required"),
  thumbnail_url: z.string().url("Valid thumbnail URL is required"),
  duration: z.string().optional(),
  content: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  is_published: z.boolean().default(false),
  priority: z.number().default(0),
  tags: z.array(z.string()).default([]),
  published_at: z.string().optional(),
});

export type CreateVlog = z.infer<typeof createVlogSchema>;

export interface VlogDTO {
  id: number;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url?: string;
  duration?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  author?: string;
  category?: string;
  is_published: boolean;
  priority?: number;
  published_at: Date;
  created_at?: Date;
  updated_at?: Date;
  tags: VlogTag[];
} 