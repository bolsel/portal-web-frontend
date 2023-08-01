/* eslint-disable */

import {
  apiResourceNews,
  apiResourcePublicServices,
} from '@portalweb/api/server';
import BaseOgImage, {
  BaseOgImagePropsType,
} from '../../../../components/base-og-image';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  req: NextRequest,
  { params: { type, slug } }: { params: { type: string; slug: string } }
) {
  const ogTypes: Record<string, () => Promise<BaseOgImagePropsType | null>> = {
    berita: async () => {
      const item = await apiResourceNews()
        .fetch({
          pathQuery: ['bySlug', slug],
        })
        .catch(() => null);
      if (!item) return null;

      const { title, description, content } = item;
      const images = [item.image_cover.url];
      content.blocks.forEach((c) => {
        if (c.type === 'image') {
          images.push(c.data.file.url);
        }
      });
      return { title, description, images, req };
    },
    'layanan-publik': async () => {
      const item = await apiResourcePublicServices()
        .fetch({
          pathQuery: ['bySlug', slug],
        })
        .catch(() => null);
      if (!item) return null;
      return {
        title: `${item.title} (Layanan Publik)`,
        description: item.description,
        images: item.images.map((img) => img.url),
        req,
      };
    },
  };
  if (!ogTypes[type]) {
    return new Response('Tidak ditemukan.!', { status: 404 });
  }
  const ogData = await ogTypes[type]();
  if (ogData === null)
    return new Response('Tidak ditemukan.!', { status: 404 });

  return BaseOgImage(ogData);
}
