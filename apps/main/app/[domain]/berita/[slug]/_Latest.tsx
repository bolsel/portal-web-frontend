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

export default function Latest({webId}) {

  const [view, setView] = useUIListItemsViewState('list');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  return (
    <UIBaseDevice>
      {({ isMobile }) => (
        <UISwrResource
          loadingComponent={() => (
            <UIListItems
              items={limit}
              Component={({ item: data, view }) => (
                <UIBaseViewNewsListItem skeleton item={[]} view={view} customizes={{
                  small:()=>true
                }} />
              )}
              view={isMobile ? 'grid' : view}
              setView={setView}
              customizes={{
                noViewSwitch:()=>true
              }}
            />
          )}
          resourceKey="web_news"
          pathQuery={['latestByWebId', webId]}
          paramsQuery={{ limit: limit, page }}
        >
          {({ data }) => {
            return (
              <>
                <UIListItems
                  items={data?.data ?? []}
                  Component={({ item: data, view }) => (
                    <UIBaseViewNewsListItem item={data} view={view} customizes={{
                      small:()=>true,
                      fields:({defaults})=>({...defaults.fields,description:''})
                    }}/>
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
