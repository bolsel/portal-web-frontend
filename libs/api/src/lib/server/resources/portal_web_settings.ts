import { apiBaseResource } from '../base-resource';

export const apiResourcePortalWebSettings = () => {
  return apiBaseResource({
    resourceKey: 'portal_web_settings',
    singleton: true,
    baseFilter: {},
    defaultQuery: {
      fields: ['*'],
    },
    paths: {
      all() {
        return {
          isItem: true,
          query: {
            fields: '*',
          },
          normalizer: (data) => data,
        };
      },
    },
  });
};
