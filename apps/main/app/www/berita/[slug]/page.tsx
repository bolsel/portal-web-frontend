import { apiResourceNews } from '@portalweb/api/server';
import NewsHeaderRead from '../../../../components/news/header-read';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { UIBaseIcon, UIContentBlocks, UIShareItem } from '@portalweb/ui';
import Terkait from './_Terkait';

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
  const item = await apiResourceNews()
    .fetch({
      pathQuery: ['bySlug', slug],
    })
    .catch(() => null);
  if (!item) {
    return notFound();
  }
  const { title, description } = item;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`/og-image/berita/${item.slug}`, item.image_cover.url],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@vercel',
    },
  };
}
export default async function BeritaSlugPage({ params: { slug } }) {
  const item = await apiResourceNews()
    .fetch({
      pathQuery: ['bySlug', slug],
    })
    .catch(() => null);
  if (!item) {
    return notFound();
  }
  const articleUrl = `https://www.bolselkab.go.id/berita/${item.slug}`;

  return (
    <main>
      <NewsHeaderRead item={item} />
      <div className="ui-container mt-12 mb-12 mx-auto">
        <section className="h-full grid grid-cols-1 gap-8 lg:grid-cols-[60%,auto] xl:gap-[72px]">
          <div className="flex flex-col gap-7">
            <article className="article-content w-full">
              {item.content && item.content.blocks && (
                <UIContentBlocks {...item.content} />
              )}
            </article>
          </div>
          <section>
            <div className="flex flex-col gap-7 lg:sticky lg:top-[88px]">
              <Terkait item={item} />
              <div className="flex flex-col gap-3 w-full">
                <p className="inline-flex gap-3 font-lato text-xs text-blue-gray-200 leading-5">
                  <UIBaseIcon
                    icon="share"
                    className="self-start text-primary w-5 h-5"
                  />
                  Bagikan Berita
                </p>
                <UIShareItem
                  url={articleUrl}
                  title={item.title}
                  quote={item.description}
                  // beforeOnClick={() => {
                  //   fetch(apiSharedCount);
                  // }}
                />
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
