import PageWithContainer from '../../../components/pages/page-with-container';
import Lists from './_Lists';

export default function MainLayananPublikPage() {
  return (
    <PageWithContainer
      jumbotron={{
        title: 'Layanan Publik',
        subtitle: 'Informasi layanan publik yang ada di Bolsel',
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
