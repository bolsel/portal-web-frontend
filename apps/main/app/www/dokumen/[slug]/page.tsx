import { UIBaseViewDocumentItemDetail } from '@portalweb/ui/server';
import PageWithContainer from '../../../../components/pages/page-with-container';
import { apiResourceDocuments } from '@portalweb/api/server';
import DocumentFrame from './_Frame';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const item = await apiResourceDocuments()
    .fetch({
      pathQuery: ['bySlug', slug],
    })
    .catch(() => null);
  if (!item) {
    return notFound();
  }
  return {
    title: item.title,
    description: item.description,
  };
}

export default async function MainDokumenSlugPage({ params: { slug } }) {
  const item = await apiResourceDocuments()
    .fetch({
      pathQuery: ['bySlug', slug],
    })
    .catch(() => null);
  if (!item) {
    return notFound();
  }
  return (
    <PageWithContainer
      jumbotron={{
        title: item.title,
        subtitle: item.category_name,
        breadcrumb: [
          {
            label: 'Beranda',
            link: '/',
          },
          {
            label: 'Dokumen',
            link: '/dokumen',
            active: true,
          },
        ],
      }}
    >
      <div className="p-3 md:p-4 lg:py-8 lg:px-10 rounded-xl bg-white w-full xl:grid xl:grid-cols-[1fr,360px] xl:grid-rows-[auto,1fr] lg:gap-6">
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
    </PageWithContainer>
  );
}
