'use client';

import {
  ApiResourceGetNormalizerType,
  getResourceApiUrl,
} from '@portalweb/api';
import { UIShareItem, UIShareItemProps } from '@portalweb/ui';

export default function Share({
  item,
  ...props
}: UIShareItemProps & {
  item: ApiResourceGetNormalizerType<'web_news', 'bySlugWebId'>;
}) {
  const apiSharedCount = getResourceApiUrl(`web_news/share/${item.id}`);

  return (
    <UIShareItem
      {...props}
      beforeOnClick={() => {
        fetch(apiSharedCount);
      }}
    />
  );
}
