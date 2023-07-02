import { Icon } from '@iconify/react';
import React from 'react';
import {
  UIContainer,
  UIContentBlocks,
  UISeoNewsHead,
  UIShareItem,
  UISwrResourceNewsListItems,
  useUIConfigContextValue,
} from '@portal-web/shared-ui';
import NewsReadHeader from '../../components/news/read/header';
import { getResourceApiUrl, NewsResource } from '@portal-web/shared-api/server';

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
  const config = useUIConfigContextValue();
  return (
    <main>
      <UISeoNewsHead
        data={data}
        articleUrl={articleUrl}
        publicUrl={config.publicUrl ?? 'https://www.bolselkab.go.id'}
      />
      <article className="article">
        <NewsReadHeader
          news={data}
          articleUrl={articleUrl}
          apiSharedCount={apiSharedCount}
        />
        <UIContainer className="mt-12 mb-12 mx-auto">
          <section className="h-full grid grid-cols-1 gap-8 lg:grid-cols-[60%,auto] xl:gap-[72px]">
            <div className="flex flex-col gap-7">
              <div className="article__body w-full">
                {data.content && data.content.blocks && (
                  <UIContentBlocks {...data.content} />
                )}
              </div>
            </div>
            <section>
              <div className="flex flex-col gap-7 lg:sticky lg:top-[88px]">
                <div className="flex w-full h-[38px] mb-6">
                  <div className="border-b-[3px] border-primary">
                    <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                      Berita Terkait
                    </h1>
                  </div>
                  <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
                </div>
                <UISwrResourceNewsListItems
                  hideNavigation
                  itemOptions={{
                    small: true,
                    customComponent: {
                      description() {
                        return null;
                      },
                    },
                  }}
                  listOptions={{
                    hideViewSwitch: true,
                  }}
                  pathQuery={['byCategorySlug', data.category.slug]}
                  paramsQuery={{
                    filter: {
                      slug: {
                        _neq: slug,
                      },
                    },
                    limit: 5,
                  }}
                />
                <div className="flex flex-col gap-3 w-full">
                  <p className="inline-flex gap-3 font-lato text-xs text-blue-gray-200 leading-5">
                    <Icon
                      icon="mdi:share-variant-outline"
                      className="self-start text-primary w-5 h-5"
                    />
                    Bagikan Berita
                  </p>
                  <UIShareItem
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
