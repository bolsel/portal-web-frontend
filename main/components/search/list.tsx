import clsx from 'clsx';
import SearchItemSkeleton from './item-skeleton';
import Image from 'next/image';
import Link from 'next/link';

interface SearchListProps {
  items: any;
  view?: 'list' | 'grid';
  isLoading: boolean;
  maxLength?: number;
  small?: boolean;
  footer?: any;
}

export default function SearchList({
  items,
  isLoading,
  view = 'list',
  maxLength = 5,
  small = false,
  footer,
}: SearchListProps) {
  function _Skeleton() {
    const items: any = [];
    for (let i = 0; i < maxLength; i++) {
      items.push(<SearchItemSkeleton view={view} key={i} />);
    }
    return items;
  }

  function _Items() {
    return items.map(
      (
        {
          title,
          image_cover,
          slug,
          description,
          category,
          publish_date_format,
        },
        i
      ) => {
        const link = `/berita/${slug}`;
        return (
          <article
            key={i}
            className={clsx(
              'search-item min-w-0 w-full p-3 group rounded-xl cursor-pointer border border-transparent',
              'transition-all duration-150 ease-out hover:border-[#E9EDF4] hover:shadow-md',
              view === 'grid'
                ? 'flex flex-col min-h-[320px]'
                : 'flex gap-4 min-h-[147px]'
            )}
          >
            <Link
              href={link}
              target="_blank"
              rel="noopener"
              aria-label={title}
              title={title}
            >
              <div
                className={clsx(
                  'self-start rounded-lg overflow-hidden flex items-center justify-center bg-gray-50',
                  view === 'list'
                    ? 'w-[120px] h-[120px]'
                    : 'w-full h-[120px] mb-6',
                  { '!w-[72px] !h-[72px]': small }
                )}
              >
                <Image
                  src={image_cover.url}
                  alt={title}
                  width={72}
                  height={72}
                  className={clsx(
                    'group-hover:scale-110 transition-all ease-in duration-150',
                    'w-full h-full object-cover object-center'
                  )}
                />
              </div>
            </Link>
            <div className="w-full flex flex-col">
              {/*<span*/}
              {/*  className={clsx(*/}
              {/*    "bg-gray-100 px-2 py-1 rounded-[4px] mb-2 w-max font-lato text-xs leading-5 text-[#8D8D8D]",*/}
              {/*    "group-hover:bg-green-50 group-hover:text-green-700")}*/}
              {/*      /!*:className="small ? 'hidden' : null"*!/*/}
              {/*      >*/}
              {/*      /!*{{ domain.label }}*!/*/}
              {/*    </span>*/}

              <Link
                href={link}
                target="_blank"
                rel="noopener"
                aria-label={title}
                title={title}
              >
                <h1 className="font-lato font-medium text-lg leading-7 text-blue-gray-800 mb-[6px] group-hover:text-primary-700">
                  {title}
                </h1>
              </Link>
              <p
                className="font-lato font-normal text-sm leading-6 text-[#717F8C] mb-2
            group-hover:text-blue-gray-600 line-clamp-2"
              >
                {description === '' ? '...' : description}
              </p>
              <p className="font-normal text-xs leading-5 text-gray-700">
                <span className="group-hover:text-blue-gray-800 capitalize">
                  {category.name}
                </span>{' '}
                | {publish_date_format}
              </p>
            </div>
          </article>
        );
      }
    );
  }

  return (
    <div
      className={clsx(
        view === 'list'
          ? 'w-full flex flex-col gap-3'
          : 'w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
      )}
    >
      {isLoading ? _Skeleton() : _Items()}
      {footer && footer}
      {/*<template v-if="loading">*/}
      {/*  <SearchItemSkeleton v-for="item in maxLength" :key="item" :view="listView" />*/}
      {/*  </template>*/}
      {/*<template v-else>*/}
      {/*  <SearchItem*/}
      {/*    v-for="item in items"*/}
      {/*  :key="item.id"*/}
      {/*  :view="listView"*/}
      {/*  :item="item"*/}
      {/*  :small="small"*/}
      {/*  />*/}
      {/*</template>*/}
    </div>
  );
}
