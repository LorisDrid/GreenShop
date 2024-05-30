/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:5000',
    },
    webpack: (config, options) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/pages': `${options.dir}/src/app/pages`,
      };
      return config;
    },
  };
  
  export default nextConfig;