import fs from "fs";

export default function dotenvflow() {
  const envFiles = [".env.defaults", ".env", ".env.local"];

  if (process.env.NODE_ENV) {
    envFiles.push(
      `.env.${process.env.NODE_ENV}`,
      `.env.${process.env.NODE_ENV}.local`
    );
  }

  envFiles
    .map((file) => `./${file}`)
    .filter((file) => {
      console.log(file, fs.existsSync(file));
      return fs.existsSync(file);
    })
    .forEach((file) => {
      process.loadEnvFile(file);
    });
}
