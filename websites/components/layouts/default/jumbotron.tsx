import clsx from 'clsx';
import React from 'react';
import { UIContainer } from '@portal-web/shared-ui';
import { BasePageProps } from '../../../src/types';
import localFont from '@next/font/local';

const _introFont = localFont({
  src: '../../../public/fonts/Intro.otf',
  variable: '--font-intro',
});
export default function LayoutsDefaultJumbotron({
  website,
  breadcrumb,
  title,
  subTitle,
  suffix,
  metaData,
}: BasePageProps) {
  const images = [
    '/images/bg/1.jpeg',
    '/images/bg/2.jpeg',
    '/images/bg/3.jpeg',
    '/images/bg/4.jpeg',
  ];
  // const image =  images[Math.floor(Math.random()*images.length)];
  const image = '/images/bg/2.jpeg';
  return (
    <section
      className="relative w-full bg-gray-800"
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="jumbotron-overlay" />
      <UIContainer className="relative pt-24 pb-40 z-10">
        {breadcrumb && breadcrumb}
        {title && (
          <h1
            className={clsx(
              _introFont.className,
              ' font-bold text-xl lg:text-2xl xl:text-3xl leading-relaxed text-primary-500 mb-2'
            )}
          >
            {title}
          </h1>
        )}
        <div className="grid grid-cols-1">
          {/*<h2*/}
          {/*  className={clsx(*/}
          {/*    'font-lato text-sm leading-6 text-white line-clamp-4',*/}
          {/*    {*/}
          {/*      'sm:col-span-4': suffix,*/}
          {/*      'sm:col-span-2': !suffix,*/}
          {/*    }*/}
          {/*  )}*/}
          {/*>*/}
          {/*  Sekilas Tentang Dinas Komunikasi dan Informatika*/}
          {/*</h2>*/}
          {subTitle && (
            <h2
              className={clsx(
                _introFont.className,
                'text-sm leading-6 text-white line-clamp-4',
                {
                  'sm:col-span-4': suffix,
                  'sm:col-span-2': !suffix,
                }
              )}
            >
              {subTitle}
            </h2>
          )}
          {suffix && (
            <div className="sm:col-span-2 sm:justify-self-end sm:self-end mt-[10px] sm:mt-0">
              {suffix}
            </div>
          )}
        </div>
      </UIContainer>
    </section>
  );
}
