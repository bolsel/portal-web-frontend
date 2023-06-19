import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import '@portal-web/shared-ui/presets/default/styles/global.css';
import '../src/styles/main.scss';
import { SWRConfig } from 'swr';
import LayoutDefaultMain from '../components/layout/main';
import { UIConfigProvider } from '@portal-web/shared-ui';
import { GTM_ID, pageview } from '../src/gtm';
import Script from 'next/script';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />
      <Head>
        <title>
          Portal Resmi Pemerintah Kabupaten Bolaang Mongondow Selatan
        </title>
      </Head>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
        }}
      >
        <UIConfigProvider
          config={{
            publicUrl: 'https://bolselkab.go.id',
            icons: {
              APIProviders: [
                {
                  name: '',
                  resources: [
                    'https://iconify.api.bolselkab.go.id',
                    'https://api.iconify.design',
                  ],
                },
              ],
            },
          }}
        >
          <LayoutDefaultMain>
            <NextNProgress color="#ef4444" />
            <Component {...pageProps} />
          </LayoutDefaultMain>
          {/*<main className="app">*/}
          {/*  <NextNProgress color="#ef4444" />*/}
          {/*  <Component {...pageProps} />*/}
          {/*</main>*/}
        </UIConfigProvider>
      </SWRConfig>
    </>
  );
}

export default CustomApp;
