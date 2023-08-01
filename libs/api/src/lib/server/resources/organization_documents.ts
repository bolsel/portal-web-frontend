import { STATUS_PUBLISHED } from '../../constants';
import { apiBaseResource } from '../base-resource';
import { apiNormalizerOrganizationDocuments } from '../normalizers';

export const apiResourceOrganizationDocuments = () => {
  return apiBaseResource({
    resourceKey: 'organization_documents',
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
        'category',
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
            return apiNormalizerOrganizationDocuments.base(data);
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
            return apiNormalizerOrganizationDocuments.base(data);
          },
        };
      },
      latestByCategory({ query, pathQuery: [category], errorThrow }) {
        if (!category) errorThrow('Kategori dibutuhkan');
        return {
          query: {
            fields: [...query.fields],
            sort: ['-publish_date'],
            filter: {
              category,
            },
          },
          normalizer(data) {
            return apiNormalizerOrganizationDocuments.base(data);
          },
        };
      },
    },
  });
};
