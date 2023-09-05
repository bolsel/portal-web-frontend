'use client';

import { UISwrResource, UIViewGrafikInfoWidgetList } from '@portalweb/ui';
import clsx from 'clsx';

export default function GrafikInfoList() {
  return (
    <>
      <UISwrResource
        collection="grafik_info"
        path="items"
        query={{
          limit: 3,
        }}
        loadingComponent={() => (
          <UIViewGrafikInfoWidgetList
            skeleton
            swiper={{ className: 'py-5 pt-5' }}
            slideContainer={{
              className: clsx(
                `!bg-cover !bg-center`,
                '!w-[300px] !h-[500px] lg:!w-full'
              ),
            }}
          />
        )}
      >
        {({ data }) => (
          <UIViewGrafikInfoWidgetList
            items={data ?? []}
            swiper={{ className: 'py-0 pt-0' }}
            slideContainer={{
              className: clsx(
                `!bg-cover !bg-center`,
                '!w-[300px] !h-[500px] lg:!w-full'
              ),
            }}
          />
        )}
      </UISwrResource>
    </>
  );
}
