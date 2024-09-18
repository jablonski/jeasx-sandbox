import sharp from "sharp";

/**
 * @param {import("../types").RouteProps} props
 */
export default async function Image({ request, reply }) {
  if (request.method === "POST") {
    const file = await request.file();
    const format = file.fields["format"]["value"];
    const size = +file.fields["size"]["value"];
    const rotate = +file.fields["rotate"]["value"];
    reply.header("Content-Type", `image/${format}`);
    return await sharp(await file.toBuffer())
      .resize({
        width: size,
        height: size,
        position: "entropy",
      })
      .rotate(rotate)
      .toFormat(format, { quality: 70 })
      .toBuffer();
  } else {
    reply.status(404);
    return;
  }
}
