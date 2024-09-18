export default function Image({
  src,
  width = undefined,
  height = undefined,
  position = undefined,
  immutable = false,
  ...rest
}) {
  return (
    <img
      src={imagePath({ src, width, height, position, immutable })}
      {...rest}
    />
  );
}

export function imagePath({
  src,
  width,
  height,
  position = "",
  immutable = false,
}) {
  const version = !immutable ? `&version=${process.env.BUILD_TIME}` : "";
  return `/products/image?src=${src}&width=${width || ""}&height=${
    height || ""
  }&position=${position || ""}${version}`;
}
