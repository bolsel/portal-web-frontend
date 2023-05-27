import {Icon} from '@iconify/react';
import clsx from 'clsx';
import {UIPagination, UIPaginationProps} from "@portal-web/shared-ui";
import {useState} from "react";

export type BaseDataViewType = 'list' | 'grid';
export type BaseDataViewProps = {
  children: any
  pagination?: UIPaginationProps,
  viewType: string | BaseDataViewType,
  setViewType: any
}
export default function BaseDataView({children, viewType, setViewType, pagination}: BaseDataViewProps) {
  return <div className="w-full">
    <div className="hidden lg:flex min-w-0 gap-4 justify-between lg:justify-end lg:divide-x lg:divide-gray-400">
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

    <ul
      className={clsx(
        viewType === 'list'
          ? 'flex flex-col gap-6'
          : 'grid grid-cols-1 lg:grid-cols-2 gap-4'
      )}
    >
      {children}
    </ul>
    <div className="mt-4">
      {pagination &&
        <UIPagination
          // total={data.meta.filter_count}
          {...pagination}
          // page={pagination.page}
          // limit={limit}
          // setLimit={setLimit}
          // setPage={setPage}
          // customPerPages={[2,4,6,8,10,20]}
        />}
    </div>
  </div>
}
