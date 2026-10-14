/** @type {import('next').NextConfig} */
// Static export for GitHub Pages.
// User site (guru-prasath-j.github.io): leave BASE_PATH empty.
// Project site (github.io/portfolio): set BASE_PATH=/portfolio in the workflow.
const basePath = process.env.BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: true,
};

export default nextConfig;
