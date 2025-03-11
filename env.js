import { existsSync } from "node:fs";

export default function env() {
  const envFiles = [".env.defaults", ".env", ".env.local"];

  if (process.env.NODE_ENV) {
    envFiles.push(
      `.env.${process.env.NODE_ENV}`,
      `.env.${process.env.NODE_ENV}.local`
    );
  }

  envFiles
    .filter((file) => existsSync(file))
    .forEach((file) => {
      console.info(`🌻 Loading ${file}`);
      process.loadEnvFile(file);
    });
}

env();
