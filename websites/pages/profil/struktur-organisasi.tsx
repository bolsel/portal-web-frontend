import { serverSideHost } from '../../src/server';
import { UIIcon } from '@portal-web/shared-ui';
import Link from 'next/link';
import clsx from 'clsx';
import { OrganizationsResource } from '@portal-web/shared-api/server';
import LibContentBlocks from '../../../_libs/components/content-blocks/content-blocks';
import { useRouter } from 'next/router';
import { getBuildedMenuProfilList } from '../../src/menu';
import BaseLayoutProfilMenu from '../../components/base/layout/profil-menu-layout';

export async function getServerSideProps(context) {
  const website = await serverSideHost(context);
  const data = await new OrganizationsResource().apiResourceFetch({
    pathQuery: ['getStructureById', website.organization.id],
  });
  return {
    props: {
      website,
      title: 'Struktur Organisasi',
      subTitle: `Struktur Organisasi ${website.organization.name}`,
      data,
      // breadcrumbs: [
      //   {
      //     label: 'Beranda',
      //     link: '/',
      //   },
      //   {
      //     label: 'Profil',
      //     link: '/profil',
      //   },
      //   {
      //     label: 'Sekilas',
      //     link: '',
      //     active: true,
      //   },
      // ]
    },
  };
}

export default function PageProfilSekilas(props) {
  const { data } = props;
  return (
    <BaseLayoutProfilMenu {...props}>
      <div className="prose max-w-none">
        <LibContentBlocks data={data} />
      </div>
    </BaseLayoutProfilMenu>
  );
}
