'use client';

import { UISwrResource, UIViewGrafikInfoWidgetList } from '@portalweb/ui';

export default function GrafikInfoList() {
  return (
    <>
      <UISwrResource
        resourceKey="grafik_info"
        pathQuery={['listWidget']}
        paramsQuery={{ limit: 8 }}
        loadingComponent={() => <UIViewGrafikInfoWidgetList skeleton customizes={{
          showAllButton:()=>false
        }}
        swiper={{className:'py-5 pt-5'}}/>}
      >
        {({ data }) => <UIViewGrafikInfoWidgetList items={data.data} customizes={{
          showAllButton:()=>false
        }}
        swiper={{className:'py-0 pt-0'}}/>}
      </UISwrResource>
    </>
  );
}
