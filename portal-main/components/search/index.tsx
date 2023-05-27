import Link from 'next/link';
import SearchList from './list';
import { data } from 'autoprefixer';
import {UIContainer, UIDevice, UISearchInput} from "@portal-web/shared-ui";
import {useResourceSWR} from "@portal-web/shared-api";

function TidakAdaData({ q }) {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center gap-8 py-8">
      <h1 className="text-center font-lora text-[21px] leading-[34px] text-blue-gray-700 font-bold">
        Mohon maaf, untuk sementara belum ada hasil pencarian dengan kata kunci{' '}
        <br />
        <span className="text-primary-800">{q}</span>
      </h1>
    </section>
  );
}

export default function Search({
  currentSearchQuery,
}: {
  currentSearchQuery: string;
}) {
  const { data: dataNews, isLoading: isLoadingNews } = useResourceSWR('news', {
    pathQuery:['latest'],
    paramsQuery:{
      search:currentSearchQuery,
      limit: 8
    }
  })
  const { data: dataNewsPopular, isLoading: isLoadingNewsPopular } = useResourceSWR('news', {
    pathQuery:['popular'],
    paramsQuery:{
      search:currentSearchQuery,
      limit: 5
    }
  })
  const hasDataNews = !isLoadingNews && dataNews && dataNews.data.length;
  return (
    <UIContainer className="relative -top-24 z-20">
      <div className="p-3 md:p-4 lg:py-8 lg:px-10 rounded-xl bg-white min-h-[600px] shadow min-w-0 flex flex-col gap-6 lg:gap-8">
        <UISearchInput onSubmit={(value)=>{console.log(value)}} currentValue={currentSearchQuery} />
        <section>
          {hasDataNews ? (
            <h2 className="font-lora text-center md:text-left text-2xl font-bold text-blue-gray-700">
              Menampilkan hasil pencarian{' '}
              <strong className="text-primary-700">{currentSearchQuery}</strong>
            </h2>
          ) : null}
        </section>
        <section>
          {hasDataNews ? (
            <div className="min-w-0 flex flex-col md:flex-row gap-6 justify-between items-center mb-6">
              <h3 className="font-roboto text-center md:text-left font-medium text-[22px] leading-[26px] text-blue-gray-700">
                Berita Bolsel <br className="md:hidden" /> terkait{' '}
                <strong className="text-primary-700">
                  {currentSearchQuery}
                </strong>
              </h3>
              <Link
                href={`/pencarian/berita?q=${currentSearchQuery}`}
                tabIndex={-1}
              >
                <button
                  type="button"
                  className="btn btn-outline btn-primary btn-sm"
                >
                  Lihat Semua Berita
                  {/*  <Icon name="open-new-tab" size="14px" />*/}
                </button>
              </Link>
            </div>
          ) : null}
          <SearchList
            items={dataNews ? dataNews.data.slice(0, 3) : []}
            isLoading={isLoadingNews}
            maxLength={3}
            view="grid"
          />
          {!hasDataNews ? <TidakAdaData q={currentSearchQuery} /> : null}
        </section>
        <div className="min-w-0 grid grid-cols-1 gap-6 lg:grid-cols-[50%,50%] justify-between lg:mb-8">
          <section>
            {hasDataNews ? (
              <div className="mb-6">
                <h3 className="font-roboto font-medium text-[22px] leading-[26px] pb-3 border-b border-gray-300">
                  Hasil Pencarian Lainnya
                </h3>
              </div>
            ) : null}
            <UIDevice>
              {({ isDesktop, isTablet }) => {
                return (
                  <SearchList
                    items={
                      dataNews
                        ? dataNews.data.slice(3, dataNews.data.length)
                        : []
                    }
                    isLoading={isLoadingNews}
                    maxLength={5}
                    view={isDesktop || isTablet ? 'list' : 'grid'}
                  />
                );
              }}
            </UIDevice>
          </section>
          <section>
            {hasDataNews ? (
              <div className="mb-6">
                <h3 className="font-roboto font-medium text-[22px] leading-[26px] pb-3 border-b border-gray-300">
                  Berita Populer Terkait
                </h3>
              </div>
            ) : null}
            <UIDevice>
              {({ isDesktop, isTablet }) => {
                return (
                  <SearchList
                    items={dataNewsPopular ? dataNewsPopular.data : []}
                    isLoading={isLoadingNewsPopular}
                    maxLength={5}
                    view={isDesktop || isTablet ? 'list' : 'grid'}
                  />
                );
              }}
            </UIDevice>
          </section>
        </div>
      </div>
    </UIContainer>
  );
}
