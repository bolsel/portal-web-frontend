import {NextApiRequest, NextApiResponse} from 'next';
import {
  directusInstance,
  NewsCategoriesResource,
  NewsResource,
  PublicServicesResource
} from "@portal-web/shared-api/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {data: newsCategories} =
    await (new NewsCategoriesResource()).itemsHandler().readByQuery({
      fields: ['name', 'slug', 'description', 'icon_name'],
      limit: -1
    });
  const {data: publicServices} =
    await (new PublicServicesResource()).itemsHandler().readByQuery({
      fields: ['id', 'title', 'description'],
      limit: 5
    });
  const mainMenu = [
    {
      title: 'Berita Bolsel',
      link: '/berita',
      items: newsCategories?.map((d: any) => ({
        title: d.name,
        link: `/berita?kategori=${d.slug}`,
        description: d.description,
        icon: d.icon_name ?? 'base:menu-default',
      })),
    },
    {
      title: 'Profil Bolsel',
      items: [
        {
          title: 'Tentang Bolsel',
          link: `/tentang-bolsel/visi-misi`,
          description: 'Cari tahu selengkapnya tentang Bolsel',
          icon: 'base:informasi',
        },
        {
          title: 'Arsip dan Dokumen',
          link: `/dokumen`,
          description: 'Akses dan unduh dokumen resmi dari Pemkab Bolsel',
          icon: 'base:folder-dokumen',
        },
        {
          title: 'Aplikasi',
          link: `/aplikasi`,
          description: 'Informasi tentang daftar Aplikasi yang ada di Bolsel',
          icon: 'base:apps',
        },
        {
          title: 'Jaringan Dokumentasi dan Informasi Hukum',
          link: 'https://jdih.bolselkab.go.id',
          description: 'Layanan transparansi informasi produk hukum',
          icon: 'base:folder-dokumen',
        },
        {
          title: 'Layanan Pengadaan Secara Elektronik',
          link: 'http://lpse.bolselkab.go.id',
          description:
            'Sistem pengadaan berbasis E-Procurement (SPSE) Pemkab Bolsel',
          icon: 'base:folder-dokumen',
        },
      ],
    },
    {
      title: 'Layanan Publik',
      link: '/layanan-publik',
      items: [
        ...(publicServices ? publicServices.map((d: any) => ({
          title: d.title,
          link: `/layanan-publik/${d.id}`,
          description: d.description,
          icon: 'base:layanan-publik',
        })) : []),
        ...[
          {
            title: 'Semua Layanan Publik',
            link: '/layanan-publik',
            icon: 'base:menu-default',
            description: 'Lihat daftar layanan publik lengkap',
          },
        ],
      ],
    },
  ];
  res.status(200).json(mainMenu);
}
