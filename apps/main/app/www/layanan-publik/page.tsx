import { titleWithMainTitle } from '../../../lib/helper';
import PageWithContainer from '../../../components/pages/page-with-container';
import Lists from './_Lists';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: titleWithMainTitle('Layanan Publik'),
    description: 'Cari tahu Informasi layanan publik yang ada di Bolsel',
    openGraph: {
      images: ['/og-image/layanan-publik'],
    },
  };
}
export default async function MainLayananPublikPage() {
  return (
    <PageWithContainer
      jumbotron={{
        title: 'Layanan Publik',
        subtitle: 'Cari tahu informasi layanan publik yang ada di Bolsel',
        breadcrumb: [
          {
            label: 'Beranda',
            link: '/',
          },
          {
            label: 'Layanan Publik',
            link: '/layanan-publik',
            active: true,
          },
        ],
      }}
    >
      <div className="w-full grid grid-cols-1">
        <Lists />
      </div>
    </PageWithContainer>
  );
}
