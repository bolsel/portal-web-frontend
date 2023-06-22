import { urlAssetCdn } from '../../src/global-helpers';
import clsx from 'clsx';
import { UINextImageBlur } from '@portal-web/shared-ui';

export type LibContentBlocksProps = {
  data: { time: number; blocks: any[]; version: string };
};
export default function LibContentBlocks({ data }: LibContentBlocksProps) {
  const items: any = [];
  const blocks = data.blocks ?? [];
  blocks.forEach((block, i) => {
    if (block.type === 'image') {
      const hasCaption = block.data.caption;
      items.push(
        <div className="w-full" key={i}>
          <UINextImageBlur
            key={i}
            alt=""
            width="0"
            height="0"
            sizes="100vw"
            className={clsx('rounded-sm m-0', { '!mb-7': !hasCaption })}
            src={urlAssetCdn(block.data.file.filename_disk)}
          />
          {hasCaption ? (
            <div className="text-center italic text-sm">{hasCaption}</div>
          ) : null}
        </div>
      );
    } else if (block.type === 'fromhtml') {
      items.push(
        <div key={i} dangerouslySetInnerHTML={{ __html: block.data.html }} />
      );
    } else if (block.type === 'header') {
      const HeaderLevel = ({ level, children }) => {
        if (level === 1) return <h1>{children}</h1>;
        else if (level === 2) return <h2>{children}</h2>;
        else if (level === 3) return <h3>{children}</h3>;
        else if (level === 4) return <h4>{children}</h4>;
        else if (level === 5) return <h5>{children}</h5>;
        else return <h6>{children}</h6>;
      };
      items.push(
        <HeaderLevel level={block.data.level} key={i}>
          {block.data.text}
        </HeaderLevel>
      );
    } else if (block.type === 'paragraph') {
      items.push(
        <p key={i} className="text-justify">
          {block.data.text}
        </p>
      );
    } else if (block.type === 'list') {
      const ListType = ({ style, items, children = false }) => {
        const _items = items.map((item, index) => (
          <li key={index} className="cdx-nested-list__item">
            <div className="cdx-nested-list__item-body">
              <div className="cdx-nested-list__item-content">
                {item.content}
              </div>
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
      items.push(
        <ListType
          items={block.data.items ?? []}
          style={block.data.style}
          key={i}
        />
      );
    } else if(block.type === 'embed'){
      items.push(<iframe key={i} src={block.data.embed} className='w-full h-[400px] rounded-lg my-5'></iframe>)
    }
  });
  return <div className="contents-blocks">{items}</div>;
}
