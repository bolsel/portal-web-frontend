'use client';
import { ApiResourceGetItemTypePaths } from '@portalweb/api';
import {
  UIListItems,
  UISwrResource,
  useUIListItemsViewState,
} from '@portalweb/ui';
import { UIBaseViewNewsListSimple } from '@portalweb/ui';

export default function NewsList({
  type,
}: {
  type: keyof ApiResourceGetItemTypePaths<'news'>;
}) {
  const [view, setView] = useUIListItemsViewState('list');
  const loadingComponent = () => (
    <div className="flex-auto w-full flex flex-col gap-5 md:gap-6">
      {[...Array(4)].map((v, index) => {
        return <UIBaseViewNewsListSimple item={{}} skeleton key={index} />;
      })}
    </div>
  );
  return (
    <UISwrResource
      resourceKey="news"
      pathQuery={[type]}
      paramsQuery={{ limit: 4 }}
      loadingComponent={loadingComponent}
    >
      {({ data }) => (
        <UIListItems
          view={view}
          setView={setView}
          items={data!.data}
          customizes={{
            noViewSwitch: () => true,
          }}
          Component={({ data: item }) => (
            <UIBaseViewNewsListSimple item={item} />
          )}
        />
      )}
    </UISwrResource>
  );
}
