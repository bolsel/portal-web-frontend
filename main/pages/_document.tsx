import newrelic from 'newrelic';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';
import { getNextConfig } from '@portal-web/shared-base';

const { publicRuntimeConfig } = getNextConfig();

export default class MyDocument extends Document<{ browserTimingHeader: any }> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { browserTimingHeader: any }> {
    const initialProps = await Document.getInitialProps(ctx);
    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true,
    });
    return {
      ...initialProps,
      browserTimingHeader,
    };
  }
  render() {
    return (
      <Html lang="id">
        <Head>
          <Script
            id="newrelic"
            type="text/javascript"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: this.props.browserTimingHeader }}
          />
          <Script
            id="gtag-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${publicRuntimeConfig.gtmId}');
          `,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                url: 'https://www.bolselkab.go.id',
                logo: 'https://www.bolselkab.go.id/images/logo.png',
              }),
            }}
          />
          <meta
            name="description"
            content="Portal Resmi Pemerintah Kabupaten Bolaang Mongondow Selatan"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700&amp;family=Roboto:wght@400;500;600;700&amp;family=Lora:wght@400;500;600;700&amp;family=Open Sans:wght@400;500;600;700&amp;display=swap"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700&amp;family=Roboto:wght@400;500;600;700&amp;family=Lora:wght@400;500;600;700&amp;family=Open Sans:wght@400;500;600;700&amp;display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${publicRuntimeConfig.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
