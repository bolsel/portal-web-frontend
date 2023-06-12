import clsx from 'clsx';
import Head from 'next/head';
import React from 'react';
import { baseTitle } from '../../src/global-helpers';
import {UIContainer} from "@portal-web/shared-ui";

export default function BaseJumbotron({
                                        breadcrumb,
                                        bgImage = '/images/bg/jumbotron-default.jpeg',
                                        title,
                                        subtitle,
                                        suffix,
                                        metaData,
                                      }: {
  breadcrumb?: any;
  bgImage?: string;
  title: string;
  subtitle?: string;
  suffix?: any;
  metaData?: boolean;
}) {
  return (
    <section
      className="relative w-full bg-gray-800"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {metaData ? (
        <Head>
          <title>{baseTitle(title)}</title>
          <meta name="title" content={baseTitle(title)} />
          <meta name="description" content={subtitle} />
        </Head>
      ) : null}
      <div className="jumbotron-overlay" />
      <UIContainer className="relative pt-24 pb-40 z-10">
        {breadcrumb && breadcrumb}
        {title && (
          <h1 className="font-lora font-bold text-3xl leading-relaxed text-primary-500 mb-2">
            {title}
          </h1>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-4">
          {subtitle && (
            <h2
              className={clsx(
                'font-lato text-sm leading-6 text-white line-clamp-4',
                {
                  'sm:col-span-4': suffix,
                  'sm:col-span-2': !suffix,
                }
              )}
            >
              {subtitle}
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
