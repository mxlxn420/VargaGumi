import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev szerver elérése telefonról a helyi hálózaton
  allowedDevOrigins: ['192.168.1.*'],
};

export default nextConfig;
