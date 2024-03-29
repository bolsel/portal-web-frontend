'use client';

import Link from 'next/link';
import {
  IUIBaseCreateCustomizableDefine,
  RequireOnlyOne,
  UIBaseCreateCustomizable,
  UIBaseIcon,
} from '../../base';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/modules';
import { TApiResourcePathReturn } from '@portalweb/api';
import { useRef } from 'react';
import Image from 'next/image';

type Props = {
  items?: TApiResourcePathReturn<'banner_info'>['read']['items'];
  skeleton?: true;
};

export type UIViewBannerInfoWidgetListType = IUIBaseCreateCustomizableDefine<
  RequireOnlyOne<Props, 'items' | 'skeleton'> & { swiper?: SwiperProps }
>;
export const UIViewBannerInfoWidgetList: UIViewBannerInfoWidgetListType['returnType'] =
  (props) =>
    UIBaseCreateCustomizable<UIViewBannerInfoWidgetListType>({
      props,
      defaults: {},
      Component({ swiper, items, skeleton }) {
        const swiperRef = useRef<SwiperRef>(null);

        return (
          <div
            className="w-full h-full"
            onMouseOver={() => {
              if (swiperRef.current) swiperRef.current.swiper.autoplay.pause();
            }}
            onMouseOut={() => {
              if (swiperRef.current) {
                swiperRef.current.swiper.autoplay.resume();
              }
            }}
          >
            <Swiper
              ref={swiperRef}
              modules={[Pagination, Navigation, Mousewheel, Autoplay]}
              slidesPerView={1}
              spaceBetween={32}
              speed={750}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
              }}
              breakpoints={{
                1280: {
                  slidesPerView: items?.length && items.length === 1 ? 1 : 1.2,
                },
              }}
              passiveListeners={true}
              mousewheel={true}
              className="default-swiper"
              {...swiper}
            >
              {skeleton
                ? [...Array(3)].map((v, i) => (
                    <SwiperSlide key={i}>
                      <div className="w-full h-full aspect-w-3 aspect-h-1 rounded-lg overflow-hidden bg-base-200 animate-pulse"></div>
                    </SwiperSlide>
                  ))
                : (items ?? []).map((d, i) => {
                    const _Image = () => (
                      <Image
                        src={d.image.url}
                        alt={d.title}
                        title={d.title}
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
              <div className="swiper-pagination navigation__wrapper mt-8" />
              <div className="">
                <button
                  className="swiper-button-prev
    transition-all ease-brand duration-300"
                  aria-label="Prev"
                >
                  <UIBaseIcon className={'!w-8 !h-8'} icon="chevron-left" />
                </button>
                <button
                  className="swiper-button-next
    transition-all ease-brand duration-300"
                  aria-label="Next"
                >
                  <UIBaseIcon className={'!w-8 !h-8'} icon="chevron-right" />
                </button>
              </div>
            </Swiper>
          </div>
        );
      },
    });
