import { toDateString } from '@portalweb/base/server';
import { apiNormalizerBase } from '.';
import { ApiItemsType } from '../../../types';

export function base(data: ApiItemsType['organization_documents']) {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    slug: data.slug,
    date_updated: data.date_updated,
    date_updated_format: data.date_updated
      ? toDateString(data.date_updated)
      : null,
    publish_date: data.publish_date,
    publish_date_format: toDateString(data.publish_date),
    category: data.category,
    file: apiNormalizerBase.fileObject(data.file),
  };
}
