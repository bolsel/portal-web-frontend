import { directusInstance } from '@portal-web/shared-api/server';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const t = await directusInstance().users.me.read();
  console.log(t);
  res.status(200).json([]);
}
