/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- NETLIFY TEMPORARY HOSTING CONFIG ---
  // To return to standard dynamic hosting (e.g. Vercel SSR), simply comment out or delete the next line:
  output: "export",
  // ----------------------------------------
  
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
