import {z} from "zod";
import {Prisma} from "@/prisma/generated/client";


export const photoEntitySchema = z.object({
  reference_id: z.string().optional(),
  is_published: z.boolean(),
  title: z.string(),
  description: z.string().nullable(),
  image_url: z.string(),
  taken_at: z.date().nullable(),
  uploaded_at: z.date().optional(),
  location: z.string().optional(),
});

export type PhotoEntity = z.infer<typeof photoEntitySchema>;


export const createPhotoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image_url: z.string().url("Valid image URL is required"),
  location: z.string().nullish(),
  is_published: z.boolean(),
  taken_at: z.string()
});

export type CreatePhoto = z.infer<typeof createPhotoSchema>;

export const getPhotoEntityFromCreatePhoto = (data: CreatePhoto): PhotoEntity => ({
  is_published: data.is_published,
  title: data.title,
  description: data.description,
  image_url: data.image_url,
  taken_at: data.taken_at ? new Date(data.taken_at) : new Date(),
  location: data.location ? data.location : "Not Known"
});

export const updatePhotoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image_url: z.string().url("Valid image URL is required"),
  location: z.string().optional(),
  camera_details: z.string().optional(),
  content: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
  author: z.string().optional()
});

export type UpdatePhoto = z.infer<typeof updatePhotoSchema>;