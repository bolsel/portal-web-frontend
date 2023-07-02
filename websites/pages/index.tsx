import { serverSideHost } from '../src/server';
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {
  UISwrResourceBannerInfoWidget,
  UISwrResourceGrafikInfoWidget,
  UISwrResourceNewsListItems,
} from '@portal-web/shared-ui';

export async function getServerSideProps(context) {
  const website = await serverSideHost(context);
  if (!website) {
    return {
      redirect: {
        permanent: false,
        destination: '/404-website',
      },
      props: {},
    };
  }
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
      <UISwrResourceBannerInfoWidget
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
          <UISwrResourceNewsListItems
            websiteId={website.id}
            listOptions={{
              view: 'grid',
            }}
            itemOptions={{ isWebNews: true }}
          />
          <div className="flex w-full h-[38px] mt-5">
            <div className="border-b-[3px] border-primary">
              <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                Berita Terbaru di Portal Bolsel
              </h1>
            </div>
            <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
          </div>

          <UISwrResourceNewsListItems
            hideNavigation
            paramsQuery={{ limit: 5 }}
            listOptions={{
              view: 'list',
              hideViewSwitch: true,
            }}
            itemOptions={{
              customComponent: {
                description({ data }) {
                  return (
                    <p
                      className="hidden md:line-clamp-2 font-lato font-normal text-sm leading-6 text-gray-600 mb-2
        group-hover:text-blue-gray-600 "
                    >
                      {data.description}
                    </p>
                  );
                },
              },
              urlRead(data) {
                return `https://www.bolselkab.go.id/berita/${data.slug}`;
              },
              linkProps: () => ({
                target: '_blank',
              }),
            }}
          />
          <div className="flex items-center justify-center">
            <Link
              href="https://www.bolselkab.go.id/berita"
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
              <div className="flex w-full h-[38px] mb-6">
                <div className="border-b-[3px] border-primary">
                  <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                    Info Grafik Terbaru
                  </h1>
                </div>
                <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
              </div>
              <UISwrResourceGrafikInfoWidget
                wrapperComponent={({ children }) => (
                  <div className="px-0 lg:px-5 bg-primary-50 w-full rounded-lg">
                    {children}
                  </div>
                )}
                paramsQuery={{ limit: 3 }}
                viewOptions={{
                  className: 'py-0 pt-5',
                  slideContainer: {
                    className: clsx(
                      `!bg-cover !bg-center`,
                      '!w-[300px] !h-[500px] lg:!w-full'
                    ),
                  },
                }}
              />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Index;
