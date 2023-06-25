import Head from 'next/head';
import { Icon } from '@iconify/react';
import React from 'react';
import { UIContainer } from '@portal-web/shared-ui';
import { NewsListViewSwr } from '../../components/client/news-list-view-swr';
import NewsReadHeader from '../../components/news/read/header';
import { getResourceApiUrl, NewsResource } from '@portal-web/shared-api/server';
import NewsListViewHeader from '../../components/news/list-view-header';
import LibContentBlocks from '../../../_libs/components/content-blocks/content-blocks';
import LibBaseShareItem from '../../../_libs/components/base/share-item';
import LibSeoNewsHeader from '../../../_libs/components/seo/news-header';

export async function getServerSideProps({ params, req }) {
  const { slug } = params;
  let data;
  try {
    data = await new NewsResource().apiResourceFetch({
      pathQuery: ['bySlug', slug],
    });
  } catch (e) {
    return {
      notFound: true,
    };
  }
  if (!data) {
    return {
      notFound: true,
    };
  }
  const articleUrl = `${process.env.NEXT_PUBLIC_URL}/berita/${data.slug}`;
  const apiSharedCount = getResourceApiUrl(`news/shared/${data.id}`);
  // update view_count
  await new NewsResource().itemsHandler().updateOne(data.id, {
    view_count: data.view_count + 1,
  });

  return {
    props: { slug: slug, data, articleUrl, apiSharedCount },
  };
}
export default function ReadBeritaPage({
  data,
  apiSharedCount,
  slug,
  articleUrl,
}) {
  return (
    <main>
      <Head>
        <LibSeoNewsHeader
          data={data}
          articleUrl={articleUrl}
          domain="bolselkab.go.id"
        />
      </Head>
      <article className="article">
        <NewsReadHeader
          news={data}
          articleUrl={articleUrl}
          apiSharedCount={apiSharedCount}
        />
        <UIContainer className="mt-12 mb-12 mx-auto">
          <section className="h-full grid grid-cols-1 gap-8 lg:grid-cols-[60%,auto] xl:gap-[72px]">
            <div className="flex flex-col gap-7">
              <div className="article__body w-full min-h-screen">
                {data.content && data.content.blocks && (
                  <LibContentBlocks {...data.content} />
                )}
              </div>
            </div>
            <section>
              <div className="flex flex-col gap-7 lg:sticky lg:top-[88px]">
                <NewsListViewSwr
                  noPagination
                  small
                  pathQuery={['byCategorySlug', data.category.slug]}
                  paramsQuery={{
                    filter: {
                      slug: {
                        _neq: slug,
                      },
                    },
                    limit: 5,
                  }}
                  header={<NewsListViewHeader label="Berita Terkait" />}
                />
                <div className="flex flex-col gap-3 w-full">
                  <p className="inline-flex gap-3 font-lato text-xs text-blue-gray-200 leading-5">
                    <Icon
                      icon="mdi:share-variant-outline"
                      className="self-start text-primary w-5 h-5"
                    />
                    Bagikan Berita
                  </p>
                  <LibBaseShareItem
                    url={articleUrl}
                    title={data.title}
                    quote={data.description}
                    beforeOnClick={() => {
                      fetch(apiSharedCount);
                    }}
                  />
                </div>
              </div>
            </section>
          </section>
        </UIContainer>
      </article>
    </main>
  );
}
