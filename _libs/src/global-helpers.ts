import { FileType } from '@directus/sdk';

export const urlAssetCdn = (file: FileType | string) => {
  const filename_disk = typeof file === 'string' ? file : file.filename_disk;
  return `https://cdn.bolselkab.go.id/portal-assets/live/${filename_disk}`;
};
