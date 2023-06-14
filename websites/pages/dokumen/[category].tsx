import { serverSideHost } from '../../src/server';
import {
  OrganizationDocumentsResource,
} from '@portal-web/shared-api/server';
import OrganizationDocumentsListSwr from '../../components/swr/organization-documents-list-swr';
import { UIIcon } from '@portal-web/shared-ui';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const { category } = context.params;
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
  const { data } = await new OrganizationDocumentsResource().apiResourceFetch({
    pathQuery: ['byOrganizationId', website.organization.id],
  });
  const _categoryText = () => {
    if (category === 'dokumen-perencanaan') return 'Dokumen Perencanaan';
    else if (category === 'laporan-keuangan') return 'Laporan Keuangan';
    else if (category === 'lainnya') return 'Lainnya';
    else return category;
  };
  return {
    props: {
      website,
      title: `Dokumen`,
      subTitle: `Informasi dokumen (${_categoryText()})`,
      category: category ?? 'lainnya',
      data,
    },
  };
}

export default function PageProfilSekilas(props) {
  const { data, website, category } = props;
  const router = useRouter();
  const menu = [
    {
      title: 'Dokumen Perencanaan',
      link: '/dokumen/dokumen-perencanaan',
      icon: 'mdi:file-document-outline',
    },
    {
      title: 'Laporan Keuangan',
      link: '/dokumen/laporan-keuangan',
      icon: 'mdi:file-document-outline',
    },
    {
      title: 'Lainnya',
      link: '/dokumen/lainnya',
      icon: 'mdi:file-document-outline',
    },
  ];
  return (
    <div className="">
      <div className="p-3 md:p-4 lg:py-8 lg:px-10 w-full xl:grid xl:grid-cols-[268px,1fr] xl:grid-rows-[1fr,auto] lg:gap-6">
        <div className="mb-5 lg:mb-0">
          <div className="dropdown w-full xl:block xl:dropdown-open">
            <label
              tabIndex={0}
              className="btn btn-sm btn-outline btn-primary drawer-button xl:hidden"
            >
              <UIIcon icon="mdi:menu" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content w-full menu bg-base-100  p-2 rounded-box shadow-md border-primary border-1"
            >
              {menu.map((m, i) => {
                return (
                  <li key={i}>
                    <Link
                      href={m.link}
                      className={clsx({ active: m.link === router.asPath })}
                    >
                      <UIIcon
                        className="w-5 h-5"
                        icon={m.icon ?? 'base:menu-default'}
                      />
                      {m.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <OrganizationDocumentsListSwr
          organizationId={website.organization.id}
          category={category}
        />
      </div>
    </div>
  );
}
