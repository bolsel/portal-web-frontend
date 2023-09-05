'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import {
  ApiSwrQueryProps,
  TApiResourceItemsList,
  TApiResourceItemsListKeys,
  useApiResourceSWR,
} from '@portalweb/api';
import { UIBaseListViewType } from '../../../base';
import { UIListItems } from '../list-items/list-items';

export function UISwrResourceListItems<
  C extends TApiResourceItemsListKeys,
  Path extends keyof TApiResourceItemsList[C]['paths']['read'],
  Res = ReturnType<typeof useApiResourceSWR<C, Path>>
>({
  collection,
  path,
  query,
  children,
  loadingComponent,
  view: defaultView,
  Component,
}: {
  collection: C;
  path: Path;
  query?: ApiSwrQueryProps<C>;
  children: (props: Res) => ReactNode;
  loadingComponent: (props: Res) => ReactNode;
  view: UIBaseListViewType;
  Component: FC<{
    data: Record<string, any>;
    view: UIBaseListViewType;
  }>;
}) {
  const swrRes = useApiResourceSWR(collection, path, query);

  const [view, setView] = useState(defaultView ?? 'list');
  const [page, setPage] = useState(query?.page ?? 1);
  const [limit, setLimit] = useState(query?.limit ?? 6);
  useEffect(() => {
    setPage(query?.page ?? 1);
  }, [query]);

  if (swrRes.isLoading) {
    return loadingComponent(swrRes as Res);
  }
  return (
    <>
      {/* <UIListItems
        view={view}
        setView={setView}
        Component={Component}
        items={swrRes.data?.data ?? []}
      /> */}
      {children(swrRes as Res)}
    </>
  );
}
