import { UIBaseIcon, UIContentBlocks } from '@portalweb/ui';
import SiteLayout from '../../../../components/layout/site/layout';
import { getSiteData } from '../../../../lib/site';
import { siteMenuProfilItems } from '../../../../components/layout/site/menu';
import Link from 'next/link';
import clsx from 'clsx';
import { notFound } from 'next/navigation';
import { apiResourceOrganizations } from '@portalweb/api/server';
import Pejabat from './_Pejabat';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { domain, slug },
}): Promise<Metadata> {
  const site = await getSiteData(domain);
  if (!site) notFound();
  const orgInfo = await apiResourceOrganizations()
    .fetch({
      pathQuery: ['info', site.organization_slug!],
    })
    .catch(() => null);
  if (!orgInfo) notFound();
  const menuList = siteMenuProfilItems(site);
  const menu = menuList?.find((m) => m.link === `/profil/${slug}`);
  if (!menu) notFound();

  return {
    title: `${menu.title} | ${orgInfo.name}`,
    description: menu.description,
  };
}
export default async function SiteProfilPage({ params: { slug, domain } }) {
  const site = await getSiteData(domain);
  if (site === null) notFound();
  const menuList = siteMenuProfilItems(site);
  const orgInfo = await apiResourceOrganizations()
    .fetch({
      pathQuery: ['info', site.organization_slug!],
    })
    .catch(() => null);
  if (!orgInfo) notFound();
  const menu = menuList?.find((m) => m.link === `/profil/${slug}`);
  if (!menu) notFound();

  const RenderContent = () => {
    if (slug === 'visi-misi') {
      return (
        <div className="prose max-w-none">
          <h2>Visi</h2>
          <UIContentBlocks {...orgInfo.visi} />
          <h2>Misi</h2>
          <UIContentBlocks {...orgInfo.misi} />
        </div>
      );
    } else if (slug === 'sekilas') {
      return (
        <UIContentBlocks {...orgInfo['sekilas']} className="prose max-w-none" />
      );
    } else if (slug === 'struktur-organisasi') {
      return (
        <UIContentBlocks
          {...orgInfo['structure']}
          className="prose max-w-none"
        />
      );
    } else if (slug === 'pejabat') {
      return <Pejabat />;
    }
    return <div>Belum ada data.</div>;
  };
  return (
    <SiteLayout
      site={site}
      jumbotron={{
        title: menu.title,
        subtitle: menu.description,
      }}
    >
      <div className="p-3 md:p-4 lg:py-8 lg:px-10 w-full xl:grid xl:grid-cols-[268px,1fr] xl:grid-rows-[1fr,auto] lg:gap-6">
        <div className="mb-5 lg:mb-0">
          <div className="dropdown w-full xl:block xl:dropdown-open z-10">
            <label
              tabIndex={0}
              className="btn btn-sm btn-outline btn-primary drawer-button xl:hidden"
            >
              <UIBaseIcon icon="menu" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content w-full menu bg-base-100  p-2 rounded-box shadow-md border-primary border-1 gap-1"
            >
              {menuList?.map((m, i) => {
                return (
                  <li key={i}>
                    <Link
                      href={m.link}
                      className={clsx({ active: m.link === `/profil/${slug}` })}
                    >
                      <UIBaseIcon
                        className="w-5 h-5"
                        icon={m.icon}
                        fallback="menu-default"
                      />
                      {m.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="w-full max-w-none">
          <RenderContent />
        </div>
      </div>
    </SiteLayout>
  );
}
