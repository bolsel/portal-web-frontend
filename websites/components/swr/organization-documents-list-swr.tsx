import { UIPagination, UISwrResource } from '@portal-web/shared-ui';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import LibBaseModalDialog from '../../../_libs/components/base/modal-dialog';

export type OrganizationDocumentsListSwrProps = {
  organizationId: string;
  category?: string;
  search?: string;
};

function EmptySearch({ category }) {
  return (
    <section className="w-full flex flex-col items-center justify-center bg-white pb-8">
      <section className="text-center">
        <p className="font-lato text-sm leading-relaxed text-gray-700 text-center mb-0.5">
          Untuk sementara belum ada dokumen (<strong>{category}</strong>)
        </p>
      </section>
    </section>
  );
}

function DocumentsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[60px,1fr] min-w-0 w-full min-h-[228px] md:min-h-[200px] p-4 gap-4 border border-primary-50 rounded-xl">
      <div className="w-12 h-12 md:w-[60px] md:h-[60px] bg-gray-200 animate-pulse rounded-md" />
      <div>
        <div className="inline-block rounded-md h-[32px] w-[100px] bg-gray-200 animate-pulse mb-4" />
        <div className="rounded-sm h-6 w-10/12 bg-gray-200 animate-pulse md:mb-2" />
        <div className="hidden md:block rounded-sm h-4 w-full bg-gray-200 animate-pulse md:mb-2" />
      </div>
      <div className="grid h-[fit-content] grid-cols-2 gap-4 md:col-start-2 md:flex">
        <div className="h-[36px] w-full md:w-[100px] bg-gray-200 animate-pulse rounded-md" />
        <div className="h-[36px] w-full md:w-[100px] bg-gray-200 animate-pulse rounded-md" />
      </div>
    </div>
  );
}

function _Skeleton({ max }) {
  const items: any = [];
  for (let i = 0; i < max; i++) {
    items.push(<DocumentsSkeleton key={i} />);
  }
  return <>{items}</>;
}

