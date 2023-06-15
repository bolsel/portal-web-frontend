import clsx from "clsx";
import {UIContainer, UIGPRWidget} from "@portal-web/shared-ui";
import {useState} from "react";
import Link from "next/link";
import {NewsCarouselSwr} from "../client/news-carousel-swr";
import {NewsListViewSwr} from "../client/news-list-view-swr";

export default function NewsHomeTerkini() {
  const [p, setP] = useState('latest');

  return <UIContainer>
    <div
      className="w-full h-full p-4 md:p-8 bg-white rounded-xl shadow
          grid grid-cols-1 xl:grid-cols-[300px,1fr] gap-6"
    >
      <section className="w-full h-full grid grid-cols-1 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 mb-4">
          <h1 className="font-medium text-[28px] md:text-4xl leading-loose">
            Berita Terkini
          </h1>
          <div className="flex-1 flex justify-center flex-col text-center">
            <div className="border-b border-gray-300"/>
          </div>
          <Link href="/berita" tabIndex={-1}>
            <button className="btn btn-outline rounded-box btn-sm btn-primary">
              Lihat Semua Berita
            </button>
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 gap-8 md:grid-rows-1 lg:grid-cols-[1fr,330px]">
          <NewsCarouselSwr/>
          <div className="w-full h-[518px] grid grid-cols-1 grid-rows-[38px,1fr] gap-4">
            <div
              className="w-full h-full grid grid-cols-2 mb-4"
              role="tablist"
              aria-label="Tab berita terbaru dan terpopuler"
            >
              <button
                role="tab"
                onClick={() => setP('latest')}
                className={clsx(
                  'text-sm uppercase text-center border-b-4 pb-3 cursor-pointer',
                  p === 'latest'
                    ? 'font-bold border-primary'
                    : 'text-gray-700 border-blue-gray-50'
                )}
              >
                Terbaru
              </button>
              <button
                role="tab"
                onClick={() => setP('popular')}
                className={clsx(
                  'text-sm uppercase text-center border-b-4 pb-3 cursor-pointer',
                  p === 'popular'
                    ? 'font-bold border-primary'
                    : 'text-gray-700 border-blue-gray-50'
                )}
              >
                Terpopuler
              </button>
            </div>

            <NewsListViewSwr
              paramsQuery={{limit: 4}}
              pathQuery={[p]}
              small
              noPagination
              imageComponent={false}
              titleComponent={({item, index}) => <h2
                className="mb-2 line-clamp-2 font-medium leading-7 group-hover:text-primary">
                {item.title}
              </h2>}
            />
          </div>
        </div>
      </section>
      <section
        className="xl:order-first relative justify-self-center w-full max-w-[500px] h-[600px] md:h-[625px] lg:h-[608px]
    bg-[#262879] rounded-lg flex justify-center items-center overflow-hidden"
      >
        <UIGPRWidget/>
      </section>
    </div>
  </UIContainer>
}
