import styles from './index.module.css';
import { WebsitesResource } from '@portal-web/shared-api/server';
import { serverSideHost } from '../src/server';
import LibSwrDataNewsList from '../../_libs/components/swr/data-news-list';
import BannerInfoSwr from '../components/swr/banner-info-swr';
import { UIContainer } from '@portal-web/shared-ui';
import React from 'react';
import LibSwrDataWebNewsList from '../../_libs/components/swr/data-web-news-list';
import Link from 'next/link';
import GrafikInfoWidgetSwr from '../components/swr/grafik-info-widget-swr';

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
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */

  return (
    <div>
      <div className="p-1 lg:p-2">
        <BannerInfoSwr />
      </div>
      <section className="p-3 md:p-4 lg:py-8 lg:px-10 h-full grid grid-cols-1 gap-6 lg:grid-cols-[65%,auto] md:gap-[72px]">
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
              <GrafikInfoWidgetSwr />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Index;
