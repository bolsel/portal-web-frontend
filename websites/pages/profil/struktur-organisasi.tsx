import { serverSideHost } from '../../src/server';
import { OrganizationsResource } from '@portal-web/shared-api/server';
import LibContentBlocks from '../../../_libs/components/content-blocks/content-blocks';
import BaseLayoutProfilMenu from '../../components/base/layout/profil-menu-layout';

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
    pathQuery: ['getStructureById', website.organization.id],
  });
  return {
    props: {
      website,
      title: 'Struktur Organisasi',
      subTitle: `Struktur Organisasi ${website.organization.name}`,
      data,
    },
  };
}

export default function ProfilStrukturOrganisasiPage(props) {
  const { data } = props;
  return (
    <BaseLayoutProfilMenu {...props}>
      {data ? (
        <div className="prose max-w-none">
          <LibContentBlocks {...data} />
        </div>
      ) : (
        <div>Belum ada data</div>
      )}
    </BaseLayoutProfilMenu>
  );
}
