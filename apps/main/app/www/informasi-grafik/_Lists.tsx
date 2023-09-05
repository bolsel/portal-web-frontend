'use client';
import { UISwrResource, UIViewGrafikInfoWidgetList } from '@portalweb/ui';

export default function Lists() {
  return (
    <UISwrResource
      collection="grafik_info"
      path="items"
      query={{
        limit: -1,
      }}
      loadingComponent={() => <UIViewGrafikInfoWidgetList skeleton />}
    >
      {({ data }) => <UIViewGrafikInfoWidgetList items={data ?? []} />}
    </UISwrResource>
  );
}
