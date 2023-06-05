import LibBaseDataView, {LibBaseDataViewProps} from "../../../base/data-view/data-view";
import LibDataNewsListItem, {LibDataNewsListItemProps} from "./item";

export type LibDataNewsListDataViewProps = Omit<LibBaseDataViewProps,'children'> & {
  items: Record<string, any>[]
  webNews?:boolean
  itemComponent?: Omit<LibDataNewsListItemProps,'item'>
}
export default function LibDataNewsListDataView(
  {
    items,
    itemComponent,
    webNews = false,
    ...props
  }: LibDataNewsListDataViewProps) {
  return <LibBaseDataView
    {...props}
  >
    {({viewType}) => items.map((item, index) => {
      return <LibDataNewsListItem webNews={webNews} {...itemComponent} viewType={viewType} item={item} key={index}/>
    })}
  </LibBaseDataView>
}
