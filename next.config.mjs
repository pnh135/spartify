/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "wbbxeuloxzmatnfryegy.supabase.co",
        // port: "",
        // // pathname: "/storage/v1/object/public/user-image/**",
        // pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "unsplash.com", // 추가할 도메인
        pathname: "/photos/**", // 이미지 경로를 적절히 설정
      },
    ],
  },
};

export default nextConfig;
