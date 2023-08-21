import { headers } from 'next/headers';

export function baseUrlTo(path: string) {
  path = encodeURIComponent(path);
  const headersList = headers();
  const host = headersList.get('host') ?? 'www.bolselkab.go.id';
  if (process.env.NODE_ENV === 'development') return `http://${host}${path}`;
  return `https://${host}${path}`;
}
