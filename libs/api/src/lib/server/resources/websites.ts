import { STATUS_PUBLISHED } from '../../constants';
import { apiNormalizerWebsites } from '../normalizers';
import { apiBaseResource } from '../base-resource';

export const apiResourceWebsites = () => {
  return apiBaseResource({
    resourceKey: 'websites',
    baseFilter: {
      status: {
        _eq: STATUS_PUBLISHED,
      },
    },
    defaultQuery: {
      fields: ['id', 'domain', 'domain_alias', 'slug', 'name'],
    },
    paths: {
      byDomain({ query, errorThrow, pathQuery: [domain] }) {
        if (!domain) errorThrow('subdomain dibutuhkan');
        return {
          isItem: true,
          query: {
            fields: [
              'id',
              'domain',
              'domain_alias',
              'slug',
              'name',
              'modules',
              'organization.id',
              'organization.name',
              'organization.slug',
            ],
            filter: {
              domain,
            },
          },
          normalizer(data) {
            return apiNormalizerWebsites.base(data);
          },
        };
      },
    },
  });
};
