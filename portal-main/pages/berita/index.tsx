import Head from "next/head";
import {
  UIContainer,
} from "@portal-web/shared-ui";
import {useRouter} from "next/router";
import {NewsListViewSwr} from "../../components/client/news-list-view-swr";
import NewsCategoriesListSwiperSwr from "../../components/client/news-categories-list-swiper-swr";
import NewsCarouselHeaderSwr from "../../components/client/news-carousel-header-swr";
import NewsListViewHeader from "../../components/news/list-view-header";

export default function BeritaPageIndex() {
  const router = useRouter();
  const category = router.query.kategori as string;
  return <main>
    <Head>
      <title>{('Berita')}</title>
    </Head>
    <section className="relative">
      <NewsCarouselHeaderSwr
        pathQuery={category ? ['byCategorySlug', category] : ['latest']}
        paramsQuery={{limit: 4}}/>
      {/*<UIDataNewsByCategoriesCarouselSwr/>*/}
    </section>
    <section className="py-4 border-b border-primary-200 overflow-hidden mb-6">
      <NewsCategoriesListSwiperSwr/>
    </section>
    <UIContainer className="mx-auto grid grid-cols-1 gap-8 lg:gap-20 lg:grid-cols-news-container pb-8">
      <section className="w-full flex flex-col p-5">
        <NewsListViewSwr
          pathQuery={category ? ['byCategorySlug', category] : ['latest']}
          paramsQuery={{limit:5}}

          // items={data && data.data}
          // isLoading={isLoading}
          // footer={
          //   data &&
          //   data.meta && (
          //     <div className="mt-5">
          //       <Pagination
          //         perPageChange={setPerPage}
          //         currentPage={page}
          //         perPage={perPage}
          //         setPage={setPage}
          //         total={data.meta.total}
          //       />
          //     </div>
          //   )
          // }
        />
      </section>
      <div className='sticky top-[200px]'>
        <div className="w-full flex flex-col gap-8 lg:gap-14 ">

          <NewsListViewSwr
            small
            paramsQuery={{limit: 5}}
            noPagination
            pathQuery={category ? ['byCategorySlug', category] : ['latest']}
            header={<NewsListViewHeader label={'Berita Populer'} category={category}/>}
            // aheader={<div className="flex w-full h-[38px]">
            //   <div className="border-b-[3px] border-primary">
            //     <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
            //       Berita Populer{' '}
            //       {category && <span className="text-gray-500">di {category}</span>}
            //     </h1>
            //   </div>
            //   <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
            // </div>}
          />
        </div>
      </div>
    </UIContainer>
  </main>
}
