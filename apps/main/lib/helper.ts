import { headers } from 'next/headers';

export function titleWithMainTitle(title: string) {
  if (!process.env.NEXT_PUBLIC_MAIN_TITLE) return title;
  return `${title} | ${process.env.NEXT_PUBLIC_MAIN_TITLE}`;
}

export function baseUrlTo(path: string) {
  path = encodeURIComponent(path);
  const headersList = headers();
  const host = headersList.get('host') ?? 'www.bolselkab.go.id';
  if (process.env.NODE_ENV === 'development') return `http://${host}${path}`;
  return `https://${host}${path}`;
}
