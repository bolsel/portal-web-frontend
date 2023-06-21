import { serverSideHost } from '../../src/server';
import {
  getResourceApiUrl,
  WebNewsResource,
} from '@portal-web/shared-api/server';
import Head from 'next/head';
import React from 'react';
import { UIIcon, UINextImageBlur } from '@portal-web/shared-ui';
import LibContentBlocks from '../../../_libs/components/content-blocks/content-blocks';
import LibSwrNewsItems from '../../../_libs/components/swr/news-items';
import LibBaseTitleWidget from '../../../_libs/components/base/title-widget';
import LibBaseShareItem from '../../../_libs/components/base/share-item';

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

export default function BeritaSlugPage(props) {
  const { data, articleUrl, apiSharedCount, website } = props;
  return (
    <>
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
                      <UIIcon icon="mdi:calendar" className="w-4 h-4" />
                      <p className="text-sm">{data.publish_date_format}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <UIIcon icon="mdi:eye" className="w-4 h-4" />
                      <p className="text-sm">{data.view_count}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <UIIcon icon="mdi:share-variant" className="w-4 h-4" />
                      <p className="text-sm">{data.shared_count}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UIIcon icon="mdi:tag-outline" className="w-4 h-4" />
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
                    <UIIcon icon="mdi:pencil" className="w-4 h-4" />
                    <p className="text-sm">
                      Penulis:{' '}
                      <span className="capitalize italic">{data.writer}</span>
                    </p>
                    <div className="hidden lg:flex items-center gap-2">
                      |{' '}
                      <UIIcon
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
                  <div className="lg:hidden flex items-center gap-2">
                    <UIIcon
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
            <p className="font-lora text-gray-800"></p>
          </div>
          <section className="my-5">
            <div className="flex flex-col gap-2 lg:sticky lg:top-[88px]">
              <div className="flex flex-col gap-3 w-full mb-5">
                <p className="inline-flex gap-3 font-lato text-xs text-blue-gray-200 leading-5">
                  <UIIcon
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
              <LibBaseTitleWidget text="Berita Terbaru" />
              <LibSwrNewsItems
                websiteId={website.id}
                paramsQuery={{ limit: 5 }}
                hideNavigation
                listOptions={{
                  hideViewSwitch: true,
                  itemOptions: {
                    small: true,
                    customComponent: {
                      description() {
                        return null;
                      },
                    },
                  },
                }}
              />
            </div>
          </section>
        </section>
      </article>
    </>
  );
}
