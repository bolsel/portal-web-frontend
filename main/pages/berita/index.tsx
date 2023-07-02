import Head from 'next/head';
import {
  UIContainer,
  UIDevice,
  UISwrResourceNewsCarouselHeadline,
  UISwrResourceNewsListItems,
} from '@portal-web/shared-ui';
import { useRouter } from 'next/router';
import NewsCategoriesListSwiperSwr from '../../components/client/news-categories-list-swiper-swr';

export default function BeritaPageIndex() {
  const router = useRouter();
  const category = router.query.kategori as string;
  return (
    <main>
      <Head>
        <title>{'Berita'}</title>
      </Head>
      <section className="relative">
        <UISwrResourceNewsCarouselHeadline
          pathQuery={category ? ['byCategorySlug', category] : ['latest']}
          paramsQuery={{ limit: 4 }}
        />
      </section>
      <section className="py-4 border-b border-primary-200 overflow-hidden mb-6">
        <NewsCategoriesListSwiperSwr />
      </section>
      <UIContainer className="bg-white rounded-md mb-5 shadow-lg p-3 mx-auto grid grid-cols-1 gap-8 lg:gap-20 lg:grid-cols-news-container pb-8">
        <section className="w-full flex flex-col">
          <UIDevice>
            {({ isMobile }) => {
              if (isMobile)
                return (
                  <UISwrResourceNewsListItems
                    pathQuery={
                      category ? ['byCategorySlug', category] : ['latest']
                    }
                    paramsQuery={{ limit: 6 }}
                    listOptions={{
                      hideViewSwitch: true,
                      view: 'grid',
                    }}
                  />
                );
              return (
                <UISwrResourceNewsListItems
                  pathQuery={
                    category ? ['byCategorySlug', category] : ['latest']
                  }
                  paramsQuery={{ limit: 6 }}
                  listOptions={{
                    view: 'list',
                  }}
                />
              );
            }}
          </UIDevice>
        </section>
        <div className="sticky top-[200px]">
          <div className="w-full flex flex-col gap-2 lg:gap-4 ">
            <div className="flex w-full h-[38px] mb-6">
              <div className="border-b-[3px] border-primary">
                <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                  {`Berita Populer ${category ? `di ${category}` : ''}`}
                </h1>
              </div>
              <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
            </div>
            <UISwrResourceNewsListItems
              hideNavigation
              pathQuery={
                category ? ['byCategorySlugPopular', category] : ['popular']
              }
              paramsQuery={{ limit: 5 }}
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
                view: 'list',
              }}
            />
          </div>
        </div>
      </UIContainer>
    </main>
  );
}
