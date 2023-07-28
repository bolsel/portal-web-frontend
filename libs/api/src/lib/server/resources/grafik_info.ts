import { STATUS_PUBLISHED } from '../../constants';
import { apiBaseResource } from '../base-resource';
import { apiNormalizerBase } from '../normalizers';

export const apiResourceGrafikInfo = () => {
  return apiBaseResource({
    resourceKey: 'grafik_info',
    baseFilter: {
      status: {
        _eq: STATUS_PUBLISHED,
      },
    },
    defaultQuery: {
      fields: ['id', 'title', 'image.*'],
    },
    paths: {
      listWidget({ query }) {
        return {
          query: {
            fields: query.fields,
            sort: ['-publish_date'],
          },
          normalizer: (data) => ({
            id: data.id,
            title: data.title,
            image: apiNormalizerBase.imageFile(data.image),
          }),
        };
      },
    },
  });
};
