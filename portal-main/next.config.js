//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  publicRuntimeConfig: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    CDN_URL: process.env.CDN_URL,
    API_RESOURCE_BASE_URL: process.env.NEXT_PUBLIC_API_RESOURCE_BASE_URL
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
