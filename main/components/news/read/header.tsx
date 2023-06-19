import React from 'react';
import { Icon } from '@iconify/react';
import ModalDialog from '../../modal/modal-dialog';
import Image from 'next/image';
import { UIContainer } from '@portal-web/shared-ui';
import BaseBreadcrumb from '../../base/breadcrumb';
import LibBaseShareItem from '../../../../_libs/components/base/share-item';

export default function NewsReadHeader({ news, articleUrl, apiSharedCount }) {
  const breadcrumbItems = [
    { link: '/', label: 'Beranda' },
    { link: '/berita', label: 'Berita' },
    {
      link: `/berita?kategori=${news.category.slug}`,
      label: news.category.name,
      active: true,
    },
  ];
  return (
    <section
      className="relative w-full min-h-[422px] md:min-h-[400px] bg-gray-800 bg-cover bg-center bg-no-repeat"
      // style={{backgroundImage: `url('${news.image_url}')`}}
    >
      <Image
        src={news.image_cover.url}
        priority
        alt={''}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-full absolute object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(270.04deg, rgba(0, 23, 28, 0.5) 0.04%, rgba(0, 11, 14, 0.75) 39.38%, rgba(35, 7, 0, 0.98) 99.96%)',
        }}
      />
      <UIContainer className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl relative pt-24 py-6 lg:pb-9 z-10">
        <BaseBreadcrumb items={breadcrumbItems} />
        <div className="flex flex-col text-white md:text-blue-gray-100 gap-6 min-h-[250px]">
          <h1 className="flex flex-1 items-end font-lora font-bold text-2xl leading-9 md:text-[32px] md:leading-[48px] text-white max-w-3xl">
            {news.title}
          </h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:calendar" className="w-4 h-4" />
              <p className="text-sm">{news.publish_date_format}</p>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:pencil" className="w-4 h-4" />
              <p className="text-sm">
                Penulis: <span className="capitalize">{news.writer}</span>
              </p>
              <div className="hidden lg:flex items-center gap-2">
                |{' '}
                <Icon
                  icon="material-symbols:video-camera-front-outline"
                  className="w-4 h-4"
                />
                <p className="text-sm">
                  Peliput: <span className="capitalize">{news.reporter}</span>
                </p>
              </div>
            </div>
            <div className="block lg:hidden flex items-center gap-2">
              <Icon
                icon="material-symbols:video-camera-front-outline"
                className="w-4 h-4"
              />
              <p className="text-sm">
                Peliput: <span className="capitalize">{news.reporter}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:flex-row justify-between text-white">
            <div className="flex gap-4 justify-between md:justify-start items-center">
              <div className="flex flex-row gap-3 items-start">
                <div className="border rounded-full border-white w-7 h-7 flex justify-center items-center border-opacity-25">
                  <Icon icon="mdi:eye" />
                </div>
                <div>
                  <p>{news.view_count} kali</p>
                  <p className="text-xs text-blue-gray-100">
                    Berita ini dilihat
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3 items-start">
                <div className="border rounded-full border-white w-7 h-7 flex justify-center items-center border-opacity-25">
                  <Icon
                    icon="mdi:share-variant"
                    className="w-[12px] h-[12px]"
                  />
                </div>
                <div>
                  <p>{news.shared_count} kali</p>
                  <p className="text-xs text-blue-gray-100">
                    Berita ini dibagikan
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-end">
              <ModalDialog
                button={
                  <button className="btn btn-primary btn-sm w-[fit-content] flex gap-2">
                    Bagikan Berita
                    <Icon icon="mdi:share-all-outline" className="h-5 w-5" />
                  </button>
                }
                header={
                  <h1 className="px-6 py-2 font-medium text-2xl text-primary leading-relaxed">
                    Bagikan Berita
                  </h1>
                }
              >
                <div className="py-4 px-6 max-w-[510px]">
                  <section className="flex gap-4 mb-4">
                    <Icon
                      icon="mdi:info-outline"
                      className="self-start text-primary w-6 h-6"
                    />
                    <div>
                      <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                        Judul Berita
                      </h2>
                      <p className="text-gray-800 font-bold leading-relaxed">
                        {news.title}
                      </p>
                    </div>
                  </section>
                  <section className="flex gap-4">
                    <Icon
                      icon="mdi:share-variant-outline"
                      className="self-start text-primary w-6 h-6"
                    />
                    <div className="w-full">
                      <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                        Bagikan Melalui
                      </h2>
                      <LibBaseShareItem
                        url={articleUrl}
                        beforeOnClick={() => {
                          fetch(apiSharedCount);
                        }}
                        title={news.title}
                        quote={news.description}
                      />

                      <h2 className="mt-3 font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                        Telah dibagikan sebanyak{' '}
                        <strong>{news.shared_count}</strong>x
                      </h2>
                    </div>
                  </section>
                </div>
              </ModalDialog>
            </div>
          </div>
        </div>
      </UIContainer>
    </section>
  );
}
