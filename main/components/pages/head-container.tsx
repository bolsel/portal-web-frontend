import React from 'react';
import clsx from 'clsx';
import { UIContainer } from '@portal-web/shared-ui';

export interface PageHeadContainerProps {
  breadcrumb?: any;
  bgImage?: string;
  title?: string;
  subtitle?: string;
  suffix?: any;
  metaData?: boolean;
  children: any;
}

export default function PageHeadContainer({
  children,
  bgImage = '/images/bg/jumbotron-default.jpeg',
  breadcrumb,
  title,
  subtitle,
  suffix,
  metaData,
}: PageHeadContainerProps) {
  return (
    <>
      <section
        className="relative w-full bg-gray-800"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="jumbotron-overlay" />
        <UIContainer className="relative pt-24 pb-40 z-10">
          {breadcrumb && breadcrumb}
          {title && (
            <h1 className="font-lora font-bold text-3xl leading-relaxed text-primary mb-2">
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
      <section className="w-full bg-base-200">
        <UIContainer className="relative -top-24 z-20">
          <div className="px-3 md:px-4 lg:px-6 py-[50px] rounded-xl bg-base-100 flex flex-col gap-2 justify-center items-center">
            {children}
          </div>
        </UIContainer>
      </section>
    </>
  );
}
