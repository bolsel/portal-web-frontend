import { apiResourceDocumentCategories } from '@portalweb/api/server';
import PageWithContainer from '../../../components/pages/page-with-container';
import KategoriList from './_Kategori';
import Lists from './_Lists';
import KategoriName from './_KategoriName';
import { Metadata } from 'next';
import { titleWithMainTitle } from '../../../lib/helper';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: titleWithMainTitle('Arsip dan Dokumen'),
    description:
      'Akses dan unduh dokumen resmi dari Pemkab Bolaang Mongondow Selatan',
    openGraph: {
      images: ['/og-image/dokumen'],
    },
  };
}
export default async function MainDokumenPage() {
  const { data: categories } = await apiResourceDocumentCategories().fetch({
    pathQuery: ['listSimple'],
  });
  return (
    <PageWithContainer
      jumbotron={{
        title: 'Arsip dan Dokumen',
        subtitle: 'Akses dan unduh dokumen resmi dari Pemkab Bolsel',
        breadcrumb: [
          {
            label: 'Beranda',
            link: '/',
          },
          {
            label: 'Dokumen',
            link: '/dokumen',
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
