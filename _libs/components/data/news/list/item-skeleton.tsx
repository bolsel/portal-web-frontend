import clsx from 'clsx';
import Link from 'next/link';
import { UIIcon, UINextImageBlur } from '@portal-web/shared-ui';
import { FC } from 'react';
import Image from 'next/image';
import { LibBaseDataViewViewType } from '../../../base/data-view/data-view';
import { Grid } from 'swiper';
import { LibDataNewsListItemProps } from './item';

export default function LibDataNewsListItemSkeleton({
  small,
  titleComponent,
  imageComponent,
  viewType,
}: Omit<LibDataNewsListItemProps, 'item'>) {
  return (
    <article
      className={clsx(
        'search-item min-w-0 w-full group rounded-xl border border-transparent',
        'transition-all duration-150 ease-out hover:border-gray-100 hover:shadow-sm',
        viewType === 'grid'
          ? 'flex flex-col min-h-[200px]'
          : 'flex gap-4 min-h-[88px]'
      )}
    >
      <div
        className={clsx(
          viewType === 'list'
            ? 'flex-shrink-0 w-[72px] h-[72px] md:w-[200px] md:h-[130px] overflow-hidden rounded-lg transition-transform duration-300 ease-in-out'
            : 'w-full h-[120px] mb-2 self-start rounded-lg overflow-hidden flex items-center justify-center bg-gray-50',

          { '!w-[72px] !h-[72px]': viewType === 'list' && small },
          'bg-base-200 animate-pulse'
        )}
      >
        <div className=" flex items-center justify-center w-full h-full transition-transform object-center object-cover duration-300 ease-in-out">
          <UIIcon icon={'base:image'} className="text-base-300 w-8 h-8" />
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-center">
        <div className="w-full">
          <div className="w-full h-5 bg-base-200 animate-pulse rounded-md mb-1" />
          <div className="w-2/2 h-4 bg-base-200 animate-pulse rounded-md mb-3" />
          <div className="w-2/2 h-3 bg-base-200 animate-pulse rounded-md mb-1" />
          <div className="w-2/2 h-3 bg-base-200 animate-pulse rounded-md mb-3" />
          <div className="flex flex-row w-2/3">
            <div className="w-1/2 h-4 bg-base-200 animate-pulse rounded-md mb-2 mr-1" />
            <div className="w-1/2 h-4 bg-base-200 animate-pulse rounded-md mb-2" />
          </div>
        </div>
      </div>
    </article>
  );
}
