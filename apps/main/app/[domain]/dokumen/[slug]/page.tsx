import { siteMenuDokumenItems } from '../../../../components/layout/site/menu';
import SiteLayout from '../../../../components/layout/site/layout';
import { getSiteData } from '../../../../lib/site';
import { notFound } from 'next/navigation';
import { UIBaseIcon, UIBaseViewDocumentItemDetail } from '@portalweb/ui';
import { Metadata } from 'next';
import { apiResourceOrganizationDocuments } from '@portalweb/api/server';
import DocumentFrame from '../../../../components/document-frame';
import { kategoryText } from '../lib';

export async function generateMetadata({
  params: { domain, slug },
}): Promise<Metadata> {
  const site = await getSiteData(domain);
  if (!site) notFound();

  const item = await apiResourceOrganizationDocuments().fetch({
    pathQuery: ['bySlug', slug]
  }).catch(() => null)
  if (!item) notFound()

  return {
    title: `${item.title} | ${site.organization_name}`,
    description: `Dokumen (${kategoryText(item.category)}) ${site.organization_name}`,
  };
}
export default async function SiteDokumenPage({ params: { domain, slug } }) {
  const site = await getSiteData(domain);
  if (!site) notFound();
  const item = await apiResourceOrganizationDocuments().fetch({
    pathQuery: ['bySlug', slug]
  }).catch(() => null)
  if (!item) notFound()

  return (
    <SiteLayout
      site={site}
      jumbotron={{
        title: item.title,
        subtitle: kategoryText(item.category),
      }}
    >
      <div className="p-3 md:p-4 lg:py-8 lg:px-10 rounded-xl w-full xl:grid xl:grid-cols-[1fr,360px] xl:grid-rows-[auto,1fr] lg:gap-6">
        <DocumentFrame item={item} />

        <div className="">
          <div className="flex flex-col gap-7 lg:sticky lg:top-[88px]">
            <UIBaseViewDocumentItemDetail
              item={item}
              customizes={{
                descriptionScroll: () => false,
                showDownloadLink: () => true,
              }}
            />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
