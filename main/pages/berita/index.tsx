import Head from 'next/head';
import { UIContainer, UIDevice } from '@portal-web/shared-ui';
import { useRouter } from 'next/router';
import NewsCategoriesListSwiperSwr from '../../components/client/news-categories-list-swiper-swr';
import NewsCarouselHeaderSwr from '../../components/client/news-carousel-header-swr';
import LibSwrNewsItems from '../../../_libs/components/swr/news-items';
import LibBaseTitleWidget from '../../../_libs/components/base/title-widget';

export default function BeritaPageIndex() {
  const router = useRouter();
  const category = router.query.kategori as string;
  return (
    <main>
      <Head>
        <title>{'Berita'}</title>
      </Head>
      <section className="relative">
        <NewsCarouselHeaderSwr
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
                  <LibSwrNewsItems
                    pathQuery={
                      category ? ['byCategorySlug', category] : ['latest']
                    }
                    paramsQuery={{ limit: 5 }}
                    listOptions={{
                      hideViewSwitch: true,
                      viewType: 'grid',
                    }}
                  />
                );
              return (
                <LibSwrNewsItems
                  pathQuery={
                    category ? ['byCategorySlug', category] : ['latest']
                  }
                  paramsQuery={{ limit: 5 }}
                  listOptions={{
                    viewType: 'list',
                  }}
                />
              );
            }}
          </UIDevice>
        </section>
        <div className="sticky top-[200px]">
          <div className="w-full flex flex-col gap-2 lg:gap-4 ">
            <LibBaseTitleWidget
              text={`Berita Populer ${category ? `di ${category}` : ''}`}
            />
            <LibSwrNewsItems
              hideNavigation
              pathQuery={
                category ? ['byCategorySlugPopular', category] : ['popular']
              }
              paramsQuery={{ limit: 5 }}
              listOptions={{
                hideViewSwitch: true,
                viewType: 'list',
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
        </div>
      </UIContainer>
    </main>
  );
}
