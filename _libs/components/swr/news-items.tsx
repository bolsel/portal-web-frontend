import { UIPagination, UISwrResource } from '@portal-web/shared-ui';
import React, { useEffect, useState } from 'react';
import LibViewNewsList, { LibViewNewsListProps } from '../view/news/list';
import LibViewNewsListItemSkeleton from '../view/news/list-item-skeleton';
import merge from 'lodash/merge';
import LibBaseListItemsView from '../base/list-items-view';

export type LibSwrNewsItemsProps = {
  category?: string;
  search?: string;
  listOptions?: Partial<Omit<LibViewNewsListProps, 'items'>>;
  websiteId?: string;
  pathQuery?: string[];
  paramsQuery?: any;
  hideNavigation?: boolean;
};

function EmptyItems({ category, search }) {
  const SearchComp = () => {
    if (!search) return null;
    return (
      <span>
        untuk hasil pencarian <strong>{search}</strong>
      </span>
    );
  };
  return (
    <section className="w-full flex flex-col items-center justify-center bg-white pb-8">
      <section className="text-center">
        <p className="font-lato text-sm leading-relaxed text-gray-700 text-center mb-0.5">
          Untuk sementara belum ada berita <SearchComp />
        </p>
      </section>
    </section>
  );
}

export default function LibSwrNewsItems({
  websiteId,
  category,
  search,
  listOptions,
  pathQuery,
  paramsQuery,
  hideNavigation,
}: LibSwrNewsItemsProps) {
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [category, search]);
  const filter = {};

  const resourceKey = websiteId ? 'web_news' : 'news';
  if (!pathQuery) {
    pathQuery = websiteId ? ['byWebId', websiteId] : undefined;

    if (!websiteId && category) {
      pathQuery = ['byCategoryId', category];
    }
    if (websiteId && category) {
      filter['category'] = { _eq: category };
    }
  }
  return (
    <UISwrResource
      resourceKey={resourceKey}
      loadingComponent={() => {
        return (
          <LibBaseListItemsView
            viewType={listOptions?.viewType ?? 'list'}
            {...listOptions}
          >
            {({ viewType }) => {
              const items: any = [];
              for (let i = 0; i < 5; i++) {
                items.push(
                  <LibViewNewsListItemSkeleton
                    viewType={viewType}
                    key={i}
                    {...listOptions?.itemOptions}
                  />
                );
              }
              return items;
            }}
          </LibBaseListItemsView>
        );
      }}
      noItemsComponent={() => (
        <EmptyItems search={search} category={category} />
      )}
      pathQuery={pathQuery}
      paramsQuery={{
        ...{
          limit: perPage,
          page: page,
          search: search,
          filter,
        },
        ...paramsQuery,
      }}
    >
      {({ data, meta }) => {
        return (
          <div className="w-full">
            <LibViewNewsList
              viewType="list"
              items={data}
              {...listOptions}
              itemOptions={{
                ...{
                  isWebNews: typeof websiteId === 'string',
                },
                ...listOptions?.itemOptions,
              }}
            />
            {!hideNavigation && (
              <div className="mt-6">
                <UIPagination
                  total={meta.filter_count}
                  page={page}
                  limit={perPage}
                  setLimit={setPerPage}
                  setPage={setPage}
                />
              </div>
            )}
          </div>
        );
      }}
    </UISwrResource>
  );
}
