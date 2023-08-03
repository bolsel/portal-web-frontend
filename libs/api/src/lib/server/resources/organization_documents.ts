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
      latest({ query, pathQuery: [organizationId], errorThrow }) {
        if (!organizationId) errorThrow('ID Organisasi diperlukan.');
        return {
          query: {
            fields: [...query.fields],
            sort: ['-publish_date'],
            filter: {
              organization: {
                id: organizationId
              }
            }
          },
          normalizer(data) {
            return apiNormalizerOrganizationDocuments.base(data);
          },
        };
      },
      latestByCategory({ query, pathQuery: [organizationId, category], errorThrow }) {
        if (!organizationId) errorThrow('ID Organisasi diperlukan.');
        if (!category) errorThrow('Kategori dibutuhkan');
        return {
          query: {
            fields: [...query.fields],
            sort: ['-publish_date'],
            filter: {
              category,
              organization: {
                id: organizationId
              }
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
