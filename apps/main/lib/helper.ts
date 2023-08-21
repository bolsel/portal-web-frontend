import {
  ApiResourceGetNormalizerType,
  getResourceApiUrl,
} from '@portalweb/api';

export type NewsOrWebNewsItemType =
  | ApiResourceGetNormalizerType<'news', 'bySlug'>
  | ApiResourceGetNormalizerType<'web_news', 'bySlugWebId'>;

export const newsItemIsWeb = (item: NewsOrWebNewsItemType) =>
  (item as ApiResourceGetNormalizerType<'web_news', 'bySlugWebId'>).website_id
    ? true
    : false;

export function titleWithMainTitle(title: string) {
  if (!process.env.NEXT_PUBLIC_MAIN_TITLE) return title;
  return `${title} | ${process.env.NEXT_PUBLIC_MAIN_TITLE}`;
}

export function getArticleUrl(
  item: NewsOrWebNewsItemType,
  domain?: string
): string {
  return domain
    ? `https://${domain}/berita/${item.slug}`
    : `https://www.bolselkab.go.id/berita/${item.slug}`;
}

export async function fetchNewsShareCount(item: NewsOrWebNewsItemType) {
  const url = newsItemIsWeb(item)
    ? `web_news/share/${item.id}`
    : `news/share/${item.id}`;
  return fetch(getResourceApiUrl(url));
}
