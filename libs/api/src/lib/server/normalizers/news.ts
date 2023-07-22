import { toDateString } from '@portalweb/base/server';
import { apiNormalizerBase } from '.';
import { ApiItemsType } from '../../../types';

export function base(data: ApiItemsType['news']) {
  const writer =
    data.user_created.content_author_name ??
    `${data.user_created.first_name} ${data.user_created.last_name}`;
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    slug: data.slug,
    publish_date: data.publish_date,
    publish_date_format: toDateString(data.publish_date),
    reporter: data.reporter,
    category_name: data.category.name,
    category_id: data.category.id,
    view_count: data.view_count,
    shared_count: data.shared_count,
    writer,
    image_cover: apiNormalizerBase.imageFile(data.image_cover),
  };
}
export const baseWithContent = (data: ApiItemsType['news']) => ({
  ...base(data),
  ...{ content: apiNormalizerBase.contentBlocks(data.content) },
});
