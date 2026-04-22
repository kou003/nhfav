import fs from "node:fs";
import { decrypt, encrypt } from "./encrypt";

export function loadData<T>(filepath: string, password: string): T {
  const encryptedData = fs.readFileSync(filepath);
  const decryptedData = decrypt(password, encryptedData);
  const decryptedText = decryptedData.toString("utf-8");
  return JSON.parse(decryptedText);
}

export function saveData<T>(filepath: string, password: string, data: T) {
  const encrypted = encrypt(
    password,
    Buffer.from(JSON.stringify(data), "utf-8"),
  );
  fs.writeFileSync(filepath, encrypted);
  console.log(`Data saved to ${filepath}`);
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
