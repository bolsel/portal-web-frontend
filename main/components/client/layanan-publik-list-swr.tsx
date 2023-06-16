import { UIIcon, UISwrResource } from '@portal-web/shared-ui';
import BaseDataView from '../base/data-view/data-view';
import React, { useState } from 'react';
import BaseDataViewSkeleton from '../base/data-view/skeleton';
import Link from 'next/link';
import clsx from 'clsx';

export default function LayananPublikListSwr() {
  const [viewType, setViewType] = useState('list');
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [current, setCurrent] = useState<any>(null);

  const LogoComponent = ({ item, className }) => (
    <div className={`${className}`}>
      {item.logo ? (
        <img src={item.logo.url} alt={`Logo ${item.slug}`} className="w-full" />
      ) : (
        <UIIcon
          icon="base:layanan-publik"
          className="text-primary-base"
          width={48}
          height={48}
        />
      )}
    </div>
  );
  const ItemView = ({ item }) => (
    <Link
      href={`/layanan-publik/${item.id}`}
      // onClick={() => showModal(item)}
      className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none
    min-w-full rounded-xl flex border border-primary-50
    p-4 w-full cursor-pointer group hover:bg-primary-50 rounded-lg"
    >
      <div className="flex gap-2 items-start h-full">
        <LogoComponent
          item={item}
          className="rounded-box bg-gray-100 group-hover:bg-primary-200 p-1 lg:p-3 w-[50px] md:w-[70px] lg:w-[100px] flex items-center justify-center"
        />
        <div className="">
          <div className="font-lato font-bold text-sm text-blue-gray-800 leading-1 md:text-base">
            {item.title}
          </div>

          {item.type.length ? (
            <div className="flex gap-2 mb-2">
              {item.type.map((t, i) => (
                <span
                  key={i}
                  className="inline-block rounded-md px-2 py-1 text-xs font-semibold text-gray-700 bg-primary-50
  group-hover:text-primary-700 group-hover:bg-primary-200"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
          <p className="w-4/4 font-lato text-sm font-normal text-[#415C84] leading-5 line-clamp-3 md:line-clamp-2 mt-3 mb-3">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );
  return (
    <UISwrResource
      resourceKey={'public_services'}
      pathQuery={['listSortFields']}
      loadingComponent={() => (
        <BaseDataViewSkeleton limit={limit} viewType={viewType} />
      )}
      noItemsComponent={() => (
        <li className="text-center">Belum ada data untuk ditampilkan.</li>
      )}
      wrapperComponent={({ children, data }) => (
        <BaseDataView
          viewType={viewType}
          setViewType={setViewType}
          pagination={
            data && data.meta
              ? {
                  total: data.meta.filter_count,
                  page,
                  limit,
                  setLimit,
                  setPage,
                  customPerPages: [2, 4, 6, 8, 10, 20],
                }
              : undefined
          }
        >
          {children}
        </BaseDataView>
      )}
    >
      {(data) => {
        return data.data.map((item, i) => {
          return (
            <li
              key={i}
              className={clsx(
                viewType === 'list'
                  ? ' flex-col gap-2 md:flex-row md:gap-6'
                  : 'flex-col gap-2'
              )}
            >
              {ItemView({ item })}
            </li>
          );
        });
      }}
    </UISwrResource>
  );
}
