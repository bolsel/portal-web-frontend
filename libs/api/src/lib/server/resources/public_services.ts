import { STATUS_PUBLISHED } from '../../constants';
import { apiBaseResource } from '../base-resource';
import { apiNormalizerPublicServices } from '../normalizers';

export const apiResourcePublicServices = () => {
  return apiBaseResource({
    resourceKey: 'public_services',
    baseFilter: {
      status: {
        _eq: STATUS_PUBLISHED,
      },
    },
    defaultQuery: {
      fields: [
        'id',
        'title',
        'description',
        'slug',
        'images.image.*',
        'logo.*',
        'organization.id',
        'organization.slug',
        'organization.name',
        'links',
        'social_media',
        'address',
        'phones',
        'operational_hours',
        'type',
        'informations',
        'date_updated',
        'date_created',
      ],
    },
    paths: {
      bySlug({ query, errorThrow, pathQuery: [slug] }) {
        if (!slug) errorThrow('Slug dibutuhkan');
        return {
          query: {
            fields: query.fields,
            filter: {
              slug,
            },
          },
          isItem: true,
          normalizer(data) {
            return apiNormalizerPublicServices.bySlug(data);
          },
        };
      },
      listSimple() {
        return {
          query: {
            fields: ['id', 'title', 'type', 'description', 'logo.*', 'slug'],
          },
          normalizer(data) {
            return apiNormalizerPublicServices.listSimple(data);
          },
        };
      },
    },
  });
};
