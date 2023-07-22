import { apiBaseResource } from '../base-resource';

export const apiResourceDocumentCategories = () => {
  return apiBaseResource({
    resourceKey: 'document_categories',
    baseFilter: {},
    defaultQuery: {
      fields: ['id', 'name', 'description', 'slug'],
    },
    paths: {
      listSimple({ query }) {
        return {
          query: {
            fields: query.fields,
          },
          normalizer: (data) => data,
        };
      },
    },
  });
};
