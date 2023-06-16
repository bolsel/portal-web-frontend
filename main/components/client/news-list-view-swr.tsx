'use client';

import { FC, ReactElement, useState } from 'react';
import { ApiResourceProps, useResourceSWR } from '@portal-web/shared-api';
import clsx from 'clsx';
import { NewsListView, NewsListViewProps } from '../news/list-view';
import { UIIcon } from '@portal-web/shared-ui';

export const NewsListViewSwr: FC<
  Omit<NewsListViewProps, 'items'> & {
    loadingComponent?: ReactElement;
    noItemsComponent?: ReactElement;
    noPagination?: boolean;
  } & ApiResourceProps<'news'>
> = ({
  loadingComponent,
  noItemsComponent,
  noPagination,
  pathQuery,
  paramsQuery,
  small,
  imageComponent,
  ...props
}) => {
  const [page, setPage] = useState(paramsQuery?.page ?? 1);
  const [limit, setLimit] = useState(paramsQuery?.limit ?? 10);
  const { data, isLoading } = useResourceSWR('news', {
    pathQuery,
    paramsQuery: {
      ...paramsQuery,
      page,
      limit,
    },
  });

  const LoadingComponent = () => {
    if (loadingComponent) return loadingComponent;
    const items: any = [];
    for (let i = 0; i < limit; i++) {
      items.push(
        <article
          key={i}
          className={clsx(
            'min-h-[88px] flex overflow-hidden w-full gap-4',
            'rounded-xl group hover:bg-base-100 hover:border-base-200 p-1 transition-colors ease-brand duration-250'
          )}
        >
          {imageComponent !== false ? (
            <div
              className={clsx(
                'flex-shrink-0 w-[72px] h-[72px] md:w-[200px] md:h-[130px] overflow-hidden rounded-lg transition-transform duration-300 ease-in-out',
                'bg-base-200 animate-pulse',
                {
                  '!w-[72px] !h-[72px]': small,
                }
              )}
            >
              <div className=" flex items-center justify-center w-full h-full transition-transform object-center object-cover duration-300 ease-in-out">
                <UIIcon icon={'base:image'} className="text-base-300 w-8 h-8" />
              </div>
            </div>
          ) : null}
          <div className="w-full flex flex-col items-start justify-center">
            <div className="w-full">
              <div className="w-full h-5 bg-base-200 animate-pulse rounded-md mb-1" />
              <div className="w-2/2 h-4 bg-base-200 animate-pulse rounded-md mb-3" />
              <div className="flex flex-row w-2/3">
                <div className="w-1/2 h-4 bg-base-200 animate-pulse rounded-md mb-2 mr-1" />
                <div className="w-1/2 h-4 bg-base-200 animate-pulse rounded-md mb-2" />
              </div>
            </div>
          </div>
        </article>
      );
    }
    return (
      <div className="flex-auto w-full flex flex-col gap-5 md:gap-6">
        {items}
      </div>
    );
  };
  if (isLoading) return loadingComponent ?? <LoadingComponent />;
  if (!data) return noItemsComponent ?? <div>tidak ada data</div>;
  if (!data.data) return noItemsComponent ?? <div>tidak ada data</div>;
  return (
    <NewsListView
      {...props}
      small={small}
      imageComponent={imageComponent}
      pagination={
        noPagination
          ? undefined
          : data && data.meta
          ? {
              setPage,
              setLimit,
              limit,
              page,
              total: data.meta.filter_count,
            }
          : undefined
      }
      items={data.data}
    />
  );
};
