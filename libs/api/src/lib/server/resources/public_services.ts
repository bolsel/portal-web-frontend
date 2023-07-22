import { apiBaseResource } from '../base-resource';

export const apiResourcePublicServices = () => {
  return apiBaseResource({
    resourceKey: 'public_services',
    baseFilter: {},
    defaultQuery: {
      fields: [
        'id',
        'title',
        'description',
        'images',
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
      listSimple() {
        return {
          query: {
            fields: ['id', 'title'],
          },
          normalizer(data) {
            return data;
          },
        };
      },
    },
  });
};
