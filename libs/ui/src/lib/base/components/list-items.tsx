import { ReactNode } from 'react';
import clsx from 'clsx';
import { UIBaseListViewType } from '../types';

export function UIBaseListItems({
  view,
  children,
  classNames,
}: {
  classNames?: Partial<{
    [key in UIBaseListViewType]: string;
  }>;
  children: ReactNode;
  view: UIBaseListViewType;
}) {
  const _classNames = {
    list: 'flex flex-col gap-6',
    grid: 'grid grid-cols-1 lg:grid-cols-2 gap-4',
    ...classNames,
  };
  return (
    <div className={clsx('ui-base-list-items', _classNames[view])}>
      {children}
    </div>
  );
}
