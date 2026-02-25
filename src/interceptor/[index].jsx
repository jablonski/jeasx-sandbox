import { jsxToString } from "jsx-async-runtime";
import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ request }) {
  const removeStyles = request.query["styles"] === "off";

  return (
    <Layout
      title="Interceptor demo"
      description="Overriding #jsxToString allows to modify existing jsx components"
    >
      <section class="center">
        <h1>JSX interception</h1>
        <p>
          The underlying <a href="https://github.com/jeasx/jsx-async-runtime">jsx-async-runtime</a>{" "}
          allows you to intercept the rendering of jsx elements. This allows you to modify or
          replace existing markup.
        </p>
      </section>
      <section class="center">
        {removeStyles ? (
          <HouseKeeper>
            <ThirdPartyComponent />
            <a href="?styles=on"> Turn inline styles on</a>
          </HouseKeeper>
        ) : (
          <>
            <ThirdPartyComponent />
            <a href="?styles=off">Turn inline styles off</a>
          </>
        )}
      </section>
    </Layout>
  );
}

function HouseKeeper({ children }) {
  this.jsxToString = (jsxElement) => {
    // Rewrite className to class
    if (jsxElement?.props?.className) {
      jsxElement.props.class = jsxElement.props.className;
      delete jsxElement.props.className;
    }
    // Delete all inline styles
    if (jsxElement?.props?.style) {
      delete jsxElement.props.style;
    }
    return jsxToString.call(this, jsxElement);
  };
  return <>{children}</>;
}

function ThirdPartyComponent() {
  return (
    <div className={{ third: true, party: false }} style="border: 4px dashed black;">
      {["red", "green", "blue", "orange"].map((color) => (
        <>
          <span style={`background-color: ${color}`}>{color}</span>
          &nbsp;
        </>
      ))}
    </div>
  );
}
