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
    pathQuery: ['getSekilasById', website.organization.id],
  });
  return {
    props: {
      website,
      title: 'Sekilas',
      subTitle: `Sekilas tentang ${website.organization.name}`,
      data,
    },
  };
}

export default function ProfilSekilasPage(props) {
  const { data } = props;
  return (
    <BaseLayoutProfilMenu {...props}>
      {data ? (
        <div className="prose max-w-none">
          <UIContentBlocks {...data} />
        </div>
      ) : (
        <div>Belum ada data</div>
      )}
    </BaseLayoutProfilMenu>
  );
}
