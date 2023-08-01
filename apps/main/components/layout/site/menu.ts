import { ApiResourceGetNormalizerType } from '@portalweb/api';
import { UIBaseIconNamesType } from '@portalweb/ui';

type Menu = {
  title: string;
  link: string;
  items?: (Menu & { description: string; icon: UIBaseIconNamesType })[];
};
export function siteMenuProfilItems(
  site: ApiResourceGetNormalizerType<'websites', 'byDomain'>
): Menu['items'] {
  return [
    {
      title: 'Sekilas',
      link: '/profil/sekilas',
      description: `Sekilas tentang ${site.organization_name}`,
      icon: 'info',
    },
    {
      title: 'Visi Misi',
      link: '/profil/visi-misi',
      description: `Visi & Misi ${site.organization_name}`,
      icon: 'visi-misi',
    },
    {
      title: 'Struktur Organisasi',
      link: '/profil/struktur-organisasi',
      description: `Struktur Organisasi ${site.organization_name}`,
      icon: 'sitemap',
    },
    {
      title: 'Profil Pejabat',
      link: '/profil/pejabat',
      description: `Profil pejabat ${site.organization_name}`,
      icon: 'users',
    },
  ];
}
export function siteMenuDokumenItems(
  site: ApiResourceGetNormalizerType<'websites', 'byDomain'>
): Menu['items'] {
  return [
    {
      title: 'Semua Dokumen',
      link: '/dokumen',
      description: `Informasi Dokumen ${site.organization_name}`,
      icon: 'document-file',
    },
    {
      title: 'Dokumen Perencanaan',
      link: '/dokumen?kategori=dokumen-perencanaan',
      description: `Dokumen Perencanaan ${site.organization_name}`,
      icon: 'document-file',
    },
    {
      title: 'Laporan Keuangan',
      link: '/dokumen?kategori=laporan-keuangan',
      description: `Laporan Keuangan ${site.organization_name}`,
      icon: 'document-file',
    },
    {
      title: 'Dokumen lainnya',
      link: '/dokumen?kategori=lainnya',
      description: `Dokumen lainnya ${site.organization_name}`,
      icon: 'document-file',
    },
  ];
}
export function siteMenu(
  site: ApiResourceGetNormalizerType<'websites', 'byDomain'>
) {
  const modules: string[] = site.modules ?? [];

  const menuItems: Menu[] = [
    {
      title: 'Profil',
      link: '/profil',
      items: siteMenuProfilItems(site),
    },
    {
      title: 'Dokumen',
      link: '/dokumen',
      items: siteMenuDokumenItems(site),
    },
    {
      title: 'Berita',
      link: '/berita',
      items: [
        {
          title: 'Berita Terbaru',
          link: '/berita',
          description: `Berita terbaru ${site.organization_name}`,
          icon: 'newspaper',
        },
        {
          title: 'Portal Bolsel',
          link: 'https://www.bolselkab.go.id/berita',
          description: 'Lihat berita utama Portal Bolsel',
          icon: 'newspaper',
        },
      ],
    },
  ];
  if (modules.indexOf('aduan_publik') >= 0) {
    menuItems.push({
      title: 'Aduan Publik',
      link: '/aduan-publik',
    });
  }

  return menuItems;
}
