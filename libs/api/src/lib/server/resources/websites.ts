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
      fields: ['id', 'subdomain', 'domain_alias', 'slug', 'name'],
    },
    paths: {
      bySubdomain({ query, errorThrow, pathQuery: [subdomain] }) {
        if (!subdomain) errorThrow('subdomain dibutuhkan');
        return {
          isItem: true,
          query: {
            fields: [...query.fields],
            filter: {
              subdomain,
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
