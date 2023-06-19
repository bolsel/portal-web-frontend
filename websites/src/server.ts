import { WebsitesResource } from '@portal-web/shared-api/server';
import { NextPageContext } from 'next';

export async function serverSideHost(context: NextPageContext) {
  const { req } = context;

  if (!req) return;
  // const host = req.headers.host
  const host =
    process.env.NODE_ENV === 'development'
      ? 'kominfo.bolselkab.go.id'
      : req.headers.host;
  if (!host) {
    throw Error('Not found');
  }
  try {
    const item = await new WebsitesResource().apiResourceFetch({
      pathQuery: ['byDomainOrAlias', host],
    });
    item.publicUrl = `https://${host}`;
    return item;
  } catch (e) {
    return false;
  }
}
