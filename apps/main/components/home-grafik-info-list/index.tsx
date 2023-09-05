import { apiResourceItemRead } from '@portalweb/api/server';
import { UIViewGrafikInfoWidgetList } from '@portalweb/ui';

export default async function HomeGrafikInfoList() {
  const data = await apiResourceItemRead('grafik_info')
    .setQuery({ limit: 8 })
    .items({});
  return <UIViewGrafikInfoWidgetList items={data} />;
}
