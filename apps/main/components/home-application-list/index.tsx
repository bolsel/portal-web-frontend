import { apiResourceItemRead } from '@portalweb/api/server';
import { UIViewApplicationWidgetList } from '@portalweb/ui';

export default async function HomeApplicationList() {
  const data = await apiResourceItemRead('applications').items({});

  return <UIViewApplicationWidgetList items={data} />;
}
