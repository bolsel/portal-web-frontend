"use client"

import {UIContainer, UISwrComponentResourceProps, UISwrResource} from "@portal-web/shared-ui";
import {Swiper, SwiperSlide} from "swiper/react";
import React from "react";
import {Mousewheel} from "swiper";
import Link from "next/link";
import clsx from "clsx";
import {useRouter} from "next/router";

const Skeleton = () => {
  const items:any = [];
  for (let i = 0; i < 6; i++) {
    items.push(
      <SwiperSlide key={i}>
        <div
          className="w-[150px] bg-gray-200 animate-pulse rounded-full"
        />
      </SwiperSlide>
    );
  }
  return <>{items}</>;
};
export default function NewsCategoriesListSwiperSwr(){
  const router = useRouter();
  const categoryActive = router.query.kategori;
  return <UISwrResource
    resourceKey={'news_categories'}
    loadingComponent={Skeleton}
    noItemsComponent={()=><div>belum ada data</div>}
    wrapperComponent={({children}) => <UIContainer>{children}</UIContainer>}
    >
    {(data)=>{
      return  <Swiper
        slidesPerView="auto"
        spaceBetween={64}
        passiveListeners={true}
        mousewheel={true}
        modules={[Mousewheel]}
      >
        <>
          <SwiperSlide className="!w-[fit-content]">
            <Link href="/berita">
              <button
                className={clsx(
                  'px-6 py-2 rounded-full font-roboto uppercase cursor-pointer hover:bg-primary hover:text-white text-gray-600',
                  {
                    'bg-primary text-white font-bold':
                      categoryActive === '' || categoryActive === undefined,
                  }
                )}
              >
                Terbaru
              </button>
            </Link>
          </SwiperSlide>
          {data && data.data &&
            data.data.map((item, index) => (
              <SwiperSlide className="!w-[fit-content]" key={index}>
                <Link href={`/berita/?kategori=${item.slug}`}>
                  <button
                    className={clsx(
                      'px-6 py-2 rounded-full font-roboto uppercase cursor-pointer hover:bg-primary hover:text-white text-gray-600',
                      {
                        'bg-primary text-white font-bold':
                          categoryActive === item.slug,
                      }
                    )}
                  >
                    {item.name}
                  </button>
                </Link>
              </SwiperSlide>
            ))}
        </>
      </Swiper>
    }}

  </UISwrResource>
}
