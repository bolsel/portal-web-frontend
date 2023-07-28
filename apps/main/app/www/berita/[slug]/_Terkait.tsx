'use client';
import { ApiResourceGetNormalizerType } from '@portalweb/api';
import {
  UIBaseViewNewsListItem,
  UIListItems,
  UISwrResource,
  useUIListItemsViewState,
} from '@portalweb/ui';
import { useSearchParams } from 'next/navigation';

export default function Terkait({
  item,
}: {
  item: ApiResourceGetNormalizerType<'news', 'bySlug'>;
}) {
  const [view, setView] = useUIListItemsViewState('list');
  return (
    <>
      <div className="flex w-full h-[38px] mb-6">
        <div className="border-b-[3px] border-primary">
          <h1 className="whitespace-nowrap font-default text-sm font-bold leading-6 uppercase text-blue-gray-800">
            Berita Terkait ({item.category_name})
          </h1>
        </div>
        <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
      </div>
      <UISwrResource
        resourceKey="news"
        pathQuery={['byCategorySlug', item.category_slug]}
        paramsQuery={{ limit: 5, filter: { slug: { _neq: item.slug } } }}
        loadingComponent={() => (
          <UIListItems
            items={5}
            customizes={{
              noViewSwitch: () => true,
            }}
            Component={({ item: data, view }) => (
              <UIBaseViewNewsListItem
                skeleton
                item={[]}
                view={view}
                customizes={{
                  small: () => true,
                }}
              />
            )}
            view={'list'}
            setView={setView}
          />
        )}
      >
        {({ data }) => {
          return (
            <UIListItems
              items={data!.data}
              customizes={{
                noViewSwitch: () => true,
              }}
              Component={({ item: data, view }) => (
                <UIBaseViewNewsListItem
                  item={data}
                  view={view}
                  customizes={{
                    small: () => true,
                    fields: ({ defaults }) => ({
                      ...defaults.fields,
                      description: '',
                    }),
                  }}
                />
              )}
              view={view}
              setView={setView}
            />
          );
        }}
      </UISwrResource>
    </>
  );
}
