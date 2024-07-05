/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  images: {
    domains: ["api.dicebear.com", "ui-avatars.com"],
  },
};
