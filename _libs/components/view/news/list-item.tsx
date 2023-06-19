import { UIIcon, UINextImageBlur } from '@portal-web/shared-ui';
import { LibBaseListItemsViewProps } from '../../base/list-items-view';
import Link from 'next/link';
import Image from 'next/image';
import { documentIcon } from '../../../src/global-helpers';
import clsx from 'clsx';
import { FC } from 'react';

export type LibViewNewsListItemProps = {
  data: Record<string, any>;
} & LibViewNewsListItemOptionsProps;
export type LibViewNewsListItemOptionsProps = {
  isWebNews?: boolean;
  viewType?: LibBaseListItemsViewProps['viewType'];
  urlRead?: (data: LibViewNewsListItemProps['data']) => string;
  small?: boolean;
  linkProps?: (
    data: Record<string, any>
  ) => React.AnchorHTMLAttributes<HTMLAnchorElement>;
  customComponent?: {
    description?: FC<LibViewNewsListItemProps>;
  } & Record<string, FC<LibViewNewsListItemProps>>;
};

export default function LibViewNewsListItem({
  data,
  urlRead,
  viewType = 'list',
  small,
  isWebNews = false,
  linkProps,
  customComponent,
}: LibViewNewsListItemProps) {
  const _urlRead = urlRead ? urlRead(data) : `/berita/${data.slug}`;
  const Render = ({ name, children }) => {
    if (customComponent?.[name]) {
      return customComponent?.[name]({
        data,
        viewType,
        small,
        urlRead,
        isWebNews,
        linkProps,
      });
    }
    return children;
  };
  return (
    <article
      className={clsx(
        'min-w-0 w-full group rounded-xl border border-transparent',
        'transition-all duration-150 ease-out hover:border-gray-200 hover:shadow-sm',
        viewType === 'grid'
          ? 'flex flex-col min-h-[280px]'
          : 'flex gap-4 min-h-[88px]'
      )}
    >
      <Link
        href={_urlRead}
        aria-label={data.title}
        title={data.title}
        {...(linkProps ? linkProps(data) : undefined)}
      >
        <div
          className={clsx(
            viewType === 'list'
              ? 'flex-shrink-0 w-[72px] h-[72px] md:w-[200px] md:h-[130px] overflow-hidden rounded-lg transition-transform duration-300 ease-in-out'
              : 'w-full h-[150px] mb-2 self-start rounded-lg overflow-hidden flex items-center justify-center bg-gray-50',

            { '!w-[72px] !h-[72px]': viewType === 'list' && small }
          )}
        >
          <UINextImageBlur
            src={data.image_cover.url}
            alt={data.title}
            width={72}
            height={72}
            className={clsx(
              'group-hover:scale-110 transition-all ease-in duration-150 bg-base-200',
              'w-full h-full object-cover object-center'
            )}
          />
        </div>
      </Link>
      <div
        className={clsx(
          'w-full flex flex-col items-start justify-center',
          viewType === 'grid' ? 'px-3' : ''
        )}
      >
        <Link
          href={_urlRead}
          aria-label={data.title}
          title={data.title}
          {...(linkProps ? linkProps(data) : undefined)}
        >
          <Render name="title">
            <h1 className="font-lato font-medium text-lg leading-7 text-blue-gray-800 mb-[6px] group-hover:text-primary-700 line-clamp-2">
              {data.title}
            </h1>
          </Render>
        </Link>
        <Render name="description">
          <p
            className="font-lato font-normal text-sm leading-6 text-gray-600 mb-2
            group-hover:text-blue-gray-600 line-clamp-2"
          >
            {data.description === '' ? '' : data.description}
          </p>
        </Render>
        <p className="font-normal text-xs leading-5 text-gray-500">
          <span className="capitalize flex items-center justify-center gap-2">
            {isWebNews ? (
              <>
                <UIIcon icon="mdi:calendar" className="w-4 h-4" />{' '}
                {data.publish_date_format}
              </>
            ) : (
              `${data.category.name} | ${data.publish_date_format}`
            )}
          </span>
        </p>
      </div>
    </article>
  );
}
