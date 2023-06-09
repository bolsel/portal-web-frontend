import { AppProps } from 'next/app';
import Head from 'next/head';
import '@portal-web/shared-ui/presets/default/styles/global.css';
import '../src/styles/main.scss';
import BaseLayout from '../components/base/layout/base-layout';
import { UIConfigProvider } from '@portal-web/shared-ui';
import { BasePageProps } from '../src/types';
import { SWRConfig } from 'swr';
import Script from 'next/script';
import { InitializeProvider } from '@portal-web/shared-base/initialize';

function CustomApp({ Component, pageProps, router }: AppProps<BasePageProps>) {
  const { title, website, subTitle } = pageProps;
  const mainTitle = website
    ? router.asPath !== '/'
      ? `${title} | ${website.name}`
      : title
    : title;
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
            })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');
          `,
        }}
      />
      <Head>
        <title>{mainTitle}</title>
        {subTitle ? <meta name="description" content={subTitle} /> : ''}
      </Head>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
        }}
      >
        <InitializeProvider
          config={{
            publicUrl: website?.publicUrl,
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
          <BaseLayout {...pageProps} route={router.route}>
            <Component {...pageProps} />
          </BaseLayout>
        </InitializeProvider>
      </SWRConfig>
    </>
  );
}

export default CustomApp;
