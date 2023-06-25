import { useRef } from 'react';
import LibBaseLightGallery from '../base/light-gallery';
import { GalleryItem } from 'lightgallery/lg-utils';
import { LightGallery } from 'lightgallery/lightgallery';
import { LightGalleryProps } from 'lightgallery/react';
import { nextImageUrl } from '@portal-web/shared-base';
export type LibViewGrafikInfoLightGalleryProps = {
  items: Record<string, any>[];
  itemExtend?: (item) => GalleryItem;
} & LightGalleryProps;
export default function LibViewGrafikInfoLightGallery({
  items,
  itemExtend,
  ...props
}: LibViewGrafikInfoLightGalleryProps) {
  const lightGallery = useRef<any>(null);
  return (
    <LibBaseLightGallery
      {...props}
      dynamic
      dynamicEl={items.map((item, index) => {
        const extend = itemExtend ? itemExtend(item) : {};
        return {
          src: item.image.url,
          thumb: nextImageUrl({
            url: item.image.url,
            width: 128,
            quality: 75,
          }),
          subHtml: item.title,
          ...extend,
        };
      })}
    />
  );
}
