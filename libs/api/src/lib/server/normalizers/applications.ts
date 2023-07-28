import { toDateString } from '@portalweb/base/server';
import { apiNormalizerBase } from '.';
import { ApiItemsType } from '../../../types';

export function base(data: ApiItemsType['applications']) {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    slug: data.slug,
    sort: data.sort,
    link: data.link,
    links: data.links,
    social_media: data.social_media,
    logo: data.logo ? apiNormalizerBase.imageFile(data.logo) : null,
    date_updated: data.date_updated,
    date_updated_format: data.date_updated
      ? toDateString(data.date_updated)
      : null,
    categories: data.categories.map((d) => d.category),
    organization_id: data.organization?.id,
    organization_name: data.organization?.name,
    organization_slug: data.organization?.slug,
  };
}
