'use client';

import { ApiResourceGetNormalizerType } from '@portalweb/api';
import {
  UIBaseIcon,
  UIBaseViewDocumentItemDetail,
  UIBaseViewDocumentListItem,
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
import { kategoryText } from './lib';

export default function Lists({ organizationId }) {
  const searchParams = useSearchParams();
  const kategori = searchParams.get('kategori');
  const [view, setView] = useUIListItemsViewState('list');
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const modal = useUIModal();
  useEffect(() => {
    setPage(1);
  }, [kategori]);

  const showModal = (
    item: ApiResourceGetNormalizerType<'organization_documents', 'latest'>
  ) => {
    modal?.show(<UIBaseViewDocumentItemDetail item={item} />, {
      contentClassName: ({ defaults }) =>
        clsx(defaults.contentClassName, ' max-w-[510px] lg:w-[510px]'),
      header: () => () =>
      (
        <section className="p-6 pb-0 w-full">
          <span
            className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-gray-100 mb-4
hover:text-primary-700 hover:bg-primary-100"
          >
            {item.category}
          </span>
          <h1 className="font-content-title font-medium text-[21px] leading-[34px] text-primary-700">
            {item.title}
          </h1>
        </section>
      ),
      footer:
        () =>
          ({ closeModal }) =>
          (
            <div className="bg-gray-50 flex gap-4 w-full items-end justify-end py-4 z-[100] mt-auto md:mt-0 px-6">
              <Link
                className="btn btn-primary btn-sm text-white gap-2"
                href={item.file.url}
                target="_blank"
                download
              >
                <UIBaseIcon icon="download" fontSize="18px" /> Unduh
              </Link>

              <Link
                className="btn btn-primary btn-sm text-white gap-2"
                href={`/dokumen/${item.slug}`}
              >
                <UIBaseIcon icon="eye" fontSize="18px" /> Lihat
              </Link>
            </div>
          ),
    });
  };
  return (
    <>
      <UISwrResource
        resourceKey="organization_documents"
        pathQuery={kategori ? ['latestByCategory', organizationId, kategori] : ['latest', organizationId]}
        paramsQuery={{ page, limit }}
        emptyComponent={() => <div>Belum ada data.</div>}
        loadingComponent={() => (
          <UIListItems
            view={view}
            setView={setView}
            items={limit}
            Component={({ view }) => (
              <UIBaseViewDocumentListItem skeleton item={{}} view={view} />
            )}
          />
        )}
      >
        {({ data }) =>
          data.data.length ? (
            <>
              <UIListItems
                view={view}
                setView={setView}
                items={data!.data}
                Component={({ item: data, view }) => (
                  <UIBaseViewDocumentListItem
                    item={data}
                    view={view}
                    customizes={{
                      hideCategory: () => kategori !== null,
                      fields: ({ defaults }) => ({
                        ...defaults.fields,
                        category_name: kategoryText(data.category),
                      }),
                      itemAction: () => (item) => {
                        showModal(item);
                      },
                    }}
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
          ) : (
            <div>Belum ada data.</div>
          )
        }
      </UISwrResource>
    </>
  );
}
