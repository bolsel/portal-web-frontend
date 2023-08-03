import { ApiItemsType } from '../../../types';

export function base(data: ApiItemsType['websites']) {
  const { id, name, domain, modules, organization, slug } = data;
  return {
    id,
    name,
    domain,
    modules,
    slug,
    organization,
    organization_id: organization.id,
    organization_name: organization.name,
    organization_slug: organization.slug,
  };
}
