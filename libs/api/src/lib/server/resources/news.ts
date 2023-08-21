import { STATUS_PUBLISHED } from '../../constants';
import { apiNormalizerNews } from '../normalizers';
import { apiBaseResource } from '../base-resource';

export const apiResourceNews = () => {
  return apiBaseResource({
    resourceKey: 'news',
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
        'publish_date',
        'date_updated',
        'reporter',
        'editor',
        'image_cover.*',
        'category.id',
        'category.name',
        'category.slug',
        'user_created.*',
        'view_count',
        'shared_count',
      ],
    },
    paths: {
      bySlug({ query, errorThrow, pathQuery: [slug] }) {
        if (!slug) errorThrow('Slug dibutuhkan');
        return {
          isItem: true,
          query: {
            fields: [...query.fields, 'content'],
            filter: {
              slug,
            },
          },
          normalizer(data) {
            return apiNormalizerNews.baseWithContent(data);
          },
        };
      },
      byCategorySlug({ errorThrow, pathQuery: [slug] }) {
        if (!slug) errorThrow('Slug dibutuhkan');
        return {
          query: {
            filter: {
              category: {
                slug,
              },
            },
            sort: ['-publish_date'],
          },
          normalizer: apiNormalizerNews.base,
        };
      },
      popular({ query }) {
        return {
          query: {
            fields: [...query.fields],
            sort: ['-view_count'],
          },
          normalizer(data) {
            return apiNormalizerNews.base(data);
          },
        };
      },
      popularByCategorySlug({ query, errorThrow, pathQuery: [slug] }) {
        if (!slug) errorThrow('Slug dibutuhkan');
        return {
          query: {
            fields: [...query.fields],
            sort: ['-view_count'],
            filter: {
              category: {
                slug,
              },
            },
          },
          normalizer(data) {
            return apiNormalizerNews.base(data);
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
            return apiNormalizerNews.base(data);
          },
        };
      },
      share: ({ errorThrow, pathQuery: [id], itemHandler }) => {
        if (!id) errorThrow('ID dibutuhkan.');
        return {
          isItem: true,
          query: {
            fields: ['shared_count'],
            filter: {
              id,
            },
          },
          normalizer(data) {
            const shared_count = (data.shared_count ?? 0) + 1;
            itemHandler.updateOne(id, {
              shared_count,
            });
            return {
              success: 1,
              shared_count,
            };
          },
        };
      },
    },
  });
};
