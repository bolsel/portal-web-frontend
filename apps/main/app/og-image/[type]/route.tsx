/* eslint-disable */

import BaseOgImage from '../../../components/base-og-image';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  req: NextRequest,
  { params: { type } }: { params: { type: string } }
) {
  const ogTypes = {
    dokumen: {
      title: 'Arsip dan Dokumen',
      description:
        'Akses dan unduh dokumen resmi dari Pemkab Bolaang Mongondow Selatan',
    },
    'layanan-publik': {
      title: 'Layanan Publik',
      description: 'Cari tahu informasi layanan publik yang ada di Bolsel',
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
