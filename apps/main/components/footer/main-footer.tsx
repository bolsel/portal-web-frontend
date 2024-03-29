'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMainLayoutContext } from '../main-layout-provider';
import { UIBaseIcon } from '@portalweb/ui';
import clsx from 'clsx';
import { Info } from './info';

export default function MainFooter() {
  const mainLayout = useMainLayoutContext();
  return (
    <footer className="bg-primary relative">
      <div className="ui-container">
        <div className="py-6 md:py-12 flex flex-col gap-6 md:gap-12 bg-no-repeat">
          <Link href="/" className="w-[fit-content]">
            <Image
              src="/images/portal-bolselkabgoid.svg"
              width="228"
              height="38"
              alt="Logo"
            />
          </Link>
          <Info />
          <div className="flex w-full flex-col text-white">
            <div className="flex items-start gap-3">
              <UIBaseIcon icon="sitemap" className="py-1 w-8 h-8" />
              <div className="flex w-full min-h-0 flex-col gap-4">
                <h2 className="font-roboto font-bold leading-7">Sitemap</h2>
                <section className="min-w-0 flex flex-col divide-y divide-primary-400 -mt-4 lg:hidden">
                  {mainLayout.menuList.map((m, i) => (
                    <details key={i} className="py-4">
                      <summary className="flex justify-between items-center">
                        <h3 className="font-bold">{m.title}</h3>
                        <div className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-primary-600">
                          <UIBaseIcon
                            icon="chevron-down"
                            fill="white"
                            className="w-8 h-8 cursor-pointer transition-transform ease-in duration-150"
                          />
                        </div>
                      </summary>
                      <ul className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-2">
                        {m.items &&
                          m.items.map((sm, smI) => {
                            return (
                              <li key={smI}>
                                <Link
                                  href={sm.link}
                                  className="text-sm font-normal leading-6 block"
                                  target={
                                    sm.link.startsWith('http') ||
                                    sm.link.startsWith('https')
                                      ? '_blank'
                                      : '_self'
                                  }
                                >
                                  {sm.title}
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </details>
                  ))}
                </section>
                <section
                  className={clsx(
                    `min-w-0 w-full hidden justify-between lg:grid`,
                    {
                      'lg:grid-cols-2': mainLayout.menuList.length === 2,
                      'lg:grid-cols-3': mainLayout.menuList.length === 3,
                      'lg:grid-cols-4': mainLayout.menuList.length === 4,
                      'lg:grid-cols-5': mainLayout.menuList.length === 5,
                    },
                    `lg:grid lg:gap-y-8 lg:-ml-7`
                  )}
                >
                  {mainLayout.menuList.map((m, i) => {
                    return (
                      <div
                        key={i}
                        className="px-7 border-r border-primary-500 last-of-type:border-transparent"
                      >
                        <h3 className="font-roboto text-base leading-6 font-bold mb-2 whitespace-nowrap">
                          {m.title}
                        </h3>
                        <ul className="grid grid-flow-row gap-x-8 gap-y-2">
                          {m.items &&
                            m.items.map((sm, smI) => {
                              return (
                                <li key={smI} className="min-w-[95px]">
                                  <Link
                                    href={sm.link}
                                    className="text-sm font-normal leading-6 link-hover"
                                    target={
                                      sm.link.startsWith('http') ||
                                      sm.link.startsWith('https')
                                        ? '_blank'
                                        : '_self'
                                    }
                                  >
                                    {sm.title}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    );
                  })}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-4 lg:py-6 border-t border-primary-500">
        <div className="ui-container">
          <div className="flex flex-col items-center lg:items-start gap-5">
            <p className="font-lato text-xs lg:text-sm font-normal leading-6 text-white text-center lg:text-left">
              Copyright © 2023 <br className="lg:hidden" /> Pemerintah Kabupaten
              Bolaang Mongondow Selatan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
