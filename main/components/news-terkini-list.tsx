import { UIListItems, UISwrResource } from '@portal-web/shared-ui';
import clsx from 'clsx';
import Link from 'next/link';

export default function NewsTerkiniList({ type }: { type: string }) {
  const loadingComponent = () => (
    <div className="flex-auto w-full flex flex-col gap-5 md:gap-6">
      {[...Array(4)].map((v, index) => {
        console.log(v);

        return (
          <div
            key={index}
            className={clsx(
              'min-h-[88px] flex overflow-hidden w-full gap-4',
              'rounded-xl group hover:bg-base-100 hover:border-base-200 p-1 transition-colors ease-brand duration-250'
            )}
          >
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
          </div>
        );
      })}
    </div>
  );
  return (
    <UISwrResource
      resourceKey={'news'}
      pathQuery={[type]}
      paramsQuery={{
        limit: 4,
      }}
      loadingComponent={loadingComponent}
      noItemsComponent={() => <div>Belum ada data.</div>}
    >
      {({ data }) => (
        <UIListItems
          hideViewSwitch
          view="list"
          items={data}
          itemComponent={({ data: item }) => (
            <article
              className={clsx(
                'min-h-[88px] flex overflow-hidden w-full gap-4 border-4 border-transparent rounded-xl',
                'group hover:bg-base-200/20 p-1 transition-colors ease-brand duration-250'
              )}
            >
              <div className="w-full flex flex-col items-start justify-center">
                <Link href={`/berita/${item.slug}`}>
                  <h2 className="mb-2 line-clamp-2 font-medium leading-7 group-hover:text-primary">
                    {item.title}
                  </h2>
                </Link>
                <div className="font-normal text-xs leading-5 text-neutral">
                  <span className="group-hover:text-neutral capitalize">
                    {item.category.name}
                  </span>
                  <span className="mx-1">|</span>
                  <span className="group-hover:text-neutral">
                    {item.publish_date_format}
                  </span>
                </div>
              </div>
            </article>
          )}
        />
      )}
    </UISwrResource>
  );
}
