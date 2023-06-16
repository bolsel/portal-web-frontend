import { NextApiRequest, NextApiResponse } from 'next';
import { PortalWebSettingsResource } from '@portal-web/shared-api/server';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const resource = new PortalWebSettingsResource();
  const data = await resource.apiResourceFetch({});
  res.status(200).json(data);
}
