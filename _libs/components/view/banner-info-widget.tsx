'use client';

import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Autoplay, Mousewheel, Navigation, Pagination } from 'swiper';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { forwardRef } from 'react';

export type LibViewBannerInfoWidgetProps = {
  items: Record<string, any>[];
} & SwiperProps;

const LibViewBannerInfoWidget = forwardRef<
  SwiperRef,
  LibViewBannerInfoWidgetProps
>(({ items, ...props }: LibViewBannerInfoWidgetProps, ref) => {
  return (
    <Swiper
      ref={ref}
      modules={[Pagination, Navigation, Autoplay, Mousewheel]}
      className="banner__swiper"
      slidesPerView={1}
      spaceBetween={32}
      speed={750}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{
        el: '.banner__swiper-pagination',
        type: 'bullets',
        clickable: true,
      }}
      navigation={{
        nextEl: '.banner__button-next',
        prevEl: '.banner__button-prev',
      }}
      breakpoints={{
        1280: {
          slidesPerView: 1.2,
        },
      }}
      passiveListeners={true}
      mousewheel={true}
      {...props}
    >
      {(items ?? []).map((d, i) => {
        const _Image = () => (
          <Image
            src={d.image.url}
            alt={d.title}
            title={d.title}
            quality={100}
            width={1000}
            height={340}
            className="w-full h-full object-cover bg-gray-200"
          />
        );
        return (
          <SwiperSlide key={i}>
            <div className="w-full h-full aspect-w-3 aspect-h-1 rounded-lg overflow-hidden">
              {d.link ? (
                <Link href={d.link} target="_blank">
                  {_Image()}
                </Link>
              ) : (
                _Image()
              )}
            </div>
          </SwiperSlide>
        );
      })}
      <div className="banner__swiper-pagination mt-8" />
      <button className="hidden md:flex banner__navigation banner__button-prev">
        <Icon className={'w-8 h-8'} icon="mdi:chevron-left" />
      </button>
      <button className="hidden md:flex banner__navigation banner__button-next">
        <Icon className={'w-8 h-8'} icon="mdi:chevron-right" />
      </button>
    </Swiper>
  );
});

export default LibViewBannerInfoWidget;
