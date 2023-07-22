'use client';

import {
  UIBaseViewDocumentListItem,
  UIListItems,
  UIPagination,
  UISwrResource,
  useUIListItemsViewState,
} from '@portalweb/ui';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Lists() {
  const searchParams = useSearchParams();
  const currentKategoriSlug = searchParams.get('kategori') ?? '';
  const [view, setView] = useUIListItemsViewState('list');
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [currentKategoriSlug]);
  return (
    <UISwrResource
      resourceKey="documents"
      pathQuery={
        currentKategoriSlug
          ? ['latestByCategorySlug', currentKategoriSlug]
          : ['latest']
      }
      paramsQuery={{ page, limit }}
      loadingComponent={() => (
        <UIListItems
          view={view}
          setView={setView}
          items={limit}
          Component={({ view }) => (
            <UIBaseViewDocumentListItem skeleton item={{}} view={view} />
          )}
        />
      )}
    >
      {({ data }) => (
        <>
          <UIListItems
            view={view}
            setView={setView}
            items={data!.data}
            Component={({ data, view }) => (
              <UIBaseViewDocumentListItem
                item={data}
                view={view}
                customizes={{
                  hideCategory: () => currentKategoriSlug !== '',
                }}
              />
            )}
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
      )}
    </UISwrResource>
  );
}
