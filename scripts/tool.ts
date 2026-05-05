import crypto from "node:crypto";
import fs from "node:fs";
import z from "zod";
import { decrypt, encrypt } from "./encrypt";
import { env } from "./env";

const { PASSWORD } = env;

const modeSchema = z.enum(["encrypt", "decrypt", "hash"]);

const [, , mode, input, output] = z
  .tuple([z.unknown(), z.unknown(), modeSchema, z.string(), z.string()])
  .parse(process.argv);

const data = fs.readFileSync(input);

function convert(mode: z.infer<typeof modeSchema>, data: Buffer) {
  if (mode === "hash") {
    const decrypted = decrypt(PASSWORD, data);
    return crypto.createHash("sha256").update(decrypted).digest("hex");
  }
  if (mode === "encrypt") {
    return encrypt(PASSWORD, data);
  }
  if (mode === "decrypt") {
    return decrypt(PASSWORD, data);
  }
  throw new Error("Invalid mode");
}

fs.writeFileSync(output, convert(mode, data));
