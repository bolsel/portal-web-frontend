import SiteLayout from '../../../components/layout/site/layout';
import Lists from '../../www/informasi-grafik/_Lists';
import { getSiteData } from '../../../lib/site';
import { notFound } from 'next/navigation';

export default async function MainInformasiGrafikPage({ params: { domain } }) {
  const site = await getSiteData(domain);
  if (!site) notFound();

  return (
    <SiteLayout
      site={site}
      jumbotron={{
        title: 'Informasi Grafik',
        subtitle: 'Lihat semua informasi grafik',
      }}
    >
      <Lists />
    </SiteLayout>
  );
}
