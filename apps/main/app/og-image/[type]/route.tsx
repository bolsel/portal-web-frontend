/* eslint-disable */

import BaseOgImage from '../../../components/base-og-image';
import { ImageResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const type = searchParams.get('type')!;
  const ogTypes = {
    dokumen: {
      title: 'Arsip dan Dokumen',
      description:
        'Akses dan unduh dokumen resmi dari Pemkab Bolaang Mongondow Selatan',
    },
  };
  if (!ogTypes[type]) {
    return new Response('Tidak ditemukan.!', { status: 404 });
  }

  return BaseOgImage({
    ...ogTypes[type],
    req,
    images: [],
  });
}
