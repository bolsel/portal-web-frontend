import { apiBaseResource } from '../base-resource';

export const apiResourceNewsCategories = () => {
  return apiBaseResource({
    resourceKey: 'news_categories',
    baseFilter: {},
    defaultQuery: {
      fields: ['id', 'name', 'description', 'slug', 'icon_name'],
    },
    paths: {
      listSimple() {
        return {
          query: {
            fields: ['id', 'name', 'slug', 'description'],
          },
          normalizer: (data) => data,
        };
      },
    },
  });
};
