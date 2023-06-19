import LibBaseListItemsView, {
  LibBaseListItemsViewProps,
} from '../../base/list-items-view';
import LibViewNewsListItem, {
  LibViewNewsListItemOptionsProps,
  LibViewNewsListItemProps,
} from './list-item';

export type LibViewNewsListProps = Omit<
  LibBaseListItemsViewProps,
  'children'
> & {
  items: LibViewNewsListItemProps['data'][];
  itemOptions?: Omit<LibViewNewsListItemOptionsProps, 'viewType'>;
};

export default function LibViewNewsList({
  items,
  itemOptions,
  ...props
}: LibViewNewsListProps) {
  return (
    <LibBaseListItemsView {...props}>
      {({ viewType }) =>
        items.map((item, index) => (
          <LibViewNewsListItem
            key={index}
            data={item}
            viewType={viewType}
            {...itemOptions}
          />
        ))
      }
    </LibBaseListItemsView>
  );
}
