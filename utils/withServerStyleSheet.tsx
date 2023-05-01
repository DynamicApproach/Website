/* eslint-disable @next/next/no-document-import-in-page */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentContext, DocumentInitialProps } from "next/document";
// eslint-disable-next-line @next/next/no-document-import-in-page
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

const withServerStyleSheet = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps> => {
  const { renderPage } = ctx;
  const sheet = new ServerStyleSheet();

  try {
    ctx.renderPage = () =>
      renderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
      });

    const { styles, ...initialProps } = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [styles, sheet.getStyleElement()]
    };
  } finally {
    sheet.seal();
  }
};
export default withServerStyleSheet;
