'use client';

import clsx from 'clsx';
import { UIWidgetGPR } from '@portalweb/ui';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CarouselLatestNews from './carousel-latest-news';
import NewsList from './news-list';
import { ApiResourceGetItemTypePaths } from '@portalweb/api';

export default function HomeNewsHeadline() {
  const [p, setP] =
    useState<keyof ApiResourceGetItemTypePaths<'news'>>('latest');
  return (
    <>
      <section
        className="relative top-[-12rem] z-10 mb-[-12rem] pb-6
      md:top-[-14rem] md:mb-[-14rem] md:pb-8 lg:-top-40 lg:-mb-40 xl:pb-12"
      >
        <div className="ui-container">
          <div
            className="grid h-full w-full grid-cols-1 gap-6 rounded-xl bg-white
          p-4 shadow md:p-8 xl:grid-cols-[300px,1fr]"
          >
            <section className="grid h-full w-full grid-cols-1 gap-4">
              <div className="mb-4 flex flex-col items-center gap-1 md:flex-row md:gap-4">
                <h1 className="text-[28px] font-medium leading-loose md:text-4xl">
                  Berita Terkini
                </h1>
                <div className="flex flex-1 flex-col justify-center text-center">
                  <div className="border-b border-gray-300" />
                </div>
                <Link href="/berita" tabIndex={-1}>
                  <motion.button
                    aria-label="Lihat Semua Berita"
                    className="rounded-lg border border-primary px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary hover:text-white"
                    whileTap={{ scale: 0.96 }}
                  >
                    Lihat Semua Berita
                  </motion.button>
                </Link>
              </div>
              <div className="grid w-full grid-cols-1 gap-8 md:grid-rows-1 lg:grid-cols-[1fr,330px]">
                <CarouselLatestNews />
                {/* <UISwrResource
                  resourceKey="news"
                  loadingComponent={() => (
                    <div className="bg-base-200 h-full w-full animate-pulse"></div>
                  )}
                  noItemsComponent={() => (
                    <div className="bg-base-200 h-full w-full">
                      Belum ada data
                    </div>
                  )}
                  pathQuery={["latest"]}
                  paramsQuery={{
                    limit: 5,
                  }}
                >
                  {({ data }) => <UIViewNewsCarouselWidget items={data} />}
                </UISwrResource> */}
                <div className="grid h-[518px] w-full grid-cols-1 grid-rows-[38px,1fr] gap-4">
                  <div
                    className="mb-4 grid h-full w-full grid-cols-2"
                    role="tablist"
                    aria-label="Tab berita terbaru dan terpopuler"
                  >
                    <button
                      role="tab"
                      onClick={() => setP('latest')}
                      className={clsx(
                        'cursor-pointer border-b-4 pb-3 text-center text-sm uppercase',
                        p === 'latest'
                          ? 'border-primary font-bold'
                          : 'border-blue-gray-50 text-gray-700'
                      )}
                    >
                      Terbaru
                    </button>
                    <button
                      role="tab"
                      onClick={() => setP('popular')}
                      className={clsx(
                        'cursor-pointer border-b-4 pb-3 text-center text-sm uppercase',
                        p === 'popular'
                          ? 'border-primary font-bold'
                          : 'border-blue-gray-50 text-gray-700'
                      )}
                    >
                      Terpopuler
                    </button>
                  </div>
                  <NewsList type={p} />
                  {/* <NewsTerkiniList type={p} /> */}
                </div>
              </div>
            </section>
            <section
              className="relative flex h-[600px] w-full max-w-[500px] items-center justify-center justify-self-center
    overflow-hidden rounded-lg bg-[#262879] md:h-[625px] lg:h-[608px] xl:order-first"
            >
              <UIWidgetGPR />
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
