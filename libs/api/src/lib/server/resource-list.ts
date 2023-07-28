import {
  apiResourceApplicationCategories,
  apiResourceApplications,
  apiResourceBannerInfo,
  apiResourceDocumentCategories,
  apiResourceDocuments,
  apiResourceGrafikInfo,
  apiResourceNews,
  apiResourceNewsCategories,
  apiResourcePublicServices,
} from './resources';

export function apiResourceItems() {
  return {
    application_categories: apiResourceApplicationCategories,
    applications: apiResourceApplications,
    banner_info: apiResourceBannerInfo,
    documents: apiResourceDocuments,
    document_categories: apiResourceDocumentCategories,
    grafik_info: apiResourceGrafikInfo,
    news: apiResourceNews,
    news_categories: apiResourceNewsCategories,
    public_services: apiResourcePublicServices,
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
