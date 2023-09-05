import NewsCategoryHeadline from '#/main/components/news/category-headline';
import NewsCategorySwiper from '#/main/components/news/category-swiper';
import NewsPouplarSide from '#/main/components/news/popular-side';
import { apiResourceItem } from '@portalweb/api/server';
import NewsList from '#/main/components/news/lists';

export default async function MainBeritaKategoriSlug({ params: { slug } }) {
  const data = await apiResourceItem('news').paths.read.items({
    limit: 4,
    filter:
      slug !== 'terbaru' ? { category: { slug: { _eq: slug } } } : undefined,
  });
  const dataSwiper = await apiResourceItem('news_categories').paths.read.items({
    limit: -1,
  });

  return (
    <main className="">
      <section className="relative">
        <NewsCategoryHeadline data={data} />
      </section>
      <section className="py-4 border-b border-primary-200 overflow-hidden mb-6">
        <NewsCategorySwiper data={dataSwiper} current={slug} />
      </section>

      <div className="ui-container mb-5 mx-auto grid grid-cols-1 gap-2 lg:gap-8 lg:grid-cols-[60%,auto]">
        <section className="mb-5 w-full flex flex-col bg-white rounded-md p-3 shadow">
          <NewsList category={slug === 'terbaru' ? undefined : slug} />
        </section>
        <div className="">
          <div className="sticky top-[88px] bg-white p-3 shadow rounded-md">
            {/* <PopulerSide /> */}
            <NewsPouplarSide category={slug === 'terbaru' ? undefined : slug} />
          </div>
        </div>
      </div>
    </main>
  );
}
