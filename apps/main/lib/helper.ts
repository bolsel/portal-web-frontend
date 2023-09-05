import { TApiResourcePathReturn, getResourceApiUrl } from '@portalweb/api';

export type NewsOrWebNewsItemType =
  | TApiResourcePathReturn<'news'>['read']['bySlug']
  | TApiResourcePathReturn<'web_news'>['read']['bySlug'];

export const newsItemIsWeb = (item: NewsOrWebNewsItemType) =>
  (item as TApiResourcePathReturn<'web_news'>['read']['bySlug']).website
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
  const url = `${newsItemIsWeb(item) ? 'web_news' : 'news'}/shareAndViewCount/${
    item.slug
  }/share`;
  return fetch(getResourceApiUrl(url));
}
