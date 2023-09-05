import { apiResourceItemRead } from '@portalweb/api/server';
import { UIViewBannerInfoWidgetList } from '@portalweb/ui';
import { SwiperProps } from 'swiper/react';

export default async function HomeBannerInfoList({
  swiper,
}: {
  swiper?: SwiperProps;
}) {
  const data = await apiResourceItemRead('banner_info')
    .setQuery({ limit: 5 })
    .items({});
  return <UIViewBannerInfoWidgetList swiper={swiper} items={data} />;
}
