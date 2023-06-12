import React, {useState} from 'react';
import {Icon} from '@iconify/react';
import ModalDialog from '../modal/modal-dialog';
import Link from 'next/link';
import {UIPagination, UISwrResource} from "@portal-web/shared-ui";
import clsx from "clsx";
import BaseDataView from "../base/data-view/data-view";
import BaseDataViewSkeleton from "../base/data-view/skeleton";

export default function AplikasiListDataSwr({
                                              search,
                                              categories,
                                            }: {
  search?: string;
  categories: string[];
}) {
  const [viewType, setViewType] = useState('list');
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [current, setCurrent] = useState<any>(null);
  const showModal = (item) => {
    setCurrent(item);
    setModalShow(true);
  };
  const LogoComponent = ({item, className}) => (
    <div className={`${className}`}>
      {item.logo.url ? (
        <img src={item.logo.url} alt={`Logo ${item.slug}`} className="w-full"/>
      ) : (
        <Icon
          icon="base:carbon-application"
          className="text-primary"
          width={48}
          height={48}
        />
      )}
    </div>
  );
  const ItemView = ({item}) => (
    <div
      onClick={() => showModal(item)}
      className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none
    min-w-full rounded-xl flex border border-primary-50
    p-4 w-full cursor-pointer group hover:bg-primary-50 rounded-lg"
    >
      <div className="flex gap-2 items-start h-full">
        <LogoComponent
          item={item}
          className="rounded-box bg-gray-100 group-hover:bg-primary-200 p-1 lg:p-3 w-[50px] md:w-[70px] lg:w-[100px] flex items-center justify-center"
        />
        <div className="flex-1">
          <div className="">
            <span
              className="inline-block rounded-md px-2 py-1 text-xs font-semibold text-gray-700 bg-primary-50
  group-hover:text-primary-700 group-hover:bg-primary-200"
            >
              {item.slug}
            </span>
          </div>
          <div className="font-lato font-bold text-sm text-blue-gray-800 leading-1 md:text-base">
            {item.title}
          </div>

          <p
            className="w-4/4 font-lato text-sm font-normal text-[#415C84] leading-5 line-clamp-3 md:line-clamp-2 mt-3 mb-3">
            {item.description}
          </p>
          {item.categories.map((category, i) => {
            return (
              <div
                key={i}
                className="inline-block rounded-lg py-1 px-2 text-xs font-normal text-gray-700 bg-gray-100
    group-hover:text-primary-700 group-hover:bg-primary-100 mr-2"
              >
                {category.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );


  return <>
    <UISwrResource
      resourceKey={"applications"}
      loadingComponent={() => <BaseDataViewSkeleton viewType={viewType} limit={limit}/>}
      noItemsComponent={() => <li className='text-center'>
        {search?`Belum ada data untuk hasil pencarian ${search}` : 'Belum ada data untuk ditampilkan.'}
      </li>}
      wrapperComponent={
        ({children, data}) => <BaseDataView
          viewType={viewType}
          setViewType={setViewType}
          pagination={data && data.meta ? {
            total: data.meta.filter_count,
            page,
            limit,
            setLimit,
            setPage,
            customPerPages: [2, 4, 6, 8, 10, 20]
          } : undefined}
        >
          {children}
        </BaseDataView>
      }
      pathQuery={['byCategories', categories.join('|')]}
      paramsQuery={{search, page, limit}}
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
              {ItemView({item})}
            </li>
          );
        })
      }}
    </UISwrResource>
    <ModalDialog
      show={modalShow}
      setShow={setModalShow}
      header={
        current ? (
          <div className="flex gap-2 w-full max-w-[550px] border-b border-b-primary-50">
            <div className="w-1/4">
              <LogoComponent
                item={current}
                className="w-full rounded-r-box bg-primary-50 group-hover:bg-primary-200 p-1 lg:p-3 flex items-center justify-center"
              />
            </div>
            <div className="flex-1 py-1">
                <span
                  className="inline-block rounded-md px-[10px] py-2 text-xs font-normal text-gray-700 bg-primary-50 mb-4
        hover:text-primary-700 hover:bg-primary-100"
                >
                  {current.slug}
                </span>
              <h1 className="font-roboto font-medium text-[21px] leading-[34px] text-primary-700">
                {current.title}
              </h1>
            </div>
          </div>
        ) : (
          ''
        )
      }
    >
      {current && (
        <div className="flex flex-col p-4 md:p-6 gap-2 max-w-[550px] overflow-y-auto overflow-x-hidden">
          <section className="col-span-2 flex gap-4">
            <div className="w-6">
              <Icon
                icon="mdi:info-outline"
                className="self-start text-primary w-6 h-6"
              />
            </div>
            <div>
              <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                Deskripsi Aplikasi
              </h2>
              <div className="w-full max-h-[116px] overflow-y-auto pr-4">
                <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
                  {current && current.description}
                </p>
              </div>
            </div>
          </section>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="flex gap-4">
              <div className="w-6">
                <Icon
                  icon="icons8:organization"
                  className="self-start text-primary w-6 h-6"
                />
              </div>
              <div>
                <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                  Organisasi
                </h2>
                <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
                  {current.organization
                    ? current.organization.name
                    : '-'}
                </p>
              </div>
            </section>
            <section className="flex gap-4">
              <div className="w-6">
                <Icon
                  icon="bx:category-alt"
                  className="self-start text-primary w-6 h-6"
                />
              </div>
              <div>
                <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                  Kategori Aplikasi
                </h2>
                <div className="flex gap-1 flex-col mb-4">
                  {current.categories.map((category, i) => (
                    <div
                      key={i}
                      className=" rounded-lg py-1 px-2 text-xs font-normal text-gray-700 bg-gray-100
  hover:text-primary-700 hover:bg-primary-100"
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <section className="flex gap-4">
            <div className="w-6">
              <Icon
                icon="mdi:link-variant"
                className="self-start text-primary w-6 h-6"
              />
            </div>
            <div>
              <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                Link Aplikasi
              </h2>
              <p className="text-gray-800 font-normal text-sm leading-relaxed mb-4">
                {current.link ? (
                  <Link
                    className="link link-primary"
                    href={current.link}
                    target="_blank"
                  >
                    {current.link}
                  </Link>
                ) : (
                  '-'
                )}
              </p>
            </div>
          </section>
          {current.links && current.links.length ? (
            <section className="flex gap-4">
              <div className="w-6">
                <Icon
                  icon="mdi:link-variant"
                  className="self-start text-primary w-6 h-6"
                />
              </div>
              <div>
                <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                  Link Lainnya
                </h2>
                <div className="flex gap-2">
                  {current.links.map((sm, i) => {
                    let _icon = 'mdi:web';
                    if (sm.name === 'playstore')
                      _icon = 'ion:logo-google-playstore';
                    else if (sm.name === 'appstore')
                      _icon = 'ion:logo-apple-appstore';
                    return (
                      <Link
                        key={i}
                        target="_blank"
                        title={sm.name}
                        href={sm.link}
                        className="flex flex-col p-2 items-center justify-center gap-1 rounded-lg hover:bg-primary-50"
                      >
                        <Icon icon={_icon} className="w-8 h-8"/>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : null}
          <section className="flex gap-4">
            <div className="w-6">
              <Icon
                icon="material-symbols:share-outline"
                className="self-start text-primary w-6 h-6"
              />
            </div>
            <div>
              <h2 className="font-lato text-xs text-blue-gray-200 mb-1 leading-5">
                Sosial Media
              </h2>
              <div className="flex gap-2">
                {!current.social_media
                  ? '-'
                  : current.social_media.map((sm, i) => (
                    <Link
                      key={i}
                      target="_blank"
                      title={sm.name}
                      href={sm.link}
                      className="flex flex-col p-2 items-center justify-center gap-1 rounded-lg hover:bg-primary-50"
                    >
                      <Icon
                        icon={`custom-brand-logo:${sm.name}`}
                        className="w-8 h-8"
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </ModalDialog>
  </>

}
