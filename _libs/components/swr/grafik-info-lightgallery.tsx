'use client';

import { ComponentProps, useRef } from 'react';
import {
  UIContainer,
  UISwrComponentResourceProps,
  UISwrResource,
} from '@portal-web/shared-ui';
import LibViewGrafikInfoLightGallery, {
  LibViewGrafikInfoLightGalleryProps,
} from '../view/grafik-info-lightgallery';
import LibBaseLightGalleryInline from '../base/light-gallery-inline';

export type LibSwrGrafikInfoWidgetProps<K extends never> = Pick<
  UISwrComponentResourceProps<K>,
  'wrapperComponent' | 'paramsQuery'
> & {
  inline?: boolean;
  viewOptions?: Omit<LibViewGrafikInfoLightGalleryProps, 'items'>;
} & Omit<ComponentProps<'div'>, 'children'>;

export default function LibSwrGrafikInfoLightGallery<K extends never>({
  wrapperComponent,
  paramsQuery,
  inline: isInline,
  viewOptions,
  ...props
}: LibSwrGrafikInfoWidgetProps<K>) {
  const loadingComponent = () => (
    <div className="mb-5 bg-base-200 animate-pulse w-full h-[304px] rounded-lg"></div>
  );
  const noItemsComponent = () => (
    <UIContainer>
      <div className="mb-5 bg-base-200 w-full h-[104px] rounded-lg flex justify-center items-center">
        Belum ada data
      </div>
    </UIContainer>
  );
  const t = useRef();
  return (
    <UISwrResource
      resourceKey={'grafik_info'}
      loadingComponent={loadingComponent}
      noItemsComponent={noItemsComponent}
      wrapperComponent={wrapperComponent}
      paramsQuery={paramsQuery}
    >
      {({ data }) => {
        if (isInline) {
          return (
            <LibBaseLightGalleryInline
              className="w-full h-[600px] rounded-lg"
              {...props}
            >
              {(inlineProps) => {
                return (
                  <LibViewGrafikInfoLightGallery
                    {...inlineProps}
                    {...viewOptions}
                    items={data}
                    closable={false}
                    hash={false}
                  />
                );
              }}
            </LibBaseLightGalleryInline>
          );
        }
        return <LibViewGrafikInfoLightGallery {...viewOptions} items={data} />;
      }}
    </UISwrResource>
  );
}
