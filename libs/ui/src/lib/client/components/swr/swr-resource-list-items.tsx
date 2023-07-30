'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import {
  ApiResourceGetFetchParamsType,
  ApiResourceItemsListType,
  useApiResourceSWR,
} from '@portalweb/api';
import { UIBaseListViewType } from '../../../base';
import { UIListItems } from '../list-items/list-items';

export function UISwrResourceListItems<
  R extends keyof ApiResourceItemsListType,
  P extends ApiResourceGetFetchParamsType<R>,
  Res = ReturnType<typeof useApiResourceSWR<R, P>>
>({
  resourceKey,
  pathQuery,
  paramsQuery,
  children,
  loadingComponent,
  view: defaultView,
  Component,
}: P & {
  resourceKey: R;
  children: (props: Res) => ReactNode;
  loadingComponent: (props: Res) => ReactNode;
  view: UIBaseListViewType;
  Component: FC<{
    data: Record<string, any>;
    view: UIBaseListViewType;
  }>;
}) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const swrRes = useApiResourceSWR({
    resourceKey,
    pathQuery,
    paramsQuery,
  });

  const [view, setView] = useState(defaultView ?? 'list');
  const [page, setPage] = useState(paramsQuery?.page ?? 1);
  const [limit, setLimit] = useState(paramsQuery?.limit ?? 6);
  useEffect(() => {
    setPage(paramsQuery?.page ?? 1);
  }, [paramsQuery, pathQuery]);

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
