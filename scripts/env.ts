import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH_DEFAULT = path.resolve(__dirname, "../public/data.enc");
const WAIT_MS_DEFAULT = 5000; // 5 seconds

const envSchema = z.object({
  PASSWORD: z.string(),
  API_KEY: z.string(),
  API_ENDPOINT: z.url(),
  MAIN_ORIGIN: z.url(),
  THUMBNAIL_ORIGINS: z
    .string()
    .transform((s) => s.split(","))
    .pipe(z.array(z.url())),
  DATA_PATH: z.string().default(DATA_PATH_DEFAULT),
  WAIT_MS: z
    .string()
    .transform((str) => parseInt(str, 10))
    .default(WAIT_MS_DEFAULT),
});

export const env = envSchema.parse(process.env);
