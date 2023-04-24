/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;

// const withTM = require("next-transpile-modules")(["@/*"]);

// module.exports = withTM({
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = { fs: false };
//     }
//     return config;
//   },
// });
