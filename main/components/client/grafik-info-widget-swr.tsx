"use client"

import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import Image from 'next/image';
import {
  Autoplay,
  EffectCoverflow,
  Mousewheel,
  Navigation,
  Pagination,
} from 'swiper';
import {Icon} from '@iconify/react';
import Link from 'next/link';
import {useRef} from 'react';
import clsx from 'clsx';
import {UIContainer, UISwrResource} from "@portal-web/shared-ui";

export default function GrafikInfoWidgetSwr() {
  const swiperRef = useRef<SwiperRef>(null);
  const loadingComponent = () => <UIContainer>
    <div className='mb-5 bg-base-200 animate-pulse w-full h-[304px] rounded-lg'></div>
  </UIContainer>
  const noItemsComponent = () => <UIContainer>
    <div className='mb-5 bg-base-200 w-full h-[104px] rounded-lg flex justify-center items-center'>
      Belum ada data grafik
    </div>
  </UIContainer>
  return <UISwrResource
    resourceKey={'grafik_info'}
    loadingComponent={loadingComponent}
    noItemsComponent={noItemsComponent}
  >
    {({data})=>{
      return (
        <div
          className="container bg-gray-200 mx-auto 2xl:px-0 xl:max-w-7xl px-0 max-w-full xl:max-w-7xl xl:px-6 rounded-lg"
          onMouseOver={() => {
            if (swiperRef.current) swiperRef.current.swiper.autoplay.pause();
          }}
          onMouseOut={() => {
            if (swiperRef.current) swiperRef.current.swiper.autoplay.resume();
          }}
        >
          <Swiper
            ref={swiperRef}
            modules={[
              EffectCoverflow,
              Pagination,
              Navigation,
              Autoplay,
              Mousewheel,
            ]}
            className="banner__swiper !py-[50px]"
            slidesPerView={'auto'}
            effect={'coverflow'}
            // grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            speed={750}
            // loop
            autoplay={{delay: 3000, disableOnInteraction: false}}
            pagination={{
              el: '.banner__swiper-pagination',
              type: 'bullets',
              clickable: true,
            }}
            navigation={{
              nextEl: '.banner__button-next',
              prevEl: '.banner__button-prev',
            }}
            // breakpoints={{
            //   1280: {
            //     slidesPerView: 1.2
            //   }
            // }}
            // passiveListeners={true}
            // mousewheel={true}
          >
            {(data ?? []).map((d, i) => {
              const _Image = () => (
                <Image
                  src={d.image.url}
                  alt={d.title}
                  title={d.title}
                  quality={100}
                  width={400}
                  height={600}
                  className="w-full h-full block bg-gray-200"
                />
              );
              return (
                <SwiperSlide
                  key={i}
                  className={clsx(
                    `!bg-cover !bg-center`,
                    '!w-[300px] !h-[500px] xl:!w-[400px] xl:!h-[600px]'
                  )}
                >
                  {d.link ? (
                    <Link href={d.link} target="_blank">
                      {_Image()}
                    </Link>
                  ) : (
                    _Image()
                  )}
                </SwiperSlide>
              );
            })}
            <div className="banner__swiper-pagination mt-8"/>
            <button className="hidden md:flex banner__navigation banner__button-prev">
              <Icon className={'w-8 h-8'} icon="mdi:chevron-left"/>
            </button>
            <button className="hidden md:flex banner__navigation banner__button-next">
              <Icon className={'w-8 h-8'} icon="mdi:chevron-right"/>
            </button>
          </Swiper>
        </div>
      )
    }}
  </UISwrResource>

}
