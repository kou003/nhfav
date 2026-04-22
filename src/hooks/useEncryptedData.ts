import { useEffect, useState } from "react";
import { type Data, dataSchema } from "../types/data";

const ALGO = "AES-GCM";
const SALT_LEN = 16;
const IV_LEN = 12;
const KEY_LEN = 32;
const ITERATIONS = 100000;

export type EncryptState = "idle" | "loading" | "done";

export function useEncryptedData(url: string, password: string) {
  const [state, setState] = useState<EncryptState>("idle");
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!password) {
      setState("idle");
      return;
    }

    async function fetchData(password: string) {
      try {
        setState("loading");
        setError(null);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`http error: ${response.status}`);
        }
        const encryptedData = await response.arrayBuffer();
        const decryptedData = await decrypt(
          password,
          new Uint8Array(encryptedData),
        );

        const dataText = new TextDecoder().decode(decryptedData);
        const data = dataSchema.parse(JSON.parse(dataText));
        setData(data);

        setState("done");
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setState("idle");
      }
    }

    fetchData(password);
  }, [url, password]);

  return [state, data, error] as const;
}

async function decrypt(
  password: string,
  encryptedData: Uint8Array,
): Promise<Uint8Array> {
  const salt = encryptedData.slice(0, SALT_LEN);
  const iv = encryptedData.slice(SALT_LEN, SALT_LEN + IV_LEN);
  const tag = encryptedData.slice(SALT_LEN + IV_LEN, SALT_LEN + IV_LEN + 16);
  const ciphertext = encryptedData.slice(SALT_LEN + IV_LEN + 16);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: ALGO, length: KEY_LEN * 8 },
    false,
    ["decrypt"],
  );

  try {
    const decrypted = await crypto.subtle.decrypt(
      {
        name: ALGO,
        iv,
        tagLength: 128,
      },
      key,
      new Uint8Array([...ciphertext, ...tag]),
    );

    return new Uint8Array(decrypted);
  } catch (err) {
    throw new Error("Decryption failed", {
      cause: err instanceof Error ? err : new Error(String(err)),
    });
  }
}
