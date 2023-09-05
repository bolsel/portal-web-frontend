import '@portalweb/ui/presets/base/main.css';
import '../styles/globals.css';
import type { Metadata } from 'next';
import { variableClass } from '../styles/fonts';
import clsx from 'clsx';
import { UIModalProvider } from '@portalweb/ui';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Portal Resmi Pemkab Bolsel',
  description: 'Portal Resmi Pemerintah Kabupaten Bolaang Mongondow Selatan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={clsx(variableClass)}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <UIModalProvider>{children}</UIModalProvider>

        <Script
          id="gtag-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');
          `,
          }}
        />
      </body>
    </html>
  );
}
