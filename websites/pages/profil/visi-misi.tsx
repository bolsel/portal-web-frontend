import { serverSideHost } from '../../src/server';
import { OrganizationsResource } from '@portal-web/shared-api/server';
import BaseLayoutProfilMenu from '../../components/base/layout/profil-menu-layout';
import { UIContentBlocks } from '@portal-web/shared-ui';

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
  const data = await new OrganizationsResource().apiResourceFetch({
    pathQuery: ['getVisiMisiById', website.organization.id],
  });
  return {
    props: {
      website,
      title: 'Visi Misi',
      subTitle: `Visi Misi ${website.organization.name}`,
      data,
    },
  };
}

export default function ProfilVisiMisiPage(props) {
  const { data } = props;
  return (
    <BaseLayoutProfilMenu {...props}>
      {data.visi && data.misi ? (
        <div className="prose max-w-none">
          <h2>Visi</h2>
          <UIContentBlocks {...data.visi} />
          <h2>Misi</h2>
          <UIContentBlocks {...data.misi} />
        </div>
      ) : (
        <div>Belum ada data</div>
      )}
    </BaseLayoutProfilMenu>
  );
}
