/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true, // Required for static export
  },
  // Enable static export for GitHub Pages
  output: process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT === 'true' ? 'export' : undefined,
  // Base path for GitHub Pages (if using repository name as subdirectory)
  basePath: process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '',
  // Trailing slash for GitHub Pages
  trailingSlash: true,
}

module.exports = nextConfig

