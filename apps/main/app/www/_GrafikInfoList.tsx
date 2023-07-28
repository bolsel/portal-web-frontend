'use client';

import { UISwrResource, UIViewGrafikInfoWidgetList } from '@portalweb/ui';

export default function GrafikInfoList() {
  return (
    <>
      <UISwrResource
        resourceKey="grafik_info"
        pathQuery={['listWidget']}
        paramsQuery={{ limit: 8 }}
        loadingComponent={() => <UIViewGrafikInfoWidgetList skeleton />}
      >
        {({ data }) => <UIViewGrafikInfoWidgetList items={data.data} />}
      </UISwrResource>
    </>
  );
}
