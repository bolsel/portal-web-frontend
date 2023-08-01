import { STATUS_PUBLISHED } from '../../constants';
import {
  apiNormalizerOrganizations,
} from '../normalizers';
import { apiBaseResource } from '../base-resource';

export const apiResourceOrganizations = () => {
  return apiBaseResource({
    resourceKey: 'organizations',
    baseFilter: {
      status: {
        _eq: STATUS_PUBLISHED,
      },
    },
    defaultQuery: {
      fields: ['id', 'name', 'slug'],
    },
    paths: {
      info({ errorThrow, pathQuery: [slug] }) {
        if (!slug) errorThrow('Slug dibutuhkan');
        return {
          isItem: true,
          query: {
            fields: [
              'id',
              'name',
              'slug',
              'address',
              'phone',
              'location_point',
              'email',
              'social_media',
              'sekilas',
              'visi',
              'misi',
              'structure',
            ],
            filter: {
              slug,
            },
          },
          normalizer: (data) => apiNormalizerOrganizations.info(data),
        };
      },
    },
  });
};
