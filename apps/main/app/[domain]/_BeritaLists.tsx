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

export default function BeritaLists({ webId }) {
  const [view, setView] = useUIListItemsViewState('grid');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  return (
    <UIBaseDevice>
      {({ isMobile }) => (
        <UISwrResource
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
          collection="web_news"
          path="itemsMeta"
          query={{
            filter: {
              website: { _eq: webId },
            },
            limit,
            page,
          }}
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
