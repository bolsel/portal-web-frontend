/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { ReactNode } from 'react';
import {
  ApiResourceGetFetchParamsType,
  ApiResourceItemsListType,
  useApiResourceSWR,
} from '@portalweb/api';

export function UISwrResource<
  R extends keyof ApiResourceItemsListType,
  P extends ApiResourceGetFetchParamsType<R>,
  Res = ReturnType<typeof useApiResourceSWR<R, P>>
>({
  resourceKey,
  pathQuery,
  paramsQuery,
  children,
  loadingComponent,
  emptyComponent,
}: P & {
  resourceKey: R;
  // @ts-ignore
  children: (props: Res & { data: NonNullable<Res['data']> }) => ReactNode;
  loadingComponent?: (props: Res) => ReactNode;
  emptyComponent?: (props: Res) => ReactNode;
}) {
  // @ts-ignore
  const swrRes = useApiResourceSWR({
    resourceKey,
    pathQuery,
    paramsQuery,
  });
  const loading = loadingComponent ? (
    loadingComponent(swrRes as Res)
  ) : (
    <div>Loading</div>
  );
  const empty = emptyComponent ? (
    emptyComponent(swrRes as Res)
  ) : (
    <div>Belum ada data.</div>
  );
  if (swrRes.isLoading) {
    return loading;
  }
  if (!swrRes.data) {
    return empty;
  }
  //@ts-ignore
  return children(swrRes);
}
