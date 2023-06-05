import Link from 'next/link';
import clsx from 'clsx';
import React from 'react';

interface BaseBreadcrumbProps {
  items: {
    link: string;
    label: string;
    active?: boolean;
    capitalize?: boolean;
  }[];
}

export default function LayoutsDefaultBreadcrumb({
  items,
}: BaseBreadcrumbProps) {
  return (
    <div className="text-sm breadcrumbs p-0 text-white mb-6">
      <ul className="text-sm font-lato">
        {items.map((item, index) => (
          <li key={index} className="before:!opacity-100">
            <Link
              href={item.link}
              className={clsx(
                'text-sm flex items-center max-w-[35ch] line-clamp-1 md:max-w-full md:line-clamp-none',
                {
                  'font-bold text-white': item.active,
                  'text-blue-400': !item.active,
                  capitalize:
                    typeof item.capitalize === 'undefined'
                      ? true
                      : item.capitalize,
                }
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <section className="">
      <nav className="hidden md:inline-flex">
        {items.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className={clsx(
              'font-lato text-sm flex items-center max-w-[35ch] line-clamp-1 md:max-w-full md:line-clamp-none',
              {
                'font-bold text-white': item.active,
                'text-blue-400': !item.active,
                capitalize: item.capitalize,
              }
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
