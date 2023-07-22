'use client';
import {
  UIBaseViewNewsListItem,
  UIListItems,
  UISwrResource,
  useUIListItemsViewState,
} from '@portalweb/ui';
import { useSearchParams } from 'next/navigation';

export default function PopulerSide() {
  const searchParams = useSearchParams();
  const [view, setView] = useUIListItemsViewState('list');
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(8);
  return (
    <div className="w-full flex flex-col gap-2 lg:gap-4 ">
      <div className="flex w-full h-[38px] mb-6">
        <div className="border-b-[3px] border-primary">
          <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
            Berita Populer
          </h1>
        </div>
        <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
      </div>
      <UISwrResource
        resourceKey="news"
        pathQuery={
          searchParams.has('kategori')
            ? ['popularByCategorySlug', searchParams.get('kategori')!]
            : ['popular']
        }
        paramsQuery={{ limit: 5 }}
        loadingComponent={() => (
          <UIListItems
            items={5}
            customizes={{
              noViewSwitch: () => true,
            }}
            Component={({ data, view }) => (
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
              Component={({ data, view }) => (
                <UIBaseViewNewsListItem
                  item={data}
                  view={view}
                  customizes={{
                    small: () => true,
                    fields: ({ defaults }) => ({
                      ...defaults.fields,
                      descrition: '',
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
    </div>
  );
}
