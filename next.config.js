module.exports = {
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    //staticFolder: '/static',
    API_URL: process.env.API_URL,
  },
};
