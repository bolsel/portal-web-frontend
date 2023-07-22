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
}: P & {
  resourceKey: R;
  children: (props: Res) => ReactNode;
  loadingComponent: (props: Res) => ReactNode;
}) {
  const swrRes = useApiResourceSWR({
    resourceKey,
    pathQuery,
    paramsQuery,
  });
  if (swrRes.isLoading) {
    return loadingComponent(swrRes as Res);
  }
  return children(swrRes as Res);
}
