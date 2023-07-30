import { toDateString } from '@portalweb/base';
import { apiNormalizerBase } from '.';
import { ApiItemsType } from '../../../types';

export function bySlug(data: ApiItemsType['public_services']) {
  const {
    id,
    title,
    slug,
    description,
    logo,
    type,
    address,
    email,
    images,
    informations,
    links,
    operational_hours,
    phones,
    social_media,
    organization,
    date_updated,
    date_created,
  } = data;
  const _organization = organization
    ? {
        organization_id: organization.id,
        organization_name: organization.name,
        organization_slug: organization.slug,
      }
    : {};
  return {
    id,
    title,
    slug,
    description,
    logo: logo ? apiNormalizerBase.imageFile(logo) : null,
    type,
    address,
    email,
    images: images
      ? images.map((img) => apiNormalizerBase.imageFile(img.image))
      : [],
    informations,
    links: links ?? [],
    operational_hours,
    phones,
    social_media,
    date_updated: new Date(date_updated ?? date_created),
    ..._organization,
  };
}

export function listSimple(data: ApiItemsType['public_services']) {
  const { id, title, slug, description, logo, type } = data;
  return {
    id,
    title,
    slug,
    description,
    type,
    logo: logo ? apiNormalizerBase.imageFile(logo) : null,
  };
}
