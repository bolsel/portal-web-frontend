import LibBaseListItemsView, {
  LibBaseListItemsViewProps,
} from '../../base/list-items-view';
import LibViewDocumentListItem, {
  LibViewDocumentListItemOptionsProps,
  LibViewDocumentListItemProps,
} from './list-item';

export type LibViewDocumentListProps = Omit<
  LibBaseListItemsViewProps,
  'children'
> & {
  items: LibViewDocumentListItemProps['data'][];
  itemAction: LibViewDocumentListItemProps['itemAction'];
  itemOptions?: LibViewDocumentListItemOptionsProps;
};

export default function LibViewDocumentList({
  items,
  itemAction,
  itemOptions,
  ...props
}: LibViewDocumentListProps) {
  return (
    <LibBaseListItemsView {...props}>
      {({ viewType }) =>
        items.map((item, index) => (
          <LibViewDocumentListItem
            key={index}
            data={item}
            viewType={viewType}
            itemAction={itemAction}
            {...itemOptions}
          />
        ))
      }
    </LibBaseListItemsView>
  );
}
