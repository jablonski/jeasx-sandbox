import Layout from "../Layout";

/**
 * @this {import("../types").ThisContext}
 * @param {import("../types").RouteProps} props
 */
export default function BlogDetail({ request, reply }) {
  const slug = this.path.split("/").slice(2).join("");
  const blog = JSON.parse(request.cookies["posts"]).find(
    (post) => post.slug === slug
  );
  if (!blog) {
    reply.status(404);
    return;
  }

  return (
    <Layout title={blog.title}>
      <article>
        <header>
          <time>
            {new Date(blog.date).toLocaleDateString("en-EN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </header>
        <main>
          <h1>{this.escape(blog.title)}</h1>
          <p>{this.escape(blog.description)}</p>
          <p>{this.escape(blog.body)}</p>
        </main>
      </article>
      <section class="center">
        <a href="..">Back to overview</a>
      </section>
    </Layout>
  );
}
