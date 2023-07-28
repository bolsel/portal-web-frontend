'use client';

import { UISwrResource, UIViewBannerInfoWidgetList } from '@portalweb/ui';

export default function BannerList() {
  return (
    <>
      <UISwrResource
        resourceKey="banner_info"
        pathQuery={['listWidget']}
        loadingComponent={() => <UIViewBannerInfoWidgetList skeleton />}
      >
        {({ data }) => <UIViewBannerInfoWidgetList items={data.data} />}
      </UISwrResource>
    </>
  );
}
