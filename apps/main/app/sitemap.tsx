import { headers } from 'next/headers';
import { apiResourceNews } from '@portalweb/api/server';

export default async function Sitemap() {
  const headersList = headers();
  const domain =
    headersList
      .get('host')
      ?.replace('.localhost:4200', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) ??
    'vercel.pub';
  const { data: berita } = await apiResourceNews().itemHandler.readByQuery({
    limit: -1,
    fields: ['slug'],
    sort: ['-publish_date'],
  });
  const beritaUrls = berita
    ? berita.map(({ slug }) => ({
        url: `https://${domain}/berita/${slug}`,
        lastModified: new Date(),
      }))
    : undefined;
  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    ...beritaUrls,
  ];
}
