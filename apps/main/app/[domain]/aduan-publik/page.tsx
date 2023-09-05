import SiteLayout from '#/main/components/layout/site/layout';
import { getSiteData } from '#/main/lib/site';
import { UIBaseIcon } from '@portalweb/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Content from './_Content';
import Menu from './_Menu';

export default async function SiteAduanPublikPage({ params: { domain } }) {
  const site = await getSiteData(domain);
  if (site === null) notFound();
  return (
    <SiteLayout
      site={site}
      jumbotron={{
        title: 'Aduan Publik',
        subtitle: `Kirimkan aduan anda ke ${site.organization.name}`,
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
            <Menu />
          </div>
        </div>
        <div className="w-full max-w-none">
          <Content site={site} />
        </div>
      </div>
    </SiteLayout>
  );
}
