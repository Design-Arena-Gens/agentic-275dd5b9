import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@components': path.join(__dirname, 'components'),
      '@store': path.join(__dirname, 'store'),
      '@utils': path.join(__dirname, 'utils'),
    }
    return config
  },
}

export default nextConfig
