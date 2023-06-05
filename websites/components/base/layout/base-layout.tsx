import { UIContainer, UIIcon } from '@portal-web/shared-ui';
import React, { useEffect } from 'react';
import LayoutsDefaultHeader from '../../layouts/default/header';
import NextNProgress from 'nextjs-progressbar';
import { BasePageProps } from '../../../src/types';
import LayoutsDefaultJumbotron from '../../layouts/default/jumbotron';
import LayoutsDefaultBreadcrumb from '../../layouts/default/breadcrumb';

export type BaseLayoutProps = {
  children: any;
} & BasePageProps;

export default function BaseLayout({
  children,
  ...pageProps
}: BaseLayoutProps) {
  const { website, breadcrumbs } = pageProps;
  useEffect(() => {
    try {
      if (document) {
        const _body = document.querySelector('body');
        if (_body) {
          _body.dataset['theme'] = website.slug;
        }
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
  });
  if (!website) {
    return <div>{children}</div>;
  }
  return (
    <div data-theme={website.slug} className="">
      <NextNProgress color="#ef4444" />
      <LayoutsDefaultHeader website={website} />
      <LayoutsDefaultJumbotron {...pageProps} />

      <section className="w-full bg-gray-200">
        <div className="relative -top-24 z-10 ">
          <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
            {breadcrumbs && <LayoutsDefaultBreadcrumb items={breadcrumbs} />}
            <div className="bg-white min-h-screen rounded-xl">{children}</div>
          </div>
        </div>
      </section>
      <footer>
        <div className="bg-primary px-5 py-8">
          <UIContainer>
            <div className="min-w-0 grid grid-cols-1 md:grid-cols-2 lg:justify-between gap-6 text-white">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <UIIcon icon="base:map-marker" className="py-1 w-8 h-8" />
                  <div className="flex flex-col gap-1">
                    <p className="font-roboto font-bold leading-7">Alamat</p>
                    <div className="flex flex-col text-sm leading-6">
                      <p>{website.organization.address}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UIIcon icon="base:email" className="py-1 w-8 h-8" />
                  <div className="flex flex-col gap-1">
                    <p className="font-roboto font-bold leading-7">Surel</p>
                    <a
                      href={`mailto:${website.organization.email}`}
                      className="text-sm leading-6"
                    >
                      {website.organization.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UIIcon icon="mdi:phone-outline" className="py-1 w-8 h-8" />
                  <div className="flex flex-col gap-1">
                    <p className="font-roboto font-bold leading-7">Telepon</p>
                    <p>{website.organization.phone}</p>
                  </div>
                </div>
                {website.organization.social_media ? (
                  <div className="flex items-start gap-3">
                    <UIIcon
                      icon="base:tabler-social"
                      className="py-1 w-8 h-8"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">Sosial Media</p>
                      <div className="w-full flex justify-between md:justify-start gap-4">
                        {website.organization.social_media.map((s, i) => {
                          return (
                            <a
                              key={i}
                              href={s.link}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:bg-primary-500 p-2 flex justify-center items-center rounded-md border border-white border-opacity-20"
                            >
                              <UIIcon
                                icon={`base:social-${s.name}`}
                                className="w-6 h-6"
                              />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-1">
                  <div className="w-full h-72">
                    {website.organization.location_point ? (
                      <iframe
                        className="w-full h-full rounded-lg"
                        width="100%"
                        src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${website.organization.location_point.coordinates[1]},${website.organization.location_point.coordinates[0]}&t=k&z=17&ie=UTF8&iwloc=B&output=embed`}
                      ></iframe>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </UIContainer>
        </div>
        <div className="bg-primary-dark p-3 text-white">
          <div className="flex flex-col items-center justify-center">
            <div>&copy; 2023 {website.organization.name}</div>
            <div className="text-xs">
              PEMERINTAH KABUPATEN BOLAANG MONGONDOW SELATAN
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
