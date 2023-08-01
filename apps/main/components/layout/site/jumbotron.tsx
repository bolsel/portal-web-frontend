import clsx from 'clsx';
import React, { ReactNode } from 'react';
export type JumbotronProps = {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  suffix?: string | ReactNode;
};
export default function Jumbotron({ title, subtitle, suffix }: JumbotronProps) {
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
      <div className="ui-container relative pt-24 pb-40 z-10">
        {title && (
          <h1
            className={clsx(
              'font-intro font-bold text-xl lg:text-2xl xl:text-3xl leading-relaxed text-primary-500 mb-2'
            )}
          >
            {title}
          </h1>
        )}
        <div className="grid grid-cols-1">
          {subtitle && (
            <h2
              className={clsx(
                'font-intro text-sm leading-6 text-white line-clamp-4',
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
      </div>
    </section>
  );
}
