import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import '@portal-web/shared-ui/presets/default/styles/global.css';
import './main.scss';
import { SWRConfig } from 'swr';
import LayoutDefaultMain from '../components/layout/main';
import { InitializeProvider } from '@portal-web/shared-base/initialize';

function App({ Component, pageProps }: AppProps) {
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
        <InitializeProvider
          config={{
            publicUrl: '',
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
        </InitializeProvider>
      </SWRConfig>
    </>
  );
}

export default App;
