import { readItem, rest, updateItem } from '@directus/sdk';
import { apiInstance, apiResourceItemRead } from '@portalweb/api/server';
import { toDateString } from '@portalweb/base/server';

export function resourceNewsHomeHeadlineTab(type: 'popular' | 'latest') {
  return apiResourceItemRead('news')
    .setQuery({
      limit: 4,
      sort: [type === 'popular' ? '-view_count' : '-publish_date'],
    })
    .items({
      normalizer: [
        ['title', 'slug', 'publish_date', { category: ['name'] }],
        (data) => {
          return {
            ...data,
            publish_date_format: toDateString(data.publish_date),
          };
        },
      ],
    });
}
