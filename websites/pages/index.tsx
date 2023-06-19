import styles from './index.module.css';
import { serverSideHost } from '../src/server';
import LibSwrDataNewsList from '../../_libs/components/swr/data-news-list';
import React from 'react';
import LibSwrDataWebNewsList from '../../_libs/components/swr/data-web-news-list';
import LibSwrBannerInfoWidget from '../../_libs/components/swr/banner-info-widget';
import LibSwrGrafikInfoWidget from '../../_libs/components/swr/grafik-info-widget';
import Link from 'next/link';
import GrafikInfoWidgetSwr from '../components/swr/grafik-info-widget-swr';
import clsx from 'clsx';

export async function getServerSideProps(context) {
  const website = await serverSideHost(context);
  // if (!website) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/404-website',
  //     },
  //     props: {},
  //   };
  // }
  return {
    props: {
      website,
      title: website.name,
      subTitle: 'Pemerintah Kabupaten Bolaang Mongondow Selatan',
    },
  };
}

export function Index({ website }) {
  return (
    <div>
      <LibSwrBannerInfoWidget
        wrapperComponent={({ children }) => (
          <div className="p-1 lg:p-2">{children}</div>
        )}
        viewOptions={{
          breakpoints: undefined,
        }}
      />
      <section className="p-3 md:p-4 lg:py-8 lg:px-10 h-full grid grid-cols-1 gap-6 lg:grid-cols-[65%,30%] md:gap-[72px]">
        <div className="flex flex-col gap-7">
          <div className="flex w-full h-[38px]">
            <div className="border-b-[3px] border-primary">
              <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                Berita Terbaru
              </h1>
            </div>
            <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
          </div>
          <LibSwrDataWebNewsList
            viewType={'grid'}
            hideViewSwitch
            paramsQuery={{ limit: 10 }}
            pathQuery={['byWebId', website.id]}
          />
          <div className="flex w-full h-[38px] mt-5">
            <div className="border-b-[3px] border-primary">
              <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                Berita Terbaru di Portal Bolsel
              </h1>
            </div>
            <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
          </div>
          <LibSwrDataNewsList
            viewType={'list'}
            hideViewSwitch
            noPagination
            itemComponent={{ isPortalBerita: true }}
            paramsQuery={{ limit: 5 }}
          />
          <div className="flex items-center justify-center">
            <Link
              href="https://bolselkab.go.id/berita"
              target="_blank"
              className="btn btn-primary btn-sm normal-case"
            >
              Berita Portal Bolsel
            </Link>
          </div>
        </div>
        <section className="w-full max-w-full">
          <div className="flex flex-col gap-7 lg:sticky lg:top-[70px]">
            <div className="w-full">
              <div className="flex w-full h-[38px] mb-5">
                <div className="border-b-[3px] border-primary">
                  <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                    Info Grafik Terbaru
                  </h1>
                </div>
                <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
              </div>

              <LibSwrGrafikInfoWidget
                wrapperComponent={({ children }) => (
                  <div className="px-0 lg:px-5 bg-primary-50 w-full rounded-lg">
                    {children}
                  </div>
                )}
                paramsQuery={{ limit: 3 }}
                viewOptions={{
                  className: 'py-0 pt-5 pb-10',
                  // slidesPerView:1,
                  slideContainer: {
                    className: clsx(
                      `!bg-cover !bg-center`,
                      '!w-[300px] !h-[500px] lg:!w-full'
                    ),
                  },
                }}
              />
              {/* <LibSwrGrafikInfoWidget
              wrapperComponent={({children})=><div className="bg-primary-50 w-full rounded-lg">
                {children}
                </div>}
                paramsQuery={{limit:2}}
                viewOptions={{
                  slidesPerView:1
                }}
              /> */}
              {/* <GrafikInfoWidgetSwr /> */}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Index;
