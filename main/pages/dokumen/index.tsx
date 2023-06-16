import BaseJumbotron from '../../components/base/jumbotron';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import BaseBreadcrumb from '../../components/base/breadcrumb';
import { UIContainer, UISearchInput } from '@portal-web/shared-ui';
import { DocumentCategoriesResource } from '@portal-web/shared-api/server';
import DocumentListSwr from '../../components/client/document-list-swr';

export async function getServerSideProps(context) {
  const { data: documentCategories } = await new DocumentCategoriesResource()
    .itemsHandler()
    .readByQuery({
      fields: ['id', 'name'],
    });
  return {
    props: { documentCategories },
  };
}

function SelectCategories({ list, selected, setSelected }) {
  return (
    <div className="top-16">
      <Listbox value={selected.id} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Icon
                icon="base:unfold-more-horizontal"
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {list.map((d, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-primary-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={d.id}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {d.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
export default function DokumenPage({ documentCategories }) {
  const router = useRouter();
  // const [currentCategoryId,setCurrentCategoryId] = useState(router.query.kategori as string || documentCategories[0].id);
  const currentCategoryId =
    (router.query.kategori as string) || documentCategories[0].id;
  const currentCategory = documentCategories.find(
    (d) => d.id === currentCategoryId
  );
  // const [currentCategory,setCurrentCategory] = useState<{id:string,name:string}>({id:'',name:''})
  // useEffect(()=>{
  //   setCurrentCategory(documentCategories.find(d => d.id === currentCategoryId))
  // },[currentCategoryId])

  const [search, setSearch] = useState('');
  const setCurrentCategoryId = (id) => {
    router.push(`?kategori=${id}`);
  };
  return (
    <main className="overflow-hidden">
      <section>
        <BaseJumbotron
          title="Arsip dan Dokumen"
          subtitle="Akses dan unduh dokumen resmi dari Pemkab Bolsel"
          metaData={true}
          breadcrumb={
            <BaseBreadcrumb
              items={[
                {
                  label: 'Beranda',
                  link: '/',
                },
                {
                  label: 'Arsip dan Dokumen',
                  link: '',
                  active: true,
                },
              ]}
            />
          }
        />
      </section>

      <section className="w-full bg-gray-200">
        <UIContainer className="relative -top-24 z-20">
          <div className="p-3 md:p-4 lg:py-8 lg:px-10 rounded-xl bg-white min-h-screen w-full xl:grid xl:grid-cols-[268px,1fr] xl:grid-rows-[1fr,auto] lg:gap-6">
            <aside className="hidden xl:block p-4 border border-gray-200 rounded-xl h-[fit-content]">
              <h2 className="font-lato font-bold text-sm text-gray-800">
                Kategori Dokumen
              </h2>
              <section className="p-4 grid grid-cols-1 gap-5">
                {documentCategories.map((d, i) => (
                  <div key={i} className="flex">
                    <label
                      onClick={() => setCurrentCategoryId(d.id)}
                      className={clsx(
                        'font-lato font-normal text-sm text-gray-700 cursor-pointer',
                        {
                          'font-bold text-primary-600':
                            d.id === currentCategoryId,
                        }
                      )}
                    >
                      {d.name}
                    </label>
                  </div>
                ))}
              </section>
            </aside>
            <section className="">
              <h1 className="font-bold font-lora text-primary-700 text-[28px] md:text-4xl text-center md:text-left leading-9 md:leading-[56px] mb-8">
                {currentCategory.name}
              </h1>
              <div className="mb-6">
                <UISearchInput
                  currentValue={''}
                  placeholder="Pencarian"
                  onSubmit={(value) => setSearch(value)}
                  onClear={() => setSearch('')}
                />
              </div>
              <div className="!gap-0 mb-6 xl:hidden w-full">
                <SelectCategories
                  list={documentCategories}
                  selected={currentCategory}
                  setSelected={(v) => setCurrentCategoryId(v)}
                />
              </div>
              <DocumentListSwr category={currentCategoryId} search={search} />
            </section>
          </div>
        </UIContainer>
      </section>
    </main>
  );
}
