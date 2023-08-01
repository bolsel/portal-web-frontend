import {
  Directus,
  Transport,
  TransportMethods,
  TransportOptions,
  TransportResponse,
} from '@directus/sdk';
import { ApiItemsType } from '../../types';
import { unstable_cache } from 'next/cache';
import qs from 'qs';
class CustomTransport extends Transport {
  protected async request<T = any, R = any>(
    method: TransportMethods,
    path: string,
    data?: Record<string, any> | undefined,
    options?: Omit<TransportOptions, 'url'> | undefined
  ): Promise<TransportResponse<T, R>> {
    const tags = [`${path}/${qs.stringify(options?.params)}`];

    return await unstable_cache(
      async () => super.request(method, path, data, options),
      tags,
      {
        revalidate: 1,
        tags: tags,
      }
    )();
  }
}
export const apiInstance = () => {
  return new Directus<ApiItemsType>(process.env.BACKEND_URL!, {
    auth: {
      staticToken: process.env.BACKEND_TOKEN,
    },
    transport:
      process.env.NODE_ENV === 'development'
        ? new CustomTransport({
            url: process.env.BACKEND_URL!,
            beforeRequest: async (config) => {
              const authenticatedConfig = {
                ...config,
                headers: {
                  Authorization: `Bearer ${process.env.BACKEND_TOKEN}`,
                  ...config.headers,
                },
              };
              return authenticatedConfig;
            },
          })
        : undefined,
  });
};
