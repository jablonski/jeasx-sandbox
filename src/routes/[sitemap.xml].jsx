import sitemap from "./sitemap.json";

/**
 * @param {import("./types").RouteProps} props
 */
export default function Sitemap({ reply }) {
  reply.header("content-type", "text/xml; charset=utf-8");
  return (
    <>
      {`<?xml version="1.0" encoding="UTF-8"?>`}
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        {sitemap.map(({ links }) =>
          links
            .filter(({ path }) => path !== "/sitemap.xml")
            .map(({ path }) => (
              <url>
                <loc>https://expo.jeasx.dev{path}</loc>
              </url>
            ))
        )}
      </urlset>
    </>
  );
}
