import { apiResourceItemPathRead } from '@portalweb/api/server';

export async function getSiteData(domain: string) {
  return await apiResourceItemPathRead('websites')
    .byDomain({
      paths: [domain],
    })
    .catch(() => null);
}
