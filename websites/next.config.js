//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  publicRuntimeConfig: {
    publicUrl: process.env.PUBLIC_URL,
    cdnBaseUrl: process.env.CDN_BASE_URL,
    resourceBaseUrl: process.env.API_RESOURCE_BASE_URL,
    gtmId: process.env.GOOGLE_TAG_MANAGER_ID,
  },
  serverRuntimeConfig: {
    directus: {
      url: process.env.BACKEND_URL,
      staticToken: process.env.BACKEND_TOKEN,
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.bolselkab.go.id',
      },
    ],
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
