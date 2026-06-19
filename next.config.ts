import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://wa.me;
  font-src 'self' data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://wa.me;
  frame-ancestors 'none';
  frame-src 'self' https://calendly.com https://*.calendly.com https://tidycal.com https://*.tidycal.com;
  block-all-mixed-content;
  upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Hides the "X-Powered-By: Next.js" header to prevent framework fingerprinting
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
          },
          // Clickjacking protection: Prevent the site from being loaded inside an iframe on external sites
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // MIME Sniffing protection: Force browser to adhere to the MIME type sent by server
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Prevent referral leak of sensitive URLs
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Restrict browser feature authorizations for safety
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Strict Transport Security (HSTS): Enforce secure connection (HTTPS)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Retroactive XSS Filter shield
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
