'use client';

import { UISwrResource, UIViewApplicationWidgetList } from '@portalweb/ui';

export default function AplikasiList() {
  return (
    <>
      <UISwrResource
        resourceKey="applications"
        pathQuery={['listWidget']}
        paramsQuery={{ limit: 10 }}
        loadingComponent={() => <UIViewApplicationWidgetList skeleton />}
      >
        {({ data }) => <UIViewApplicationWidgetList items={data.data} />}
      </UISwrResource>
    </>
  );
}
