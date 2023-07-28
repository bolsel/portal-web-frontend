import { STATUS_PUBLISHED } from '../../constants';
import { apiBaseResource } from '../base-resource';
import { apiNormalizerApplications } from '../normalizers';

export const apiResourceApplications = () => {
  return apiBaseResource({
    resourceKey: 'applications',
    baseFilter: {
      status: {
        _eq: STATUS_PUBLISHED,
      },
    },
    defaultQuery: {
      fields: [
        'id',
        'link',
        'sort',
        'title',
        'links',
        'social_media',
        'description',
        'slug',
        'logo.*',
        'categories.category.id',
        'categories.category.name',
        'categories.category.slug',
        'organization.id',
        'organization.name',
        'organization.slug',
      ],
    },
    paths: {
      listWidget() {
        return {
          query: {
            fields: ['id', 'title', 'slug', 'description', 'link'],
            sort: ['-date_updated'],
          },
          normalizer: (data) => ({
            id: data.id,
            title: data.title,
            slug: data.slug,
            description: data.description,
            link: data.link,
          }),
        };
      },
      listPage({ query }) {
        return {
          query: {
            fields: query.fields,
            sort: ['title'],
          },
          normalizer: (data) => apiNormalizerApplications.base(data),
        };
      },
      listPageByCategorySlug({ query, errorThrow, pathQuery: [slug] }) {
        if (!slug) errorThrow('Kategori Slug dibutuhkan');
        return {
          query: {
            fields: query.fields,
            sort: ['title'],
            filter: {
              categories: {
                category: { slug },
              },
            },
          },
          normalizer: (data) => apiNormalizerApplications.base(data),
        };
      },
    },
  });
};
