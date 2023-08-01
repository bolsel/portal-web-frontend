import { apiResourceWebsites } from '@portalweb/api/server';

export async function getSiteData(domain: string) {
  return await apiResourceWebsites()
    .fetch({ pathQuery: ['byDomain', domain] })
    .catch(() => null);
}
