import { apiResourceNews } from '@portalweb/api/server';
import BaseOgImage from '../../../../components/base-og-image';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = searchParams.get('slug');
  if (!slug) {
    return new Response('Not Found', { status: 404 });
  }
  const item = await apiResourceNews()
    .fetch({
      pathQuery: ['bySlug', slug],
    })
    .catch(() => null);
  if (!item) {
    return new Response('Not Found', { status: 404 });
  }
  const { title, description, content } = item;
  const images = [item.image_cover.url];
  content.blocks.forEach((c) => {
    if (c.type === 'image') {
      images.push(c.data.file.url);
    }
  });

  return BaseOgImage({
    req,
    title,
    description,
    images,
  });
}
