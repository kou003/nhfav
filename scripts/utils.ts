import fs from "node:fs";
import { type DataList, dataListSchema } from "../src/types/data";
import { decrypt, encrypt } from "./encrypt";

export function loadDataList(filepath: string, password: string): DataList {
  try {
    const encryptedData = fs.readFileSync(filepath);
    const decryptedData = decrypt(password, encryptedData);
    const decryptedText = decryptedData.toString("utf-8");
    const validatedData = dataListSchema.parse(JSON.parse(decryptedText));
    return validatedData;
  } catch (err) {
    console.error("Error loading previous data:", err);
    return [];
  }
}

export function saveDataList(
  filepath: string,
  password: string,
  dataList: DataList,
) {
  const encrypted = encrypt(
    password,
    Buffer.from(JSON.stringify(dataList), "utf-8"),
  );
  fs.writeFileSync(filepath, encrypted);
  console.log(`Data saved to ${filepath}`);
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
