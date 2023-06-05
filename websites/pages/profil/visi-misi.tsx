import { serverSideHost } from '../../src/server';
import {
  OrganizationsResource,
  WebsitesResource,
} from '@portal-web/shared-api/server';
import LibContentBlocks from '../../../_libs/components/content-blocks/content-blocks';
import BaseLayoutProfilMenu from '../../components/base/layout/profil-menu-layout';
import { notFound, redirect } from 'next/navigation';

export async function getServerSideProps(context) {
  const website = await serverSideHost(context);
  if (!website) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
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

export default function PageProfilSekilas(props) {
  const { data } = props;
  return (
    <BaseLayoutProfilMenu {...props}>
      <div className="prose max-w-none">
        <h2>Visi</h2>
        <LibContentBlocks data={data.visi} />
        <h2>Visi</h2>
        <LibContentBlocks data={data.misi} />
      </div>
    </BaseLayoutProfilMenu>
  );
}
