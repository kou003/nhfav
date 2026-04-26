import { execSync } from "node:child_process";
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function getCommitVersion() {
  if (process.env.VITE_COMMIT_SHA) {
    return process.env.VITE_COMMIT_SHA;
  }

  try {
    return execSync("git rev-parse --short HEAD", { encoding: "utf-8" }).trim();
  } catch {
    return "unknown";
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  base: process.env.VITE_BASE_PATH || "/",
  define: {
    __APP_COMMIT_VERSION__: JSON.stringify(getCommitVersion()),
  },
  css: {
    modules: {
      localsConvention: "dashes",
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
});
