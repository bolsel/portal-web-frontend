import { NextRequest, NextResponse } from 'next/server';
import { apiResourceGet } from '@portalweb/api/server';
import qs from 'qs';
export const revalidate = 1000;
const sendError = (message: any) => {
  return NextResponse.json(
    {
      error: 1,
      message,
    },
    { status: 500 }
  );
};

export async function GET(
  request: NextRequest,
  { params }: { params: { q: string[] } }
) {
  const [resourceKey, ...pathQuery] = params.q;
  try {
    const apiResource = apiResourceGet(resourceKey);
    if (!apiResource) {
      throw new Error(`Api resource tidak ada: ${resourceKey}`);
    }
    const t = await apiResource().fetch({
      pathQuery: pathQuery,
      paramsQuery: qs.parse(Object.fromEntries(request.nextUrl.searchParams)),
    });
    return NextResponse.json(t);
  } catch (e: any) {
    if (process.env.NODE_ENV === 'development') {
      if (e && e['errors']) return sendError(e['errors']);
      else if (e && e['message']) return sendError(e['message']);
    } else {
      return sendError('Terjadi kesalahan');
    }
  }
}
