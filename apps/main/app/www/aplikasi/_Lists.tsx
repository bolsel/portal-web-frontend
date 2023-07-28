'use client';

import { ApiResourceGetNormalizerType } from '@portalweb/api';
import {
  UIBaseIcon,
  UIBaseViewApplicationItemDetail,
  UIBaseViewApplicationItemLogo,
  UIBaseViewApplicationListItem,
  UIListItems,
  UIPagination,
  UISwrResource,
  useUIListItemsViewState,
  useUIModal,
} from '@portalweb/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Lists() {
  const searchParams = useSearchParams();
  const currentKategoriSlug = searchParams.get('kategori') ?? '';
  const [view, setView] = useUIListItemsViewState('list');
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const modal = useUIModal();

  useEffect(() => {
    setPage(1);
  }, [currentKategoriSlug]);
  const showModal = (
    item: ApiResourceGetNormalizerType<'applications', 'listPage'>
  ) => {
    modal?.show(<UIBaseViewApplicationItemDetail item={item} />, {
      contentClassName: ({ defaults }) =>
        clsx(defaults.contentClassName, ' max-w-[510px] lg:w-[510px]'),
      header: () => () =>
        (
          <div className="flex gap-2 w-full max-w-[550px] border-b border-b-primary-50">
            <div className="w-1/4">
              <UIBaseViewApplicationItemLogo
                item={item}
                className="w-full rounded-r-box bg-primary-50 group-hover:bg-primary-200 p-1 lg:p-3 flex items-center justify-center"
              />
            </div>
            <div className="flex-1 py-1">
              <span
                className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-primary-50 mb-4
      hover:text-primary-700 hover:bg-primary-100"
              >
                {item.slug}
              </span>
              <h1 className="font-roboto font-medium text-[21px] leading-[34px] text-primary-700">
                {item.title}
              </h1>
            </div>
          </div>
        ),
      footer:
        () =>
        ({ closeModal }) =>
          (
            <div className="bg-gray-50 flex gap-4 w-full items-end justify-end py-4 z-[100] mt-auto md:mt-0 px-6">
              {item.link ? (
                <Link
                  className="btn btn-primary btn-sm text-white gap-2"
                  href={item.link}
                  target="_blank"
                >
                  <UIBaseIcon icon="external-link" fontSize="18px" /> Buka
                  Aplikasi
                </Link>
              ) : null}
            </div>
          ),
    });
  };
  return (
    <>
      <UISwrResource
        resourceKey="applications"
        pathQuery={
          currentKategoriSlug
            ? ['listPageByCategorySlug', currentKategoriSlug]
            : ['listPage']
        }
        paramsQuery={{ page, limit }}
        loadingComponent={() => (
          <UIListItems
            view={view}
            setView={setView}
            items={limit}
            Component={({ view }) => <UIBaseViewApplicationListItem skeleton />}
          />
        )}
      >
        {({ data }) => (
          <>
            <UIListItems
              view={view}
              setView={setView}
              items={data!.data}
              Component={({ item: data, view }) => (
                <UIBaseViewApplicationListItem
                  item={data}
                  onAction={(data) => showModal(data)}
                />
              )}
            />
            <div className="mt-10">
              {data?.meta && (
                <UIPagination
                  total={data.meta.filter_count}
                  limit={limit}
                  page={page}
                  setLimit={setLimit}
                  setPage={setPage}
                />
              )}
            </div>
          </>
        )}
      </UISwrResource>
    </>
  );
}
