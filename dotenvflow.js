import fs from "fs";
import path from "path";

export default function dotenvflow() {
  const envFiles = [".env.defaults", ".env", ".env.local"];

  if (process.env.NODE_ENV) {
    envFiles.push(
      `.env.${process.env.NODE_ENV}`,
      `.env.${process.env.NODE_ENV}.local`
    );
  }

  fs.readdirSync("dist").forEach((file) => console.log(file));

  envFiles
    .map((file) => path.resolve(process.cwd(), file))
    .filter((file) => {
      console.log(file, fs.existsSync(file));
      return fs.existsSync(file);
    })
    .forEach((file) => {
      process.loadEnvFile(file);
    });
}
