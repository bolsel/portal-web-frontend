import BaseJumbotron from '../../components/base/jumbotron';
import { useState } from 'react';
import {
  UIContainer,
  UISearchInput,
  UISwrResourceApplicationListItems,
} from '@portal-web/shared-ui';
import BaseBreadcrumb from '../../components/base/breadcrumb';
import AplikasiKategoriListSelectSwr from '../../components/client/aplikasi-kategori-list-select-swr';
import { ApplicationCategoriesResource } from '@portal-web/shared-api/server';

export async function getServerSideProps({ params }) {
  const { data: categories } = await new ApplicationCategoriesResource()
    .itemsHandler()
    .readByQuery({ fields: ['id', 'name'], limit: -1 });
  return { props: { categories } };
}

export default function AplikasiPage({ categories }) {
  const [categoriesSelected, setCategoriesSelected] = useState(
    categories.map((d) => d.id)
  );
  const [search, setSearch] = useState('');
  return (
    <main className="overflow-hidden">
      <section>
        <BaseJumbotron
          title="Aplikasi"
          subtitle="Cari tahu tentang aplikasi yang ada di Pemkab Bolaang Mongondow Selatan"
          breadcrumb={
            <BaseBreadcrumb
              items={[
                {
                  label: 'Beranda',
                  link: '/',
                },
                {
                  label: 'Aplikasi',
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
          <div className="bg-white p-3 md:p-4 lg:p-6 xl:px-10 xl:py-8 rounded-xl shadow ">
            <div className="grid grid-cols-1 xl:grid-cols-search-container gap-6 ">
              <aside className="hidden xl:block w-full xl:max-w-[300px] h-[fit-content] border border-gray-200 rounded-xl py-3 px-4">
                <section className="hidden xl:flex flex-col gap-5 ">
                  <AplikasiKategoriListSelectSwr
                    categories={categories}
                    selected={categoriesSelected}
                    setSelected={setCategoriesSelected}
                    staticOptions={true}
                  />
                </section>
              </aside>
              <div className="w-full min-w-0 flex flex-col gap-6 ">
                <h1 className="font-bold font-lora text-primary-700 text-[28px] leading-10 md:text-4xl md:leading-none">
                  Daftar Aplikasi Bolsel
                </h1>
                <UISearchInput
                  placeholder="Cari Aplikasi"
                  onClear={() => setSearch('')}
                  onSubmit={setSearch}
                />
                <section className="flex xl:hidden flex-col gap-5">
                  <AplikasiKategoriListSelectSwr
                    categories={categories}
                    selected={categoriesSelected}
                    setSelected={setCategoriesSelected}
                    staticOptions={false}
                  />
                </section>
                <UISwrResourceApplicationListItems
                  search={search}
                  categories={categoriesSelected}
                />
              </div>
            </div>
          </div>
        </UIContainer>
      </section>
    </main>
  );
}
