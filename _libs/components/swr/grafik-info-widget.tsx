'use client';

import { SwiperRef } from 'swiper/react';
import { useRef } from 'react';
import {
  UIContainer,
  UISwrComponentResourceProps,
  UISwrResource,
} from '@portal-web/shared-ui';
import LibViewGrafikInfoWidget, {
  LibViewGrafikInfoWidgetProps,
} from '../view/grafik-info-widget';

export type LibSwrGrafikInfoWidgetProps<K extends never> = Pick<
  UISwrComponentResourceProps<K>,
  'wrapperComponent' | 'paramsQuery'
> & {
  viewOptions?: Omit<LibViewGrafikInfoWidgetProps, 'items'>;
  pauseOnHover?: boolean;
};

export default function LibSwrGrafikInfoWidget<K extends never>({
  wrapperComponent,
  pauseOnHover = true,
  paramsQuery,
  viewOptions,
}: LibSwrGrafikInfoWidgetProps<K>) {
  const swiperRef = useRef<SwiperRef>(null);
  const loadingComponent = () => (
    <div className="mb-5 bg-base-200 animate-pulse w-full h-[304px] rounded-lg"></div>
  );
  const noItemsComponent = () => (
    <UIContainer>
      <div className="mb-5 bg-base-200 w-full h-[104px] rounded-lg flex justify-center items-center">
        Belum ada data
      </div>
    </UIContainer>
  );
  return (
    <UISwrResource
      resourceKey={'grafik_info'}
      loadingComponent={loadingComponent}
      noItemsComponent={noItemsComponent}
      wrapperComponent={wrapperComponent}
      paramsQuery={paramsQuery}
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
            <LibViewGrafikInfoWidget
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
