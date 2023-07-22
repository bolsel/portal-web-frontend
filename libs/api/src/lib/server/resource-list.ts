import { apiResourceNews, apiResourceNewsCategories } from './resources';

export function apiResourceItems() {
  return {
    news: apiResourceNews,
    news_categories: apiResourceNewsCategories,
    websites: apiResourceNews,
  };
}
export function apiResourceGet(key: string) {
  const list: any = apiResourceItems();
  if (list[key]) {
    return list[key];
  }
  return null;
}
