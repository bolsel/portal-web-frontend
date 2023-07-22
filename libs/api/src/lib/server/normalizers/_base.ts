import { rightTrimSlashes } from '@portalweb/base/server';
import { FileType } from '../../../types/system-types';

export const urlAssetCdn = (file: any) => {
  const filename_disk =
    typeof file === 'string'
      ? file
      : file.filename_disk ?? `${file.fileId}.${file.extension}`;
  return `${rightTrimSlashes(
    process.env.NEXT_PUBLIC_CDN_BASE_URL!
  )}/${filename_disk}`;
};

export function imageFile(data: FileType) {
  return {
    url: urlAssetCdn(data),
    width: data.width,
    height: data.height,
    filesize: data.filesize,
    title: data.title,
    description: data.description,
  };
}

export function fileObject(data: FileType) {
  return {
    url: urlAssetCdn(data),
    type: data.type,
    filesize: data.filesize,
    title: data.title,
    description: data.description,
  };
}

export function contentBlocks(data: any): {
  time: number;
  blocks: Record<string, any>[];
  version: string;
} {
  try {
    if (data.blocks) {
      data.blocks = data.blocks.map((d: any) => {
        if (d.type === 'image') {
          d.data.file.filesize = d.data.file.size;
          d.data.file = imageFile(d.data.file);
        }
        return d;
      });
    }
    return data;
  } catch (e) {
    return data;
  }
}
