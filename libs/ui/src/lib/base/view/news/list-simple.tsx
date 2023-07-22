import clsx from 'clsx';
import Link from 'next/link';
import {
  IUIBaseCreateCustomizableDefine,
  UIBaseCreateCustomizable,
} from '../../create/customize';

export type UIBaseViewNewsListSimpleType<Item extends Record<string, any>> =
  IUIBaseCreateCustomizableDefine<{
    skeleton?: true;
    item: Item;
  }>;
export const UIBaseViewNewsListSimple = <Item extends Record<string, any>>(
  props: UIBaseViewNewsListSimpleType<Item>['props']
) => {
  return UIBaseCreateCustomizable<UIBaseViewNewsListSimpleType<Item>>({
    props,
    defaults: {},
    Component({ item, skeleton }) {
      if (skeleton) {
        return (
          <div
            className={clsx(
              'min-h-[88px] flex overflow-hidden w-full gap-4',
              'rounded-xl group hover:bg-gray-100 hover:bg-primary/5 p-1 transition-colors ease-brand duration-250'
            )}
          >
            <div className="w-full flex flex-col items-start justify-center">
              <div className="w-full">
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-md mb-1" />
                <div className="w-2/2 h-4 bg-gray-200 animate-pulse rounded-md mb-3" />
                <div className="flex flex-row w-2/3">
                  <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded-md mb-2 mr-1" />
                  <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded-md mb-2" />
                </div>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div
          className={clsx(
            'min-h-[88px] flex overflow-hidden w-full gap-4 border-4 border-transparent rounded-xl',
            'group hover:bg-primary/5 p-1 transition-colors ease-brand duration-250'
          )}
        >
          <div className="w-full flex flex-col items-start justify-center">
            <Link href={`/berita/${item.slug}`}>
              <h2 className="mb-2 line-clamp-2 font-medium leading-7 group-hover:text-primary">
                {item.title}
              </h2>
            </Link>
            <div className="font-normal text-xs leading-5 text-neutral">
              <span className="group-hover:text-neutral capitalize">
                {item.category_name}
              </span>
              <span className="mx-1">|</span>
              <span className="group-hover:text-neutral">
                {item.publish_date_format}
              </span>
            </div>
          </div>
        </div>
      );
    },
  });
};
