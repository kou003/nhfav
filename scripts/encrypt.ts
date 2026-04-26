import crypto from "node:crypto";
import zlib from "node:zlib";

const ALGO = "aes-256-gcm";
const SALT_LEN = 16;
const IV_LEN = 12;
const KEY_LEN = 32;
const ITERATIONS = 100000;

export function encrypt(password: string, data: Buffer) {
  const compressed = zlib.gzipSync(data);

  const salt = crypto.randomBytes(SALT_LEN);
  const key = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, "sha256");

  const iv = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv(ALGO, key, iv);

  const encrypted = Buffer.concat([cipher.update(compressed), cipher.final()]);

  const tag = cipher.getAuthTag();

  return Buffer.concat([salt, iv, tag, encrypted]);
}

export function decrypt(password: string, encryptedData: Buffer) {
  const salt = encryptedData.subarray(0, SALT_LEN);
  const iv = encryptedData.subarray(SALT_LEN, SALT_LEN + IV_LEN);
  const tag = encryptedData.subarray(SALT_LEN + IV_LEN, SALT_LEN + IV_LEN + 16);
  const ciphertext = encryptedData.subarray(SALT_LEN + IV_LEN + 16);

  const key = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, "sha256");

  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);
  return zlib.gunzipSync(decrypted);
}
