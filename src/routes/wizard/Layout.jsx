import DefaultLayout from "../Layout";
import Header from "./components/Header";

/**
 * @this {import("../types").RouteProps}
 */
export default function Layout({ title = "", data = {}, children = [] }) {
  const path = this.pathname;

  return (
    <DefaultLayout title={title} script="/wizard/index.js">
      <Header path={path} data={data} />
      {children}
    </DefaultLayout>
  );
}
