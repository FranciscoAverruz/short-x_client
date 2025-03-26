/* eslint-disable no-undef */
import path from "path";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 256,
      deleteOriginFile: false,
    }),
    compression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 512,
    }),
  ],
  resolve: {
    alias: {
      "@public": path.resolve(__dirname, "/"),
      "@src": path.resolve(__dirname, "src/"),
      // components
      "@atoms": path.resolve(__dirname, "src/components/atoms"),
      "@molecules": path.resolve(__dirname, "src/components/molecules"),
      "@organisms": path.resolve(__dirname, "src/components/organisms"),
      // features
      "@auth": path.resolve(__dirname, "src/features/auth"),
      "@dashboard": path.resolve(__dirname, "src/features/dashboard"),
      "@dashPage": path.resolve(__dirname, "src/features/dashboard/pages"),
      "@dashComp": path.resolve(__dirname, "src/features/dashboard/components"),
      "@myAccount": path.resolve(__dirname, "src/features/dashboard/components/myAccount"),
      "@dashNavBar": path.resolve(__dirname, "src/features/dashboard/components/dashNavBar"),
      "@dashSideBar": path.resolve(__dirname, "src/features/dashboard/components/dashSideBar"),
      "@dashDomains": path.resolve(__dirname, "src/features/dashboard/components/domains"),
      "@dashSubscription": path.resolve(__dirname, "src/features/dashboard/components/subscription"),
      "@dashCommon": path.resolve(__dirname, "src/features/dashboard/common"),
      "@dashCharts": path.resolve(__dirname, "src/features/dashboard/charts"),
      "@urlShortener": path.resolve(__dirname, "src/features/urlShortener"),
      "@common": path.resolve(__dirname, "src/components/common"),
      "@home": path.resolve(__dirname, "src/features/home"),
      "@homeSections": path.resolve(__dirname, "src/features/home/sections"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@context": path.resolve(__dirname, "src/context"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
  build: {
    outDir: "dist",
    minify: "esbuild",
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
