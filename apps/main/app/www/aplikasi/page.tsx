import { apiResourceApplicationCategories } from '@portalweb/api/server';
import PageWithContainer from '../../../components/pages/page-with-container';
import KategoriList from './_Kategori';
import Lists from './_Lists';
import KategoriName from './_KategoriName';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aplikasi',
  description:
    'Cari tahu aplikasi yang ada di Pemkab Bolaang Mongondow Selatan',
};

export default async function MainAplikasiPage() {
  const { data: categories } = await apiResourceApplicationCategories().fetch({
    pathQuery: ['all'],
  });
  return (
    <PageWithContainer
      jumbotron={{
        title: 'Aplikasi',
        subtitle:
          'Cari tahu aplikasi yang ada di Pemkab Bolaang Mongondow Selatan',
        breadcrumb: [
          {
            label: 'Beranda',
            link: '/',
          },
          {
            label: 'Aplikasi',
            link: '/aplikasi',
            active: true,
          },
        ],
      }}
    >
      <div className="w-full grid grid-cols-1 xl:grid-cols-[268px,auto] gap-6">
        <aside className=" p-4 border border-gray-200 rounded-xl h-[fit-content]">
          <h2 className="font-lato font-bold text-sm text-gray-800">
            Kategori Dokumen
          </h2>
          <KategoriList categories={categories} />
        </aside>
        {/* <aside className="p-4 w-full border border-gray-200 rounded-xl h-full lg:h-[fit-content]">
          <KategoriList />
        </aside> */}
        <section className="lg:px-10">
          <KategoriName categories={categories} />
          <Lists />
        </section>
      </div>
    </PageWithContainer>
  );
}
