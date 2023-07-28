import { apiBaseResource } from '../base-resource';

export const apiResourceApplicationCategories = () => {
  return apiBaseResource({
    resourceKey: 'application_categories',
    baseFilter: {},
    defaultQuery: {
      fields: ['id', 'name', 'slug'],
    },
    paths: {
      all({ query }) {
        return {
          query: {
            fields: query.fields,
            limit: -1,
          },
          normalizer: (data) => data,
        };
      },
    },
  });
};
