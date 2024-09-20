import Layout from "../Layout";
import Image from "./Image";

/**
 * @this {import("../types").ThisContext}
 * @param {import("../types").RouteProps} props
 */
export default async function BlogDetail({ reply }) {
  const segments = this.path.split("/");
  if (segments.length !== 3) {
    reply.status(404);
    return;
  }

  const product = await (
    await fetch(`https://dummyjson.com/product/${segments[2]}`)
  ).json();

  if (product.message) {
    reply.status(404);
    return;
  }

  return (
    <Layout title={product.title} description={product.description}>
      <article class="center">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        {product.images.map((image) => (
          <Image
            src={image}
            alt={product.title}
            position="entropy"
            immutable
            width="200"
            height="200"
          />
        ))}
      </article>
      <section class="center">
        <a href="..">Back to overview</a>
      </section>
    </Layout>
  );
}
