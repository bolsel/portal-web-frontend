import { siteMenuDokumenItems } from '../../../components/layout/site/menu';
import SiteLayout from '../../../components/layout/site/layout';
import { getSiteData } from '../../../lib/site';
import { notFound } from 'next/navigation';
import { UIBaseIcon } from '@portalweb/ui';
import Menu from './_Menu';
import Lists from './_Lists';
import Title from './_Title';
import { Metadata } from 'next';
import Description from './_Description';

export async function generateMetadata({
  params: { domain },
}): Promise<Metadata> {
  const site = await getSiteData(domain);
  if (!site) notFound();

  return {
    title: `Dokumen | ${site.organization.name}`,
    description: `Lihat dokuman publik pada ${site.organization.name}`,
  };
}
export default async function SiteDokumenPage({ params: { domain } }) {
  const site = await getSiteData(domain);
  if (!site) notFound();

  const menuList = siteMenuDokumenItems(site);

  return (
    <SiteLayout
      site={site}
      jumbotron={{
        title: <Title site={site} />,
        subtitle: <Description site={site} />,
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
            <Menu menuList={menuList} />
          </div>
        </div>
        <div className="w-full max-w-none">
          <Lists organizationId={site.organization.id} />
        </div>
      </div>
    </SiteLayout>
  );
}
