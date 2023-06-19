'use client';

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import {
  UIContainer,
  UISwrComponentResourceProps,
  UISwrResource,
} from '@portal-web/shared-ui';
import LibViewBannerInfoWidget, {
  LibViewBannerInfoWidgetProps,
} from '../view/banner-info-widget';

export type LibSwrBannerInfoWidgetProps<K extends never> = Pick<
  UISwrComponentResourceProps<K>,
  'wrapperComponent'
> & {
  viewOptions?: Omit<LibViewBannerInfoWidgetProps, 'items'>;
  pauseOnHover?: boolean;
};

export default function LibSwrBannerInfoWidget<K extends never>({
  wrapperComponent,
  pauseOnHover = true,
  viewOptions,
}: LibSwrBannerInfoWidgetProps<K>) {
  const swiperRef = useRef<SwiperRef>(null);
  const loadingComponent = () => (
    <div className="mb-5 bg-base-200 animate-pulse w-full h-[304px] rounded-lg"></div>
  );
  const noItemsComponent = () => (
    <UIContainer>
      <div className="mb-5 bg-base-200 w-full h-[104px] rounded-lg flex justify-center items-center">
        Belum ada data banner
      </div>
    </UIContainer>
  );
  return (
    <UISwrResource
      resourceKey={'banner_info'}
      loadingComponent={loadingComponent}
      noItemsComponent={noItemsComponent}
      wrapperComponent={wrapperComponent}
    >
      {({ data }) => {
        return (
          <div
            className="w-full h-full"
            onMouseOver={() => {
              if (swiperRef.current && pauseOnHover)
                swiperRef.current.swiper.autoplay.pause();
            }}
            onMouseOut={() => {
              if (swiperRef.current && pauseOnHover) {
                swiperRef.current.swiper.autoplay.resume();
              }
            }}
          >
            <LibViewBannerInfoWidget
              {...viewOptions}
              ref={swiperRef}
              items={data}
            />
          </div>
        );
      }}
    </UISwrResource>
  );
}
