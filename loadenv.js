import { existsSync } from "node:fs";

/**
 * Load environment variables from .env* files
 *
 * @returns {void}
 */
export default function loadenv() {
  const files = [".env.defaults", ".env", ".env.local"];

  if (process.env.NODE_ENV) {
    files.push(
      `.env.${process.env.NODE_ENV}`,
      `.env.${process.env.NODE_ENV}.local`
    );
  }

  files.filter(existsSync).forEach((file) => {
    console.info(`🌿 Loading ${file}`);
    process.loadEnvFile(file);
  });
}
