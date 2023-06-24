import newrelic from 'newrelic';
import {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document';
import { GTM_ID } from '../src/gtm';

export default function Document() {
  const browserTimingHeader = newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
  });
  return (
    <Html lang="id">
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: browserTimingHeader }}
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
      </Head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
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
