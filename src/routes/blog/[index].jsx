import Layout from "../Layout";
import data from "./data.json";

/**
 * @param {import("../types").RouteProps} props
 */
export default function BlogIndex({ request, reply }) {
  const posts = request.cookies["posts"]
    ? JSON.parse(request.cookies["posts"])
    : data;
  reply.setCookie("posts", JSON.stringify(posts), {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
  });

  return (
    <Layout title="Blog">
      <h1 class="center">Blog posts</h1>
      <section class="center">
        <a href="/blog/post">Submit New Post</a>
        <br />
        (Login: demo/demo)
      </section>
      {posts.map(({ slug, date, author, title }) => (
        <article>
          <header>
            <time>
              {new Date(date).toLocaleDateString("en-EN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </header>
          <main>
            <h2>
              <a href={slug}>{this.escape(title)}</a>
            </h2>
          </main>
          <footer>{author}</footer>
        </article>
      ))}
    </Layout>
  );
}
