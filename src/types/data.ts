import { z } from "zod";

export const itemSchema = z.object({
  id: z.number(),
  media_id: z.string(),
  english_title: z.string(),
  japanese_title: z.string().nullish(),
  thumbnail: z.string(),
  thumbnail_width: z.number(),
  thumbnail_height: z.number(),
  num_pages: z.number().default(0),
  tag_ids: z.array(z.number()).default([]),
  blacklisted: z.boolean().default(false),
});

export type DataItem = z.infer<typeof itemSchema>;

export const dataSchema = z.object({
  items: z.array(itemSchema),
  origin: z.url().default("http://example.com"),
  thumbnailOrigins: z.array(z.url()).min(1).default(["http://example.com"]),
});

export type Data = z.infer<typeof dataSchema>;

export const dataListSchema = z.array(itemSchema).default([]);

export type DataList = z.infer<typeof dataListSchema>;

export const dataResponseSchema = z.object({
  result: z.array(itemSchema).default([]),
  num_pages: z.number().default(0),
  per_page: z.number().default(25),
  total: z.number().nullish(),
});

export type DataResponse = z.infer<typeof dataResponseSchema>;
