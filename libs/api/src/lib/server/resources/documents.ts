import { apiBaseResource } from '../base-resource';
import { apiNormalizerDocuments } from '../normalizers';

export const apiResourceDocuments = () => {
  return apiBaseResource({
    resourceKey: 'documents',
    baseFilter: {},
    defaultQuery: {
      fields: [
        'id',
        'description',
        'publish_date',
        'title',
        'slug',
        'category.id',
        'category.name',
        'category.slug',
        'file.*',
        'date_updated',
      ],
    },
    paths: {
      latest({ query }) {
        return {
          query: {
            fields: [...query.fields],
            sort: ['-publish_date'],
          },
          normalizer(data) {
            return apiNormalizerDocuments.base(data);
          },
        };
      },
      latestByCategorySlug({ query, pathQuery: [slug], errorThrow }) {
        if (!slug) errorThrow('Slug dibutuhkan');
        return {
          query: {
            fields: [...query.fields],
            sort: ['-publish_date'],
            filter: {
              category: {
                slug,
              },
            },
          },
          normalizer(data) {
            return apiNormalizerDocuments.base(data);
          },
        };
      },
    },
  });
};
