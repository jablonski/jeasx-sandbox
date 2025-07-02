import * as cheerio from "cheerio";
import * as prettier from "prettier";
import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ request, reply }) {
  if (request.query["text"] === "plain") {
    reply.header("content-type", "text/plain; charset=utf-8");
  }

  this.responseHandler = async (payload) => {
    if (typeof payload === "string") {
      return await prettify(
        request.query["source"] === "raw"
          ? payload
          : extractInlineStyles(payload)
      );
    } else {
      return payload;
    }
  };

  return (
    <Layout title="Extract inline styles with Cheerio">
      <div style="--pico-h1-color:orange; text-align: center">
        <h1 class="headline">Extract inline styles with cheerio.js</h1>
      </div>
      <p style="color:green; text-align:center">
        Jeasx allows you to post-process the resulting HTML output via a
        response-handler. Have a look at the source to see how things are wired
        up. This is an example for how to use{" "}
        <a href="https://cheerio.js.org" target="_blank">
          cheerio.js
        </a>{" "}
        to extract inline styles from resulting HTML.
      </p>
      <div style="display: flex; flex-direction: row; gap: 1rem; justify-content: center;">
        <div style="width:50%">
          <h3 style="text-align:center">Original source</h3>
          <iframe
            src={`?text=plain&source=raw`}
            style="width: 100%; height: 300px; border: 1px solid lightgray;"
          ></iframe>
        </div>
        <div style="width:50%">
          <h3 style="text-align:center">Rewritten markup</h3>
          <iframe
            src={`?text=plain`}
            style="width: 100%; height: 300px; border: 1px solid lightgray;"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
}

function extractInlineStyles(html) {
  const declarations = new Map();
  const $ = cheerio.load(html);
  let index = 0;

  $("*[style]").each((_, element) => {
    for (const declaration of $(element)
      .attr("style")
      .split(";")
      .map((item) =>
        item
          .trim()
          .split(":", 2)
          .map((item) => item.trim())
          .join(":")
      )) {
      if (!declaration) {
        continue;
      }
      if (!declarations.has(declaration)) {
        declarations.set(declaration, index++);
      }
      $(element).addClass("c" + declarations.get(declaration));
    }
    $(element).removeAttr("style");
  });

  const styles = declarations
    .entries()
    .map(([k, v]) => {
      return `.c${v} {${k}}`;
    })
    .toArray()
    .join("\n");
  $("head").append(`<style>${styles}</style>`);
  return $.html();
}

async function prettify(html) {
  return await prettier.format(html, {
    parser: "html",
  });
}
