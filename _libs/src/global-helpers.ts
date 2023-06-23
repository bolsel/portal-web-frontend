import { FileType } from '@directus/sdk';
import { trimSlashes } from '@portal-web/shared-base';
import { useUIConfigContextValue } from '@portal-web/shared-ui';

export const urlAssetCdn = (file: FileType | string) => {
  const filename_disk = typeof file === 'string' ? file : (file.filename_disk ?? `${file.fileId}.${file.extension}`);
  return `https://cdn.bolselkab.go.id/portal-assets/live/${filename_disk}`;
};

export function publicUrl(path: string) {
  const configContext = useUIConfigContextValue();
  return `${configContext.publicUrl}${path ? `/${trimSlashes(path)}` : ''}`;
}

export const documentIcon = (mimeType) => {
  switch (mimeType) {
    case 'application/pdf':
      return '/icons/document/pdf.svg';

    case 'application/msword':
      return '/icons/document/doc.svg';

    case 'application/vnd.ms-excel':
      return '/icons/document/xls.svg';

    default:
      return '/icons/document/pdf.svg';
  }
};

export function mimeTypeLabel(mimeType) {
  switch (mimeType) {
    case 'application/pdf':
      return 'Portable Document Format (PDF)';

    case 'application/msword':
      return 'Microsoft Word';

    case 'application/vnd.ms-excel':
      return 'Microsoft Excel';

    default:
      return '-';
  }
}
