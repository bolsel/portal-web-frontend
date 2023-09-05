'use client';

import { UIShareItem, UIShareItemProps } from '@portalweb/ui';
import {
  NewsOrWebNewsItemType,
  fetchNewsShareCount,
  getArticleUrl,
} from '../lib/helper';
import { useParams } from 'next/navigation';

export default function NewsShareItem({
  item,
  ...props
}: Partial<UIShareItemProps> & {
  item: NewsOrWebNewsItemType;
}) {
  const params = useParams();
  return (
    <UIShareItem
      url={getArticleUrl(item, (params.domain as string) ?? null)}
      title={item.title}
      quote={item.description}
      beforeOnClick={() => {
        fetchNewsShareCount(item);
      }}
      {...props}
    />
  );
}
