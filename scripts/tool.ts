import fs from "node:fs";
import z from "zod";
import { decrypt, encrypt } from "./encrypt";
import { env } from "./env";

const { PASSWORD } = env;

const [, , mode, input, output] = z
  .tuple([
    z.unknown(),
    z.unknown(),
    z.enum(["encrypt", "decrypt"]),
    z.string(),
    z.string(),
  ])
  .parse(process.argv);

const data = fs.readFileSync(input);
const converted =
  mode === "encrypt" ? encrypt(PASSWORD, data) : decrypt(PASSWORD, data);
fs.writeFileSync(output, converted);
