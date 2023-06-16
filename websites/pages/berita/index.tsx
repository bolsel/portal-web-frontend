import { serverSideHost } from '../../src/server';
import React from 'react';
import LibSwrDataWebNewsList from '../../../_libs/components/swr/data-web-news-list';
import LibSwrDataNewsList from '../../../_libs/components/swr/data-news-list';
import Link from 'next/link';

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
  return {
    props: {
      website,
      title: 'Berita',
      subTitle: `Berita ${website.organization.name}`,
      // data,
      // articleUrl,
      // apiSharedCount
    },
  };
}

export default function PageProfilSekilas(props) {
  const { website } = props;
  return (
    <main>
      <div className="px-5">
        {/*<NewsReadHeader news={data} articleUrl={articleUrl} apiSharedCount={apiSharedCount}/>*/}
        <section className="h-full grid grid-cols-1 gap-8 lg:grid-cols-[60%,auto] xl:gap-[72px]">
          <div className="flex flex-col gap-7 p-5">
            <LibSwrDataWebNewsList
              viewType={'grid'}
              paramsQuery={{ limit: 10 }}
              pathQuery={['byWebId', website.id]}
            />
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
              {/*<div className="flex flex-col gap-3 w-full">*/}
              {/*  <p className="inline-flex gap-3 font-lato text-xs text-blue-gray-200 leading-5">*/}
              {/*    <Icon*/}
              {/*      icon="mdi:share-variant-outline"*/}
              {/*      className="self-start text-primary w-5 h-5"*/}
              {/*    />*/}
              {/*    Bagikan Berita*/}
              {/*  </p>*/}
              {/*  <LibDataNewsReadShare*/}
              {/*    apiSharedCount={apiSharedCount}*/}
              {/*    id={data.id}*/}
              {/*    url={articleUrl}*/}
              {/*    title={data.title}*/}
              {/*    quote={data.description}*/}
              {/*  />*/}
              {/*</div>*/}
              <div className="flex w-full h-[38px]">
                <div className="border-b-[3px] border-primary">
                  <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                    Berita Di Portal Bolsel
                  </h1>
                </div>
                <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
              </div>
              <LibSwrDataNewsList
                viewType={'list'}
                hideViewSwitch
                noPagination
                itemComponent={{ small: true, isPortalBerita: true }}
                paramsQuery={{ limit: 5 }}
              />

              <div className="flex items-center justify-center">
                <Link
                  href="https://bolselkab.go.id/berita"
                  target="_blank"
                  className="btn btn-primary btn-sm normal-case"
                >
                  Berita Portal Bolsel
                </Link>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
