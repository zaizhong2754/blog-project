/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_OSS_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_OSS_HOST,
        port: process.env.NEXT_PUBLIC_OSS_PORT,
        pathname: process.env.NEXT_PUBLIC_OSS_PATH
      },
      {
        protocol: 'https',
        hostname: 'sg-blog-oss.oss-cn-beijing.aliyuncs.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'gimg2.baidu.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  // 配置客户端服务代理，解决跨域问题和确保baseURL生效
  async rewrites() {
    return [
      {
        source: '/client/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/client/:path*`
      },
      {
        source: '/baidu-ip-server/:path*',
        destination: `${process.env.NEXT_PUBLIC_BAIDU_IP_SERVER_URL}/:path*`
      },
      {
        source: '/hefeng-weather-server/:path*',
        destination: `${process.env.NEXT_PUBLIC_HEFENG_WEATHER_SERVER_URL}/:path*`
      }
    ]
  }
}

export default nextConfig
