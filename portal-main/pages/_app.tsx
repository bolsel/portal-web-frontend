import {AppProps} from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import '@portal-web/shared-ui/presets/default/styles/global.css'
import '../src/styles/main.scss';
import {SWRConfig} from "swr";
import LayoutDefaultMain from "../components/layout/main";
import {UIConfigProvider} from "@portal-web/shared-ui";

function CustomApp({Component, pageProps}: AppProps) {
  return (
    <>
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
        <UIConfigProvider config={{
          icons: {
            APIProviders: [
              {
                name: '',
                resources: [
                  'https://iconify.api.bolselkab.go.id',
                  'https://api.iconify.design',
                ]
              }

            ]
          }
        }}>
          <LayoutDefaultMain>
            <NextNProgress color="#ef4444"/>
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
