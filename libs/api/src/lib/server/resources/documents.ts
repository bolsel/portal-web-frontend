import { STATUS_PUBLISHED } from '../../constants';
import { apiBaseResource } from '../base-resource';
import { apiNormalizerDocuments } from '../normalizers';

export const apiResourceDocuments = () => {
  return apiBaseResource({
    resourceKey: 'documents',
    baseFilter: {
      status: {
        _eq: STATUS_PUBLISHED,
      },
    },
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
      bySlug({ query, pathQuery: [slug], errorThrow }) {
        if (!slug) errorThrow('Slug dibutuhkan');
        return {
          isItem: true,
          query: {
            fields: query.fields,
            filter: { slug },
          },
          normalizer(data) {
            return apiNormalizerDocuments.base(data);
          },
        };
      },
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
        if (!slug) errorThrow('Kategori Slug dibutuhkan');
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
