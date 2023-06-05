import {AppProps} from 'next/app';
import Head from 'next/head';
// import './styles.css';
import '@portal-web/shared-ui/presets/default/styles/global.css';
import '../src/styles/main.scss';
import BaseLayout from '../components/base/layout/base-layout';
import {UIConfigProvider} from '@portal-web/shared-ui';
import {BasePageProps} from '../src/types';
import {SWRConfig} from "swr";

function CustomApp({Component, pageProps, router}: AppProps<BasePageProps>) {
  const {title, website, subTitle} = pageProps;
  const mainTitle = website
    ? router.asPath !== '/'
      ? `${title} | ${website.name}`
      : title
    : title;
  return (
    <>
      <Head>
        <title>{mainTitle}</title>
        {subTitle ? <meta name="description" content={subTitle}/> : ''}
      </Head>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
        }}
      >
        <UIConfigProvider
          config={{
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
        </UIConfigProvider>
      </SWRConfig>
    </>
  );
}

export default CustomApp;
