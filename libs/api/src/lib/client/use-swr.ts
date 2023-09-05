/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { rightTrimSlashes } from '@portalweb/base';
import qs from 'qs';
import {
  TApiResourceItemsList,
  TApiResourceItemsListKeys,
  TApiResourcePathReturn,
} from '../../types';
import useSWR from 'swr';
import { fetcherBase } from '../fetchers';
import type { PathItemProps } from '../server/resource/base';

export type ApiSwrQueryProps<C extends TApiResourceItemsListKeys> = Partial<
  PathItemProps<C, 'read'>
>;

export function useApiResourceSWR<
  C extends TApiResourceItemsListKeys,
  Path extends keyof TApiResourceItemsList[C]['paths']['read']
>(collection: C, path: Path, query?: ApiSwrQueryProps<C>) {
  const pathQueryStringBuild = (_pathQuery: any[]) => {
    return _pathQuery?.length ? `/${_pathQuery?.join('/')}` : '';
  };
  const paramsQueryStringBuild = (_paramsQuery: any) => {
    return _paramsQuery ? `?${qs.stringify(_paramsQuery)}` : '';
  };
  const baseResourceUrl = rightTrimSlashes(
    process.env.NEXT_PUBLIC_API_RESOURCE_BASE_URL ?? '/api/resources'
  );
  const paths = [path, ...(query?.paths ?? [])];
  const url = `${baseResourceUrl}/${collection}${pathQueryStringBuild(
    paths
  )}${paramsQueryStringBuild(query)}`;
  return useSWR<TApiResourcePathReturn<C>['read'][Path]>(url, {
    fetcher: fetcherBase,
    revalidateOnFocus: false,
  });
}
