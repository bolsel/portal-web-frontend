import { siteMenuDokumenItems } from '../../../components/layout/site/menu';
import SiteLayout from '../../../components/layout/site/layout';
import { getSiteData } from '../../../lib/site';
import { notFound } from 'next/navigation';
import { UIBaseIcon } from '@portalweb/ui';
import { Metadata } from 'next';
import BeritaLists from '../_BeritaLists';
import MainBeritaLists from '../_MainBeritaLists';

export async function generateMetadata({
  params: { domain },
}): Promise<Metadata> {
  const site = await getSiteData(domain);
  if (!site) notFound();

  return {
    title: `Berita | ${site.organization_name}`,
    description: `Berita ${site.organization_name}`,
  };
}
export default async function SiteBeritaPage({ params: { domain } }) {
  const site = await getSiteData(domain);
  if (!site) notFound();

  const menuList = siteMenuDokumenItems(site);

  return (
    <SiteLayout
      site={site}
      jumbotron={{
        title: `Berita`,
        subtitle: `Berita ${site.organization_name}`,
      }}
    >
      <div className="p-10 grid grid-cols-1 gap-2 lg:gap-8 lg:grid-cols-[60%,auto]">
        <section className="mb-5 w-full flex flex-col  p-3 min-h-[1200px] ">
          <BeritaLists webId={site.id} />
        </section>
        <div className="">
          <div className="flex flex-col gap-7 lg:sticky lg:top-[88px] ">
            <MainBeritaLists side />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
