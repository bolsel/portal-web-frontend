export const kategoryText = (category) => {
  if (category === 'dokumen-perencanaan') return 'Dokumen Perencanaan';
  else if (category === 'laporan-keuangan') return 'Laporan Keuangan';
  else if (category === 'lainnya') return 'Lainnya';
  else return category;
};
