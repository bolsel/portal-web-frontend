import clsx from 'clsx';
import Link from 'next/link';
import { UINextImageBlur } from '@portal-web/shared-ui';
import React, { FC } from 'react';
import Image from 'next/image';
import { LibBaseDataViewViewType } from '../../../base/data-view/data-view';
import { Grid } from 'swiper';
import { Icon } from '@iconify/react';

type ComponentType = FC<{
  item: Record<string, any>;
  viewType?: LibBaseDataViewViewType;
}>;

export interface LibDataNewsListItemProps {
  webNews?: boolean;
  small?: boolean;
  item: Record<string, any>;
  titleComponent?: ComponentType;
  imageComponent?: false | ComponentType;
  viewType?: LibBaseDataViewViewType;
  isPortalBerita?: boolean;
}

export default function LibDataNewsListItem({
  small,
  item,
  titleComponent,
  imageComponent,
  isPortalBerita,
  webNews,
  viewType,
}: LibDataNewsListItemProps) {
  return (
    <article
      className={clsx(
        'min-w-0 w-full group rounded-xl border border-transparent',
        'transition-all duration-150 ease-out hover:border-gray-100 hover:shadow-sm',
        viewType === 'grid'
          ? 'flex flex-col min-h-[280px]'
          : 'flex gap-4 min-h-[88px]'
      )}
    >
      <Link
        target={isPortalBerita ? '_blank' : '_self'}
        href={
          isPortalBerita
            ? `https://bolselkab.go.id/berita/${item.slug}`
            : `/berita/${item.slug}`
        }
        rel="noopener"
        aria-label={item.title}
        title={item.title}
      >
        <div
          className={clsx(
            viewType === 'list'
              ? 'flex-shrink-0 w-[72px] h-[72px] md:w-[200px] md:h-[130px] overflow-hidden rounded-lg transition-transform duration-300 ease-in-out'
              : 'w-full h-[120px] mb-2 self-start rounded-lg overflow-hidden flex items-center justify-center bg-gray-50',

            { '!w-[72px] !h-[72px]': viewType === 'list' && small }
          )}
        >
          <Image
            src={item.image_cover.url}
            alt={item.title}
            width={72}
            height={72}
            className={clsx(
              'group-hover:scale-110 transition-all ease-in duration-150 bg-base-200',
              'w-full h-full object-cover object-center'
            )}
          />
        </div>
      </Link>
      <div
        className={clsx(
          'w-full flex flex-col items-start justify-center',
          viewType === 'grid' ? 'px-3' : ''
        )}
      >
        <Link
          target={isPortalBerita ? '_blank' : '_self'}
          href={
            isPortalBerita
              ? `https://bolselkab.go.id/berita/${item.slug}`
              : `/berita/${item.slug}`
          }
          rel="noopener"
          aria-label={item.title}
          title={item.title}
        >
          {titleComponent ? (
            titleComponent({ item, viewType })
          ) : (
            <h1 className="font-lato font-medium text-lg leading-7 text-blue-gray-800 mb-[6px] group-hover:text-primary-700 line-clamp-2">
              {item.title}
            </h1>
          )}
        </Link>
        {viewType === 'list' && small ? (
          ''
        ) : (
          <p
            className="font-lato font-normal text-sm leading-6 text-gray-600 mb-2
            group-hover:text-blue-gray-600 line-clamp-2"
          >
            {item.description === '' ? '...' : item.description}
          </p>
        )}
        <p className="font-normal text-xs leading-5 text-gray-500">
          <span className="capitalize flex items-center justify-center gap-2">
            {
              !webNews ? (
                `${item.category.name} | ${item.publish_date_format}`
              ) : (
                <>
                  <Icon icon="mdi:calendar" className="w-4 h-4" />{' '}
                  {item.publish_date_format}
                </>
              )
              // (item.tags ?? []).map((tag, i) => {
              //   return <span key={i}>{tag}, </span>;
              // })
            }
          </span>
        </p>
      </div>
    </article>
  );
}
