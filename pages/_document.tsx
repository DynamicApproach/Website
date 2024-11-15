import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext
} from "next/document";
import withServerStyleSheet from "../utils/withServerStyleSheet";
import Script from "next/script";

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
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <meta name="title" content="Dynamic development" />
          <meta name="description" content="DynamicApproach's Website" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="dymamicapproach.dev" />
          <meta property="og:title" content="Dynamic development" />
          <meta property="og:description" content="DynamicApproach's Website" />
          <meta
            property="og:image"
            content="https://metatags.io/images/meta-tags.png"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="dymamicapproach.dev" />
          <meta property="twitter:title" content="Dynamic development" />
          <meta
            property="twitter:description"
            content="DynamicApproach's Website"
          />
          <meta
            property="twitter:image"
            content="https://metatags.io/images/meta-tags.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ouiiyeyuum");
            `
            }}
          />
        </body>
      </Html>
    );
  }
}
