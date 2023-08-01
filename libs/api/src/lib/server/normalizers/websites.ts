import { ApiItemsType } from '../../../types';

export function base(data: ApiItemsType['websites']) {
  const { id, name, domain, modules, organization, slug } = data;
  const _organization = organization
    ? {
        organization_id: organization.id,
        organization_name: organization.name,
        organization_slug: organization.slug,
      }
    : {};
  return {
    id,
    name,
    domain,
    modules,
    slug,
    organization,
    ..._organization,
  };
}
