import { IItems, Item, QueryMany, TypeOf } from '@directus/sdk';
import { apiInstance } from './instance';
import { ApiItemsType } from '../../types';
import { unstable_cache } from 'next/cache';

type NormalizerFnType<ItemType> = (data: ItemType) => Record<string, any>;

export type ApiBaseFetchReturnType<
  Paths extends PathsType<any, any, any>,
  K extends keyof Paths,
  IsItem = ReturnType<Paths[K]>['isItem'],
  NormalizerReturn = ReturnType<ReturnType<Paths[K]>['normalizer']>
> = IsItem extends true
  ? NormalizerReturn
  : {
      data: NormalizerReturn[];
      meta: CollectionMetaType;
    };

type PathsType<I extends Item, ItemType, DefaultQuery> = Record<
  string,
  (props: {
    query: DefaultQuery;
    pathQuery: string[];
    errorThrow: (msg: string) => void;
    itemHandler: IItems<I>;
  }) => {
    isItem?: true;
    query: QueryMany<I>;
    normalizer: NormalizerFnType<ItemType>;
  }
>;
type PostPathsType<I extends Item, ItemType, DefaultQuery> = Record<
  string,
  (props: {
    data: Record<string, any>;
    itemHandler: IItems<I>;
    pathQuery: string[];
    errorThrow: (msg: string) => void;
  }) => any
>;

export type CollectionMetaType = {
  total_count: number;
  filter_count: number;
  page: number;
  limit: number;
};

export function apiBaseResource<
  RK extends keyof ApiItemsType,
  Paths extends PathsType<I, ItemType, DefaultQuery>,
  PostPaths extends PostPathsType<I, ItemType, DefaultQuery>,
  DefaultQuery extends QueryMany<I>,
  ItemType = ApiItemsType[RK],
  I extends Item = TypeOf<ApiItemsType, RK>
>({
  resourceKey,
  paths,
  defaultQuery,
  postPaths,
  baseFilter,
  singleton = false,
}: {
  resourceKey: RK;
  paths: Paths;
  defaultQuery: DefaultQuery;
  postPaths?: PostPaths;
  baseFilter?: QueryMany<I>['filter'];
  singleton?: boolean;
}) {
  const itemHandler: IItems<I> = apiInstance().items(resourceKey);

  const errorThrow = (msg: string) => {
    throw new Error(msg);
  };
  async function _fetch<K extends keyof Paths>({
    pathQuery: [pathKey, ..._p],
    paramsQuery,
  }: {
    pathQuery: [K, ...Parameters<Paths[K]>['0']['pathQuery']];
    paramsQuery?: Partial<
      Pick<QueryMany<I>, 'filter' | 'page' | 'limit' | 'search'>
    >;
  }): Promise<ApiBaseFetchReturnType<Paths, K>> {
    if (!paths) throw new Error('List resource path belum diset.');
    if (!paths[pathKey])
      throw new Error(`Path resource tidak ada: ${pathKey as string}`);
    const {
      query,
      isItem,
      normalizer: normalizers,
    } = paths![pathKey]({
      query: defaultQuery,
      pathQuery: _p,
      errorThrow,
      itemHandler,
    });
    let _query = { ...defaultQuery, ...query };

    _query.filter =
      _query.filter && baseFilter
        ? {
            _and: [baseFilter, _query.filter],
          }
        : baseFilter ?? _query.filter;
    if (!isItem) {
      _query = {
        ...{
          meta: '*',
          page: paramsQuery?.page ?? 1,
          limit: paramsQuery?.limit ?? 10,
          search: paramsQuery?.search,
        },
        ..._query,
      };
    }
    if (paramsQuery?.filter) {
      _query.filter = {
        _and: [_query.filter, paramsQuery?.filter],
      };
    }

    const _normalizers = (data: any) => {
      return normalizers(data);
    };
    const res = await itemHandler.readByQuery(_query);
    if (singleton) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return _normalizers(res.data);
    }
    if (isItem) {
      if (!res.data) errorThrow('tidak ada item.');
      if (!res.data?.length) errorThrow('tidak ada item.');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return _normalizers(res.data[0]);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return {
      data: res.data?.map(_normalizers) ?? [],
      meta: {
        ...{
          total_count: 0,
          filter_count: 0,
          page: _query.page,
          limit: _query.limit,
        },
        ...(res.meta ?? {}),
      },
    };
  }
  async function _fetchCache({
    tags,
    revalidate,
    pathQuery,
    ...props
  }: Parameters<typeof _fetch>['0'] & {
    tags?: string[];
    revalidate?: number;
  }) {
    const _tags = [
      `resources-${resourceKey}-${pathQuery.join('-')}`,
      ...(tags ?? []),
    ];
    return await unstable_cache(
      async () => await _fetch({ pathQuery, ...props }),
      _tags,
      {
        revalidate: revalidate ?? 600,
        tags: _tags,
      }
    )();
  }
  async function _post<K extends keyof PostPaths>({
    pathQuery: [pathKey, ..._p],
    data,
  }: {
    pathQuery: [K, ...Parameters<PostPaths[K]>['0']['pathQuery']];
    data: Record<string, any>;
  }): Promise<ReturnType<PostPaths[K]>> {
    if (!postPaths) throw new Error('Post path tidak ada untuk resource ini.');
    if (!postPaths[pathKey])
      throw new Error(`Path resource tidak ada: ${pathKey as string} (post)`);
    return postPaths[pathKey]({
      data: data ?? {},
      errorThrow,
      itemHandler,
      pathQuery: _p,
    });
  }

  return {
    itemHandler,
    paths,
    fetch: _fetch,
    fetchCache: _fetchCache,
    post: _post,
    singleton: apiInstance().singleton(resourceKey),
  };
}
