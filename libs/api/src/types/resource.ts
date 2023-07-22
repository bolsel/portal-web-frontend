/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApiBaseFetchReturnType, apiResourceItems } from '../server';

export type ApiResourceItemsListType = ReturnType<typeof apiResourceItems>;

export type ApiResourceGetItemType<R extends keyof ApiResourceItemsListType> =
  ReturnType<ApiResourceItemsListType[R]>;

export type ApiResourceGetItemTypePaths<
  R extends keyof ApiResourceItemsListType
> = ApiResourceGetItemType<R>['paths'];

export type ApiResourceGetItemTypeFetch<
  R extends keyof ApiResourceItemsListType
> = ApiResourceGetItemType<R>['fetch'];

export type ApiResourceGetItemTypeFetchReturnType<
  R extends keyof ApiResourceItemsListType
> = ReturnType<ApiResourceGetItemType<R>['fetch']>;

export type ApiResourceGetFetchParamsType<
  R extends keyof ApiResourceItemsListType
> = Parameters<ApiResourceGetItemTypeFetch<R>>['0'];

export type ApiResourceGetItemReturnType<
  R extends keyof ApiResourceItemsListType,
  Path extends keyof ApiResourceGetItemTypePaths<R>
  // @ts-ignore
> = ApiBaseFetchReturnType<ApiResourceGetItemTypePaths<R>, Path>;

export type ApiResourceGetItemReturnTypeByParams<
  R extends keyof ApiResourceItemsListType,
  Params extends ApiResourceGetFetchParamsType<R>
  // @ts-ignore
> = ApiBaseFetchReturnType<
  // @ts-ignore
  ApiResourceGetItemTypePaths<R>,
  Params['pathQuery']['0']
>;
