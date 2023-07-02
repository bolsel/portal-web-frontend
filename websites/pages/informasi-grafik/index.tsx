import { UIPageGrafikInfoList } from '@portal-web/shared-ui';
import { serverSideHost } from '../../src/server';

export async function getServerSideProps(context) {
  const website = await serverSideHost(context);
  if (!website) {
    return {
      redirect: {
        permanent: false,
        destination: '/404-website',
      },
      props: {},
    };
  }
  return {
    props: {
      website,
      title: 'Informasi Grafik',
      subTitle: `Lihat semua informasi grafik Pemkab Bolsel`,
    },
  };
}

export default function InformasiGrafikIndexPage(props) {
  return (
    <div className="w-full p-5">
      <UIPageGrafikInfoList />
    </div>
  );
}
