/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s.gravatar.com",
      "lh3.googleusercontent.com",
      "media.geeksforgeeks.org",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
