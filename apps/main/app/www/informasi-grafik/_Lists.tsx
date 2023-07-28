'use client';
import { UISwrResource, UIViewGrafikInfoWidgetList } from '@portalweb/ui';

export default function Lists() {
  return (
    <UISwrResource
      resourceKey="grafik_info"
      pathQuery={['listWidget']}
      paramsQuery={{ limit: -1 }}
      loadingComponent={() => <UIViewGrafikInfoWidgetList skeleton />}
    >
      {({ data }) => <UIViewGrafikInfoWidgetList items={data.data} />}
    </UISwrResource>
  );
}
