'use client';

import {
  UIBaseDevice,
  UIBaseViewNewsListItem,
  UIListItems,
  UISwrResource,
  useUIListItemsViewState,
} from '@portalweb/ui';
import Link from 'next/link';

export default function MainBeritaLists({ side }: { side?: boolean }) {
  const [view, setView] = useUIListItemsViewState('list');
  return (
    <div className="flex flex-col gap-7">
      <div className="flex w-full h-[38px] mt-5">
        <div className="border-b-[3px] border-primary">
          <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
            Berita Terbaru di Portal Bolsel
          </h1>
        </div>
        <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
      </div>
      <UIBaseDevice>
        {({ isMobile }) => (
          <UISwrResource
            loadingComponent={() => (
              <UIListItems
                items={6}
                Component={({ item: data, view }) => (
                  <UIBaseViewNewsListItem
                    skeleton
                    item={[]}
                    view={view}
                    customizes={{
                      small: () => side ?? false,
                    }}
                  />
                )}
                view={isMobile ? 'grid' : view}
                setView={setView}
                customizes={{
                  noViewSwitch: () => true,
                }}
              />
            )}
            collection="news"
            path="items"
            query={{
              limit: 6,
            }}
          >
            {({ data }) => {
              return (
                <>
                  <UIListItems
                    items={data ?? []}
                    Component={({ item: data, view }) => (
                      <UIBaseViewNewsListItem
                        item={data}
                        view={view}
                        customizes={{
                          small: () => side ?? false,
                          fields: ({ defaults }) => ({
                            ...defaults.fields,
                            description: side ? '' : data.description,
                          }),
                        }}
                      />
                    )}
                    view={isMobile ? 'grid' : view}
                    setView={setView}
                    customizes={{
                      noViewSwitch: () => true,
                    }}
                  />

                  <div className="flex items-center justify-center">
                    <Link
                      href="https://www.bolselkab.go.id/berita"
                      target="_blank"
                      className="btn btn-primary btn-sm normal-case"
                    >
                      Berita Portal Bolsel
                    </Link>
                  </div>
                </>
              );
            }}
          </UISwrResource>
        )}
      </UIBaseDevice>
    </div>
  );
}
