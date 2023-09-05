import { resourceItems } from './resource';

type TResourceItems = typeof resourceItems;
export function apiResourceItem<K extends keyof TResourceItems>(
  key: K
): (typeof resourceItems)[K] {
  return resourceItems[key];
}

export function apiResourceItemRead<K extends keyof TResourceItems>(
  k: K
): TResourceItems[K]['read'] {
  return resourceItems[k].read;
}

export function apiResourceItemPathRead<K extends keyof TResourceItems>(
  k: K
): TResourceItems[K]['paths']['read'] {
  return resourceItems[k].paths.read;
}
