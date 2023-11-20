/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/api/calc",
      },
      {
        source: "/test",
        destination: "/api/calc",
      },
    ];
  },
};

module.exports = nextConfig;
