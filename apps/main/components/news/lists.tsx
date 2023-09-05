'use client';

import {
  UIBaseDevice,
  UIBaseViewNewsListItem,
  UIListItems,
  UIPagination,
  UISwrResource,
  useUIListItemsViewState,
} from '@portalweb/ui';
import { useState } from 'react';

export default function NewsLists({ category }: { category?: string }) {
  const [view, setView] = useUIListItemsViewState('list');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  return (
    <UIBaseDevice>
      {({ isMobile }) => (
        <UISwrResource
          collection="news"
          path={'itemsMeta'}
          query={{
            limit,
            page,
            filter: category
              ? { category: { slug: { _eq: category } } }
              : undefined,
          }}
          loadingComponent={() => (
            <UIListItems
              items={limit}
              Component={({ item: data, view }) => (
                <UIBaseViewNewsListItem skeleton item={[]} view={view} />
              )}
              view={isMobile ? 'grid' : view}
              setView={setView}
            />
          )}
        >
          {({ data }) => {
            return (
              <>
                <UIListItems
                  items={data?.data ?? []}
                  Component={({ item: data, view }) => (
                    <UIBaseViewNewsListItem item={data} view={view} />
                  )}
                  view={isMobile ? 'grid' : view}
                  setView={setView}
                />
                <div className="mt-10">
                  {data?.meta && (
                    <UIPagination
                      total={data.meta.filter_count}
                      limit={limit}
                      page={page}
                      setLimit={setLimit}
                      setPage={setPage}
                    />
                  )}
                </div>
              </>
            );
          }}
        </UISwrResource>
      )}
    </UIBaseDevice>
  );
}
