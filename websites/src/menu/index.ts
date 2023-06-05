export function getBuildedMenuProfilList({ website }) {
  return [
    {
      title: 'Sekilas',
      link: '/profil/sekilas',
      description: `Sekilas tentang ${website.organization.name}`,
      icon: 'mdi:information-variant-box-outline',
    },
    {
      title: 'Visi Misi',
      link: '/profil/visi-misi',
      description: `Visi & Misi ${website.organization.name}`,
      icon: 'mingcute:target-line',
    },
    {
      title: 'Struktur Organisasi',
      link: '/profil/struktur-organisasi',
      description: `Struktur Organisasi ${website.organization.name}`,
      icon: 'prime:sitemap',
    },
    {
      title: 'Profil Pejabat',
      link: '/profil/pejabat',
      description: `Profil pejabat ${website.organization.name}`,
      icon: 'mdi:users-group-outline',
    },
  ];
}

export function getBuildedMenuList({ website }) {
  const menuItems = [
    {
      title: 'Profil',
      link: '/',
      items: getBuildedMenuProfilList({ website }),
    },
    {
      title: 'Informasi',
      link: '/',
      items: [
        {
          title: 'Dokumen Perencanaan',
          link: '/dokumen/dokumen-perencanaan',
          description: `Dokumen Perencanaan ${website.organization.name}`,
          icon: 'mdi:file-document-outline',
        },
        {
          title: 'Laporan Keuangan',
          link: '/dokumen/laporan-keuangan',
          description: `Laporan Keuangan ${website.organization.name}`,
          icon: 'mdi:file-document-outline',
        },
        {
          title: 'Dokumen lainnya',
          link: '/dokumen/laporan-keuangan',
          description: `Dokumen lainnya ${website.organization.name}`,
          icon: 'mdi:file-document-outline',
        },
      ],
    },
    {
      title: 'Berita',
      link: '/',
      items: [
        {
          title: 'Berita Terbaru',
          link: '/berita',
          description: `Berita terbaru ${website.organization.name}`,
          icon: 'mdi:newspaper-variant-outline',
        },
        {
          title: 'Portal Bolsel',
          link: 'https://bolselkab.go.id/berita',
          description: 'Lihat berita utama Portal Bolsel',
          icon: 'mdi:newspaper-variant-outline',
        },
      ],
    },
  ];

  return menuItems;
}
