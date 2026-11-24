const nextConfig = {
  images: { unoptimized: true },
  reactStrictMode: true,
  // Vercel sent HSTS on its own; the apps server does not (since 2026-11).
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'Strict-Transport-Security', value: 'max-age=63072000' }] }];
  },
};
export default nextConfig;
