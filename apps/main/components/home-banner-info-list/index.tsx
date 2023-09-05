import { apiResourceItemRead } from '@portalweb/api/server';
import { UIViewBannerInfoWidgetList } from '@portalweb/ui';

export default async function HomeBannerInfoList() {
  const data = await apiResourceItemRead('banner_info')
    .setQuery({ limit: 5 })
    .items({});
  return <UIViewBannerInfoWidgetList items={data} />;
}
