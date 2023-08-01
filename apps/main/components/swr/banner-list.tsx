'use client';

import { UISwrResource, UIViewBannerInfoWidgetList } from '@portalweb/ui';
import { SwiperProps } from 'swiper/react';

export default function SwrBannerList({ swiper }: { swiper?: SwiperProps }) {
  return (
    <>
      <UISwrResource
        resourceKey="banner_info"
        pathQuery={['listWidget']}
        loadingComponent={() => (
          <UIViewBannerInfoWidgetList skeleton swiper={swiper} />
        )}
      >
        {({ data }) => (
          <UIViewBannerInfoWidgetList swiper={swiper} items={data.data} />
        )}
      </UISwrResource>
    </>
  );
}
