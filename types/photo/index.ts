import { Tag } from '@/prisma/generated/client'
import { z } from "zod";

export interface PhotoTag {
  tag: Tag
}

export const createPhotoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image_url: z.string().url("Valid image URL is required"),
  location: z.string().optional(),
  camera_details: z.string().optional(),
  content: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  is_published: z.boolean().default(false),
  priority: z.number().default(0),
  tags: z.array(z.string()).default([]),
  taken_at: z.string().optional(),
  published_at: z.string().optional(),
});

export type CreatePhoto = z.infer<typeof createPhotoSchema>;

export interface PhotoDTO {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  taken_at: Date | null;
  uploaded_at: Date;
  location: string | null;
  camera_details?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  author?: string;
  category?: string;
  is_published?: boolean;
  priority?: number;
  published_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  tags: PhotoTag[];
} 