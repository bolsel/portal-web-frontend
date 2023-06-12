import clsx from 'clsx';
import React from "react";

export default function BaseDataViewSkeleton({viewType, limit}) {
  const items: any = [];
  for (let i = 0; i < limit; i++) {
    items.push(<li key={i}
                   className={clsx(
                     'min-w-0 flex p-4 rounded-xl border border-[#E9EDF4]',
                     viewType === 'list'
                       ? 'flex-col gap-2 md:flex-row min-h-[262px] md:min-h-[158px] md:gap-6'
                       : 'min-h-[262px] md:min-h-[242px] flex-col gap-2'
                   )}
    >
      <div className="w-[60px] h-[60px] object-cover rounded-full bg-gray-200 animate-pulse"/>
      <div className="flex-1">
        <div className="w-3/4 h-5 bg-gray-200 animate-pulse rounded-md mb-2"/>
        <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded-md mb-3"/>
        <div className="w-4/5 h-3 bg-gray-200 animate-pulse rounded-md mb-1"/>
        <div className="w-3/5 h-3 bg-gray-200 animate-pulse rounded-md mb-3"/>
        <div className="w-[100px] h-[31px] bg-gray-200 animate-pulse rounded-md"/>
      </div>
    </li>)
  }
  return (<>
      {items}
    </>
  );
}
