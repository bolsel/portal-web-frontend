import { Directus } from '@directus/sdk';
import { ApiItemsType } from '../../types';

export const apiInstance = () => {
  return new Directus<ApiItemsType>(process.env.BACKEND_URL!, {
    auth: {
      staticToken: process.env.BACKEND_TOKEN,
    },
  });
};
