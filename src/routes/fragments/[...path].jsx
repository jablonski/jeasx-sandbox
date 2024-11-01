import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function FragmentsExample({ request }) {
  const id = request.query["id"] || 1;

  return (
    <Fragments
      container={({ children }) => (
        <Layout
          title="Template fragments"
          description="Template fragments allow you to render a fragment or partial bit of the content within a template, rather than the entire template."
          script="/htmx/index.js"
        >
          {children}
        </Layout>
      )}
    >
      <Fragment>
        <h1>Template Fragments</h1>
        <p>
          Creating routes that emit HTML fragments is straightforward in Jeasx
          which makes it a perfect match for{" "}
          <a href="https://htmx.org/" target="_blank">
            HTMX
          </a>
          . Sometimes, however, creating many routes by hand can be tedious.{" "}
          <a href="https://htmx.org/essays/template-fragments/" target="_blank">
            Template fragments
          </a>{" "}
          allow you to render a fragment or partial bit of the content within a
          template, rather than the entire template. In Jeasx you can implement
          this feature in userland with just a few lines of code bundled in two
          simple components.
        </p>
      </Fragment>
      <Fragment name="product">
        <form>
          <h2>Product-Browser</h2>
          <input
            name="id"
            type="range"
            value={id}
            autofocus
            min={1}
            max={50}
            hx-get="./~product"
            hx-swap="outerHTML"
            hx-target="closest form"
          />
          <Product id={id} />
        </form>
      </Fragment>
      <Fragment name="time">
        <p hx-get="./~time" hx-trigger="every 1s" hx-swap="outerHTML">
          {new Date().toTimeString()}
        </p>
      </Fragment>
    </Fragments>
  );
}

/**
 * @this {import("../types").ThisContext}
 */
function Fragments({ container, children = [] }) {
  if (this.request.path.includes("~")) {
    return <>{children}</>;
  } else {
    const Container = container;
    return <Container>{children}</Container>;
  }
}

/**
 * @this {import("../types").ThisContext}
 */
function Fragment({ name = undefined, children = [] }) {
  if (
    !this.request.path.includes("~") ||
    (name && this.request.path.endsWith(name))
  ) {
    return <>{children}</>;
  }
}

async function Product({ id }) {
  const product = await (
    await fetch(`https://dummyjson.com/products/${id}`)
  ).json();

  return (
    <article>
      <header>
        <h3>{product.title}</h3>
        <b>{product.price} €</b>
      </header>
      <img
        src={product.thumbnail}
        alt={product.title}
        width="300"
        height="300"
      />
      <p>{product.description}</p>
    </article>
  );
}
