import { STATUS_PUBLISHED } from '../../constants';
import { apiNormalizerNews } from '../normalizers';
import { apiBaseResource } from '../base-resource';

export const apiResourceWebNews = () => {
  return apiBaseResource({
    resourceKey: 'web_news',
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
        'image_cover.*',
        'tags',
        'user_created.*',
        'view_count',
        'shared_count',
        'website.id',
      ],
    },
    paths: {
      bySlugWebId({ query, errorThrow, pathQuery: [slug, webId] }) {
        if (!slug) errorThrow('Slug dibutuhkan');
        if (!webId) errorThrow('Slug dibutuhkan');
        return {
          isItem: true,
          query: {
            fields: [...query.fields, 'content'],
            filter: {
              slug,
              website: { id: webId },
            },
          },
          normalizer: apiNormalizerNews.baseWebWithContent,
        };
      },
      popularByWebId({ query, pathQuery: [webId], errorThrow }) {
        if (!webId) errorThrow('Web id dibutuhkan.');
        return {
          query: {
            fields: [...query.fields],
            filter: {
              website: {
                id: webId,
              },
            },
            sort: ['-view_count'],
          },
          normalizer: apiNormalizerNews.baseWeb,
        };
      },
      latestByWebId({ query, pathQuery: [webId], errorThrow }) {
        if (!webId) errorThrow('Web id dibutuhkan.');
        return {
          query: {
            fields: [...query.fields],
            filter: {
              website: {
                id: webId,
              },
            },
            sort: ['-publish_date'],
          },
          normalizer: apiNormalizerNews.baseWeb,
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