function DocumentsItem({
  selengkapnyaClick,
  id,
  file,
  category,
  title,
  description,
}) {
  const documentIcon = () => {
    switch (file.type) {
      case 'application/pdf':
        return '/icons/document/pdf.svg';

      case 'application/msword':
        return '/icons/document/doc.svg';

      case 'application/vnd.ms-excel':
        return '/icons/document/xls.svg';

      default:
        return '/icons/document/pdf.svg';
    }
  };
  return (
    <div className="flex justify-start items-start w-full p-4 gap-4 border border-primary-50 rounded-xl">
      <Image
        src={documentIcon()}
        alt={title}
        className="w-[30px] h-[30px] md:w-[60px] md:h-[60px]"
        width={48}
        height={48}
      />
      <div className="text-left flex flex-col">
        <div>
          <span
            className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-gray-100 mb-2
        hover:text-primary-700 hover:bg-primary-50"
          >
            {category}
          </span>
        </div>
        <h3 className="font-lato text-left font-medium text-lg text-blue-gray-800 mb-2">
          {title}
        </h3>
        <p className="font-lato font-normal text-sm text-blue-gray-800 line-clamp-2">
          {description}
        </p>

        <div className="mt-5 flex  gap-2 items-start md:items-center">
          <button
            type="button"
            onClick={() => selengkapnyaClick()}
            className="font-lato gap-2 normal-case btn btn-outline btn-sm btn-primary"
          >
            <Icon icon="base:eye" fontSize="18px" />
            Selengkapnya
          </button>
          <Link
            href={file.url}
            target="_blank"
            title={title}
            download
            className="font-lato gap-2 normal-case btn text-white btn-sm btn-primary"
          >
            <Icon icon="base:download" fontSize="18px" />
            Unduh
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrganizationDocumentsListSwr({
  organizationId,
  category,
  search,
}: OrganizationDocumentsListSwrProps) {
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [selengkapnyaShow, setSelengkapnyaShow] = useState(false);
  const [current, setCurrent] = useState<any>();
  useEffect(() => {
    setPage(1);
  }, [category, search]);

  function mimeTypeLabel(type) {
    switch (type) {
      case 'application/pdf':
        return 'Portable Document Format (PDF)';

      case 'application/msword':
        return 'Microsoft Word';

      case 'application/vnd.ms-excel':
        return 'Microsoft Excel';

      default:
        return '-';
    }
  }

  return (
    <UISwrResource
      resourceKey={'organization_documents'}
      loadingComponent={() => <_Skeleton max={perPage} />}
      noItemsComponent={() => <EmptySearch category={category} />}
      pathQuery={['byOrganizationId', organizationId]}
      paramsQuery={{
        limit: perPage,
        page: page,
        search: search,
        filter: {
          category: {
            _eq: category,
          },
        },
      }}
    >
      {({ data, meta }) => {
        return (
          <div>
            <ul className="grid grid-cols-1 gap-4">
              {data.map((d, i) => (
                <li key={i}>
                  <DocumentsItem
                    selengkapnyaClick={() => {
                      setCurrent(d);
                      setSelengkapnyaShow(true);
                    }}
                    {...d}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <UIPagination
                total={meta.filter_count}
                page={page}
                limit={perPage}
                setLimit={setPerPage}
                setPage={setPage}
              />
            </div>
            <div className="flex items-end justify-end">
              <LibBaseModalDialog
                show={selengkapnyaShow}
                setShow={setSelengkapnyaShow}
                header={
                  current ? (
                    <section className="p-6 pb-0 max-w-[510px]">
                      <span
                        className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-gray-100 mb-4
        hover:text-primary-700 hover:bg-primary-100"
                      >
                        {current.category}
                      </span>
                      <h1 className="font-roboto font-medium text-[21px] leading-[34px] text-primary-700">
                        {current.title}
                      </h1>
                    </section>
                  ) : (
                    ''
                  )
                }
                footer={
                  <div className="bg-gray-50 flex gap-4 w-full items-end justify-end py-4 z-[100] mt-auto md:mt-0 px-6">
                    <button
                      className="btn btn-primary btn-outline btn-sm !justify-center"
                      onClick={() => setSelengkapnyaShow(false)}
                    >
                      Tutup
                    </button>
                    {current && (
                      <Link
                        className="btn btn-primary btn-sm text-white"
                        href={current.file.url}
                        target="_blank"
                        download
                      >
                        {' '}
                        <Icon icon="base:download" fontSize="18px" /> Unduh
                      </Link>
                    )}
                  </div>
                }
              >
                {current && (
                  <div className="flex flex-col p-4 md:p-6 gap-2 max-w-[550px] overflow-y-auto overflow-x-hidden">
                    <section className="col-span-2 flex gap-4">
                      <div className="w-6">
                        <Icon
                          icon="base:info-outline"
                          className="self-start text-primary w-6 h-6"
                        />
                      </div>
                      {current && current.description ? (
                        <div>
                          <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                            Deskripsi Dokumen
                          </h2>
                          <div className="w-full max-h-[116px] overflow-y-auto pr-4">
                            <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
                              {current && current.description}
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </section>
                    <section className="flex gap-4">
                      <div className="w-6">
                        <Icon
                          icon="base:file-outline"
                          className="self-start text-primary w-6 h-6"
                        />
                      </div>
                      <div>
                        <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                          Format Dokumen
                        </h2>
                        <p
                          className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-gray-100 mb-4
            hover:text-primary-700 hover:bg-primary-100"
                        >
                          {mimeTypeLabel(current.file.type)}
                        </p>
                      </div>
                    </section>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                      <section className="flex gap-4">
                        <div className="w-6">
                          <Icon
                            icon="base:calendar"
                            className="self-start text-primary w-6 h-6"
                          />
                        </div>
                        <div>
                          <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                            Tanggal Publish
                          </h2>
                          <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
                            {current.publish_date_format}
                          </p>
                        </div>
                      </section>
                      <section className="flex gap-4">
                        <div className="w-6">
                          <Icon
                            icon="base:calendar"
                            className="self-start text-primary w-6 h-6"
                          />
                        </div>
                        <div>
                          <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                            Diupdate pada
                          </h2>
                          <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
                            {current.date_updated_format ?? '-'}
                          </p>
                        </div>
                      </section>
                    </div>
                  </div>
                )}
              </LibBaseModalDialog>
            </div>
          </div>
        );
      }}
    </UISwrResource>
  );
}
