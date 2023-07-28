import { STATUS_PUBLISHED } from '../../constants';
import { apiBaseResource } from '../base-resource';
import { apiNormalizerBase } from '../normalizers';

export const apiResourceBannerInfo = () => {
  return apiBaseResource({
    resourceKey: 'banner_info',
    baseFilter: {
      status: {
        _eq: STATUS_PUBLISHED,
      },
    },
    defaultQuery: {
      fields: ['id', 'link', 'sort', 'title', 'image.*'],
    },
    paths: {
      listWidget({ query }) {
        return {
          query: {
            fields: query.fields,
            sort: ['-date_updated'],
          },
          normalizer: (data) => ({
            id: data.id,
            title: data.title,
            link: data.link,
            image: apiNormalizerBase.imageFile(data.image),
          }),
        };
      },
    },
  });
};
