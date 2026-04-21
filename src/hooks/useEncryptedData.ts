import { useEffect, useState } from "react";

const ALGO = "AES-GCM";
const SALT_LEN = 16;
const IV_LEN = 12;
const KEY_LEN = 32;
const ITERATIONS = 100000;

export function useEncryptedData(url: string, password: string) {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`http error: ${response.status}`);
        }
        const encryptedData = await response.arrayBuffer();
        const decryptedData = await decrypt(
          password,
          new Uint8Array(encryptedData),
        );

        setData(new TextDecoder().decode(decryptedData));
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    }

    fetchData();
  }, [url, password]);

  return { data, error };
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
