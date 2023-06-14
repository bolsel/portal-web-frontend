import { serverSideHost } from '../../src/server';
import {
  getResourceApiUrl,
  WebNewsResource,
} from '@portal-web/shared-api/server';
import Head from 'next/head';
import React from 'react';
import {UINextImageBlur} from '@portal-web/shared-ui';
import LibContentBlocks from '../../../_libs/components/content-blocks/content-blocks';
import { Icon } from '@iconify/react';
import LibDataNewsReadShare from '../../../_libs/components/data/news/read/share';
import LibSwrDataWebNewsList from '../../../_libs/components/swr/data-web-news-list';

export async function getServerSideProps(context) {
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
  const { slug } = context.params;
  let data;
  try {
    data = await new WebNewsResource().apiResourceFetch({
      pathQuery: ['byWebAndSlug', website.id, slug],
    });
  } catch (e) {
    return {
      notFound: true,
    };
  }

  const articleUrl = `https://${website.domain}/berita/${data.slug}`;
  const apiSharedCount = getResourceApiUrl(`web_news/shared/${data.id}`);
  // // update view_count
  await new WebNewsResource().itemsHandler().updateOne(data.id, {
    view_count: data.view_count + 1,
  });

  return {
    props: {
      website,
      title: data.title,
      subTitle: `Berita ${website.organization.name}`,
      data,
      articleUrl,
      apiSharedCount,
    },
  };
}

export default function PageProfilSekilas(props) {
  const { data, articleUrl, apiSharedCount } = props;
  return (
    <main>
      <Head>
        <title>{data.title}</title>
        <meta name="title" content={data.title} />
        <meta name="description" content={data.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.image_cover.url} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={articleUrl} />
        <meta property="twitter:title" content={data.title} />
        <meta property="twitter:description" content={data.description} />
        <meta property="twitter:image" content={data.image_cover.url} />
      </Head>
      <article className="px-5">
        {/*<NewsReadHeader news={data} articleUrl={articleUrl} apiSharedCount={apiSharedCount}/>*/}
        <section className="h-full grid grid-cols-1 gap-8 lg:grid-cols-[60%,auto] xl:gap-[72px]">
          <div className="flex flex-col gap-7">
            <div className="w-full min-h-screen">
              <div className="flex flex-col gap-2 mt-3">
                <UINextImageBlur
                  src={data.image_cover.url}
                  alt={data.title}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-full rounded-lg"
                />
                <div className="flex flex-col gap-1 text-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:calendar" className="w-4 h-4" />
                      <p className="text-sm">{data.publish_date_format}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:eye" className="w-4 h-4" />
                      <p className="text-sm">{data.view_count}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:share-variant" className="w-4 h-4" />
                      <p className="text-sm">{data.shared_count}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:tag-outline" className="w-4 h-4" />
                    <div className="flex gap-2">
                      {(data.tags ?? []).map((tag, i) => {
                        return (
                          <span
                            key={i}
                            className="text-xs inline-block px-2 py-1 rounded-lg bg-base-200"
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:pencil" className="w-4 h-4" />
                    <p className="text-sm">
                      Penulis:{' '}
                      <span className="capitalize italic">{data.writer}</span>
                    </p>
                    <div className="hidden lg:flex items-center gap-2">
                      |{' '}
                      <Icon
                        icon="material-symbols:video-camera-front-outline"
                        className="w-4 h-4"
                      />
                      <p className="text-sm">
                        Peliput:{' '}
                        <span className="capitalize italic">
                          {data.reporter}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="block lg:hidden flex items-center gap-2">
                    <Icon
                      icon="material-symbols:video-camera-front-outline"
                      className="w-4 h-4"
                    />
                    <p className="text-sm">
                      Peliput:{' '}
                      <span className="capitalize italic">{data.reporter}</span>
                    </p>
                  </div>
                </div>
              </div>
              {data.content && data.content.blocks && (
                <div className="prose max-w-none">
                  <LibContentBlocks data={data.content} />
                </div>
              )}
            </div>
            <p className="font-lora text-gray-800">
              {/*<strong>Editor: </strong> {{ editor }}*/}
            </p>
            {/*<NewsDetailTags v-if="hasTags" :tags="tags" />*/}
          </div>
          <section className="my-5">
            <div className="flex flex-col gap-7 lg:sticky lg:top-[88px]">
              {/*<NewsListViewSwr*/}
              {/*  noPagination*/}
              {/*  small*/}
              {/*  pathQuery={['byCategorySlug', data.category.slug]}*/}
              {/*  paramsQuery={{*/}
              {/*    filter: {*/}
              {/*      slug: {*/}
              {/*        _neq: slug*/}
              {/*      }*/}
              {/*    },*/}
              {/*    limit: 5*/}
              {/*  }}*/}
              {/*  header={<NewsListViewHeader label="Berita Terkait"/>}*/}
              {/*/>*/}
              <div className="flex flex-col gap-3 w-full">
                <p className="inline-flex gap-3 font-lato text-xs text-blue-gray-200 leading-5">
                  <Icon
                    icon="mdi:share-variant-outline"
                    className="self-start text-primary w-5 h-5"
                  />
                  Bagikan Berita
                </p>
                <LibDataNewsReadShare
                  apiSharedCount={apiSharedCount}
                  id={data.id}
                  url={articleUrl}
                  title={data.title}
                  quote={data.description}
                />
              </div>
              <div className="flex w-full h-[38px]">
                <div className="border-b-[3px] border-primary">
                  <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                    Berita Terbaru
                  </h1>
                </div>
                <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
              </div>
              <LibSwrDataWebNewsList
                viewType={'list'}
                hideViewSwitch
                noPagination
                itemComponent={{ small: true }}
                paramsQuery={{ limit: 5 }}
              />
            </div>
          </section>
        </section>
      </article>
    </main>
  );
}
