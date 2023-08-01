'use client';

import {
  UIBaseDevice,
  UIBaseViewNewsListItem,
  UIListItems,
  UISwrResource,
  useUIListItemsViewState,
} from '@portalweb/ui';
import { useSearchParams } from 'next/navigation';

export default function MainBeritaLists() {
  const searchParams = useSearchParams();
  const [view, setView] = useUIListItemsViewState('list');
  return (
    <UIBaseDevice>
      {({ isMobile }) => (
        <UISwrResource
          loadingComponent={() => (
            <UIListItems
              items={6}
              Component={({ item: data, view }) => (
                <UIBaseViewNewsListItem skeleton item={[]} view={view}/>
              )}
              view={isMobile ? 'grid' : view}
              setView={setView}
              customizes={{
                noViewSwitch:()=>true
              }}
            />
          )}
          resourceKey="news"
          pathQuery={
            searchParams.has('kategori')
              ? ['byCategorySlug', searchParams.get('kategori')!]
              : ['latest']
          }
          paramsQuery={{ limit: 6, page:1 }}
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
                  customizes={{
                    noViewSwitch:()=>true
                  }}
                />
              </>
            );
          }}
        </UISwrResource>
      )}
    </UIBaseDevice>
  );
}
