import Layout from "../Layout";
import Image from "./Image";

export default function ImageExamples() {
  return (
    <Layout
      title="Image transformation"
      description="Using sharp to transform images with Jeasx"
    >
      <section class="center">
        <h1>Image transformation</h1>
        <p>
          Jeasx allows to easily create a image component and converter in
          userland based on the fantastic{" "}
          <a href="https://sharp.pixelplumbing.com/" target="_blank">
            sharp
          </a>{" "}
          library. Here you see a simple example with static images. The image
          converter is also used in the <a href="/products">products</a>{" "}
          example.
        </p>
        {[1, 2, 3].map((idx) => (
          <Image
            src={`/images/image${idx}.jpg`}
            width={(idx + 2) * 200}
            height={idx * 200}
            position="entropy"
            loading="lazy"
          />
        ))}
      </section>
    </Layout>
  );
}
