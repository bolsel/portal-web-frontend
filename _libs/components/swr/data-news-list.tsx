import {UIPagination, UISwrResource} from "@portal-web/shared-ui";
import LibDataNewsListDataView, {LibDataNewsListDataViewProps} from "../data/news/list/data-view";
import {ApiResourceProps} from "@portal-web/shared-api";
import LibDataNewsListItemSkeleton from "../data/news/list/item-skeleton";
import LibDataNewsListItem from "../data/news/list/item";
import LibBaseDataView from "../base/data-view/data-view";
import {useState} from "react";

export type LibSwrDataNewsListProps = Omit<LibDataNewsListDataViewProps, 'items'> & ApiResourceProps<'news'> & {
  noPagination?:boolean
}
export default function LibSwrDataNewsList(
  {
    pathQuery,
    paramsQuery,
    noPagination,
    ...props
  }: LibSwrDataNewsListProps
) {
  const [page, setPage] = useState(paramsQuery?.page ?? 1);
  const [limit, setLimit] = useState( paramsQuery?.limit ?? 10);
  const Skeleton = () => <LibBaseDataView
    {...props}
  >
    {({viewType}) => {
      const _items: any = [];
      const limit = paramsQuery?.limit ?? 4
      for (let i = 0; i < limit; i++) {
        _items.push(<LibDataNewsListItemSkeleton key={i} viewType={viewType} {...props.itemComponent}/>)
      }
      return _items;
    }}
  </LibBaseDataView>

  return <UISwrResource
    resourceKey={'news'}
    loadingComponent={() => <Skeleton/>}
    noItemsComponent={() => <div>noItem</div>}
    pathQuery={pathQuery}
    paramsQuery={{
      ...paramsQuery,
      limit,
      page
    }}
  >
    {({data, meta}) => {
      return <>
        <LibDataNewsListDataView
          {...props}
          items={data}
        />
        {meta && !noPagination ?
          <div className={'mt-4'}>
            <UIPagination total={meta.filter_count} page={page} limit={limit} setLimit={setLimit} setPage={setPage}/>
          </div> : null}
      </>
    }}

  </UISwrResource>
}
