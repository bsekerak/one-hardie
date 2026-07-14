/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.jameshardie.com' },
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.timbertech.com' },
      { protocol: 'https', hostname: 'www.azek.com' },
      { protocol: 'https', hostname: 'www.struxure.com' },
      { protocol: 'https', hostname: 'struxure.com' },
    ],
  },
};

export default nextConfig;
