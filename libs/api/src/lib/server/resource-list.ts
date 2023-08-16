import {
  apiResourceApplicationCategories,
  apiResourceApplications,
  apiResourceBannerInfo,
  apiResourceDocumentCategories,
  apiResourceDocuments,
  apiResourceGrafikInfo,
  apiResourceNews,
  apiResourceNewsCategories,
  apiResourceOrganizationDocuments,
  apiResourceOrganizationPejabat,
  apiResourceOrganizations,
  apiResourcePublicServices,
  apiResourceWebAduanPublik,
  apiResourceWebNews,
  apiResourceWebsites,
} from './resources';

export function apiResourceItems() {
  return {
    application_categories: apiResourceApplicationCategories,
    applications: apiResourceApplications,
    banner_info: apiResourceBannerInfo,
    documents: apiResourceDocuments,
    document_categories: apiResourceDocumentCategories,
    grafik_info: apiResourceGrafikInfo,
    news_categories: apiResourceNewsCategories,
    news: apiResourceNews,
    organization_documents: apiResourceOrganizationDocuments,
    organization_pejabat: apiResourceOrganizationPejabat,
    organizations: apiResourceOrganizations,
    public_services: apiResourcePublicServices,
    web_aduan_publik: apiResourceWebAduanPublik,
    web_news: apiResourceWebNews,
    websites: apiResourceWebsites,
  };
}
export function apiResourceGet(key: string) {
  const list: any = apiResourceItems();
  if (list[key]) {
    return list[key];
  }
  return null;
}
