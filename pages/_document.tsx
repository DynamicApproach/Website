import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import withServerStyleSheet from "../utils/withServerStyleSheet";
// https://nextjs.org/docs/advanced-features/custom-document -- TypeScript example + documentation

export default class MyDocument extends Document {
  public static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    return withServerStyleSheet(ctx);
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
