import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { UIPagination, UIPaginationProps } from '@portal-web/shared-ui';
import { ReactElement, useState } from 'react';

export type LibBaseDataViewViewType = 'list' | 'grid';
export type LibBaseDataViewProps = {
  children:
    | ReactElement
    | ((props: Omit<LibBaseDataViewProps, 'children'>) => any);
  viewType: LibBaseDataViewViewType;
  hideViewSwitch?: boolean;
  gridClass?: string;
};
export default function LibBaseDataView({
  children,
  viewType: defaultViewType,
  hideViewSwitch = false,
  gridClass = 'grid grid-cols-1 lg:grid-cols-2 gap-4',
}: LibBaseDataViewProps) {
  const [viewType, setViewType] = useState(defaultViewType);
  return (
    <div className="w-full">
      {!hideViewSwitch && (
        <div className="flex min-w-0 gap-4 justify-end divide-x divide-gray-400">
          <div className="flex gap-4 items-center mb-3">
            <p className="font-lato font-normal text-sm leading-6 text-blue-gray-500 whitespace-nowrap">
              Tampilan :
            </p>
            <button
              className="w-6 h-6 flex items-center justify-center"
              title="Tampilan List"
              onClick={() => setViewType('list')}
            >
              <Icon
                icon="base:view-list"
                className={clsx('w-full h-full', {
                  'filter grayscale opacity-30': viewType !== 'list',
                })}
              />
            </button>
            <button
              className="w-6 h-6 flex items-center justify-center"
              title="Tampilan Grid"
              onClick={() => setViewType('grid')}
            >
              <Icon
                icon="base:view-grid"
                className={clsx('w-full h-full', {
                  'filter grayscale opacity-30': viewType !== 'grid',
                })}
              />
            </button>
          </div>
        </div>
      )}

      <div
        className={clsx(
          viewType === 'list' ? 'flex flex-col gap-6' : gridClass
        )}
      >
        {typeof children === 'function'
          ? children({
              viewType,
              hideViewSwitch: hideViewSwitch,
              gridClass,
            })
          : children}
      </div>
    </div>
  );
}
