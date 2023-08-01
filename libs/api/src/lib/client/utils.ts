import { rightTrimSlashes, trimSlashes } from '@portalweb/base';

export function getResourceApiUrl(path: string) {
  const baseUrl = rightTrimSlashes(
    process.env.NEXT_PUBLIC_API_RESOURCE_BASE_URL ?? '/api/resources'
  );
  return `${baseUrl}/${trimSlashes(path)}`;
}
