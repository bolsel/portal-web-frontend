import { FC } from 'react';
import { UIContentBlocksItemProps } from '../_base';
import clsx from 'clsx';

const ListTool: FC<UIContentBlocksItemProps<{ style: string; items: any }>> = ({
  data: { items, style },
}) => {
  const ListType = ({ style, items, children = false }) => {
    const _items = items.map((item, index) => (
      <li key={index} className="cdx-nested-list__item">
        <div className="cdx-nested-list__item-body">
          <div
            className="cdx-nested-list__item-content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
          {item.items ? (
            <ListType children style={style} items={item.items} />
          ) : null}
        </div>
      </li>
    ));
    if (style === 'unordered') {
      return (
        <ul
          className={clsx(
            'cdx-nested-list',
            { 'cdx-nested-list__item-children': children },
            `cdx-nested-list--${style}`
          )}
        >
          {_items}
        </ul>
      );
    }
    return (
      <ol
        className={clsx(
          'cdx-nested-list',
          { 'cdx-nested-list__item-children': children },
          `cdx-nested-list--${style}`
        )}
      >
        {_items}
      </ol>
    );
  };
  return <ListType children style={style} items={items} />;
};
export default ListTool;
