/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { ReactNode } from 'react';
import {
  ApiSwrQueryProps,
  TApiResourceItemsList,
  TApiResourceItemsListKeys,
  useApiResourceSWR,
} from '@portalweb/api';

export function UISwrResource<
  C extends TApiResourceItemsListKeys,
  Path extends keyof TApiResourceItemsList[C]['paths']['read'],
  Res = ReturnType<typeof useApiResourceSWR<C, Path>>
>({
  collection,
  path,
  query,
  children,
  loadingComponent,
  emptyComponent,
}: {
  collection: C;
  path: Path;
  query?: ApiSwrQueryProps<C>;
  children: (props: Res) => ReactNode;
  loadingComponent?: (props: Res) => ReactNode;
  emptyComponent?: (props: Res) => ReactNode;
}) {
  const swrRes = useApiResourceSWR(collection, path, query);
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
