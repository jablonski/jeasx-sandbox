import { pathToRegexp } from "path-to-regexp";
import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ request, reply }) {
  const query = request.query;
  const path = query["path"];

  const options = {
    sensitive: query["sensitive"] === "on",
    end: query["end"] === "on",
    trailing: query["trailing"] === "on",
  };

  let regexp, error;
  try {
    regexp = pathToRegexp(path, options).regexp;
  } catch (e) {
    error = e.message;
  }

  return (
    <Layout
      title="Path-To-Regexp-Generator"
      description="Turn a path pattern into a regular expression"
    >
      <h1 class="center">Path-To-Regexp-Generator</h1>
      <p>
        The{" "}
        <a href="https://github.com/pillarjs/path-to-regexp" target="_blank">
          path-to-regexp
        </a>{" "}
        library is a utility for converting path patterns into regular
        expressions. It is commonly used in web applications for routing
        purposes, where you need to match URL paths to specific handlers or
        components.
      </p>
      <form action="." method="get">
        <input
          type="text"
          name="path"
          placeholder="/users/:id/delete"
          autofocus
          value={path}
        />
        <label>
          <input
            type="checkbox"
            name="sensitive"
            value="on"
            checked={options.sensitive}
          />
          Regular expression will be case sensitive.
        </label>
        <label>
          <input type="checkbox" name="end" value="on" checked={options.end} />
          Validate the match reaches the end of the string.
        </label>
        <label>
          <input
            type="checkbox"
            name="trailing"
            value="on"
            checked={options.trailing}
          />
          Allows optional trailing delimiter to match.
        </label>
        <button type="submit">Generate</button>
      </form>
      {path && (
        <p class="center">
          <code>
            {regexp && `/${regexp.source}/${regexp.flags}`}
            {error}
          </code>
        </p>
      )}
    </Layout>
  );
}
