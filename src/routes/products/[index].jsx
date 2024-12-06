import Layout from "../Layout";
import Image from "../sharp/Image";

/**
 * @param {import("../types").RouteProps} props
 */
export default async function ProductOverview({}) {
  const { products } = await (
    await fetch("https://dummyjson.com/products")
  ).json();

  return (
    <Layout title="Products" description="Product overview">
      <section class="center">
        <h1>Product overview</h1>
        <div class="grid">
          {products.map(
            ({ id, title, price, description, thumbnail }, index) => (
              <>
                {index % 3 === 0 ? `</div><div class="grid">` : ""}
                <article>
                  <header>
                    <Image
                      src={thumbnail}
                      width="640"
                      height="320"
                      position="entropy"
                      alt={title}
                      immutable
                      loading="lazy"
                    />
                    <hr />
                    <b>{price} €</b>
                  </header>
                  <main>
                    <h3>
                      <a href={`${id}`}>{title}</a>
                    </h3>
                    <p>{description}</p>
                  </main>
                </article>
              </>
            )
          )}
        </div>
      </section>
    </Layout>
  );
}
