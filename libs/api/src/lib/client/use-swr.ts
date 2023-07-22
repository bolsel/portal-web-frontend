'use client';

import { rightTrimSlashes } from '@portalweb/base';
import qs from 'qs';
import {
  ApiResourceGetFetchParamsType,
  ApiResourceGetItemReturnTypeByParams,
  ApiResourceItemsListType,
} from '../../types';
import useSWR from 'swr';
import { fetcherBase } from '../fetchers';

export function useApiResourceSWR<
  R extends keyof ApiResourceItemsListType,
  P extends ApiResourceGetFetchParamsType<R>
>({
  resourceKey,
  pathQuery,
  paramsQuery,
}: {
  resourceKey: R;
} & P) {
  const pathQueryStringBuild = (_pathQuery: string[]) => {
    return _pathQuery?.length ? `/${_pathQuery?.join('/')}` : '';
  };
  const paramsQueryStringBuild = (_paramsQuery: any) => {
    return _paramsQuery ? `?${qs.stringify(_paramsQuery)}` : '';
  };
  const baseResourceUrl = rightTrimSlashes(
    process.env.NEXT_PUBLIC_API_RESOURCE_BASE_URL ?? '/api/resources'
  );
  const url = `${baseResourceUrl}/${resourceKey}${pathQueryStringBuild(
    pathQuery as string[]
  )}${paramsQueryStringBuild(paramsQuery)}`;
  return useSWR<ApiResourceGetItemReturnTypeByParams<R, P>>(url, fetcherBase);
}
