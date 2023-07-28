import PageWithContainer from '../../../components/pages/page-with-container';
import Lists from './_Lists';

export default function MainInformasiGrafikPage() {
  return (
    <PageWithContainer
      jumbotron={{
        title: 'Informasi Grafik',
        subtitle: 'Lihat semua informasi grafik',
        breadcrumb: [
          {
            label: 'Beranda',
            link: '/',
          },
          {
            label: 'Informasi Grafik',
            link: '/informasi-grafik',
            active: true,
          },
        ],
      }}
    >
      <Lists />
    </PageWithContainer>
  );
}
