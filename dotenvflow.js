import fs from "fs";

let envFiles = undefined;

export default function dotenvflow() {
  if (envFiles === undefined) {
    console.log("BUILDING ENV");
    const dotFiles = [".env.defaults", ".env", ".env.local"];

    if (process.env.NODE_ENV) {
      dotFiles.push(
        `.env.${process.env.NODE_ENV}`,
        `.env.${process.env.NODE_ENV}.local`
      );
    }

    envFiles = dotFiles.filter((file) => {
      return fs.existsSync(file);
    });
  }

  envFiles.forEach((file) => {
    console.log(file);
    process.loadEnvFile(file);
  });
}
