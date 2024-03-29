import { createApiResource } from '../base';

export default createApiResource('websites', {
  baseFields: [
    'id',
    'domain',
    'domain_alias',
    'slug',
    'name',
    'modules',
    { organization: ['id', 'name', 'slug'] },
  ],
  baseQuery: {
    filter: {
      status: { _eq: 'published' },
    },
  },
  baseNormalizer(data) {
    return data;
  },
}).addPath('read', 'byDomain', (res) => {
  return ({ paths: [domain] }) => {
    if (!domain) throw new Error('domain is required');
    return res.read
      .setQuery({
        filter: { domain: { _eq: domain } },
      })
      .items({
        single: true,
      });
  };
});
