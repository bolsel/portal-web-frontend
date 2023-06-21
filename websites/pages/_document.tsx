import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import { useRouter } from 'next/router';

export default function Document() {
  return (
    <Html lang="id">
      <Head>
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
            src={`https://www.googletagmanager.com/ns.html?id=GTM-P38RHGM`}
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
