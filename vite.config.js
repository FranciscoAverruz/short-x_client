/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "brotliCompress", // Usa Brotli (más eficiente que Gzip)
      ext: ".br", // Extensión del archivo comprimido
      threshold: 256, // Comprime archivos mayores a 256 bytes
      deleteOriginFile: false, // No eliminar archivos originales
    }),
    compression({
      algorithm: "gzip", // También usar Gzip
      ext: ".gz",
      threshold: 512, // Ajusta este valor si es necesario
    }),
  ],
  resolve: {
    alias: {
      '@public': path.resolve(__dirname, '/'),
      '@src': path.resolve(__dirname, 'src/'),
      // componentes
      '@atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@organisms': path.resolve(__dirname, 'src/components/organisms'),
      // características
      '@auth': path.resolve(__dirname, 'src/features/auth'),
      '@dashboard': path.resolve(__dirname, 'src/features/dashboard'),
      '@dashPage': path.resolve(__dirname, 'src/features/dashboard/pages'),
      '@dashComp': path.resolve(__dirname, 'src/features/dashboard/components'),
      '@dashNavBar': path.resolve(__dirname, 'src/features/dashboard/components/dashNavBar'),
      '@dashSideBar': path.resolve(__dirname, 'src/features/dashboard/components/dashSideBar'),
      '@myAccount': path.resolve(__dirname, 'src/features/dashboard/components/myAccount'),
      '@dashCommon': path.resolve(__dirname, 'src/features/dashboard/common'),
      '@dashCharts': path.resolve(__dirname, 'src/features/dashboard/charts'),
      '@urlShortener': path.resolve(__dirname, 'src/features/urlShortener'),
      '@common': path.resolve(__dirname, 'src/components/common'),
      '@home': path.resolve(__dirname, 'src/features/home'),
      '@homeSections': path.resolve(__dirname, 'src/features/home/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  build: {
    outDir: 'dist', 
    minify: 'esbuild',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600, // Ajuste de límite de chunk
    rollupOptions: {
      treeshake: true, 
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
})


// /* eslint-disable no-undef */
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'
// import compression from "vite-plugin-compression";

// export default defineConfig({
//   plugins: [
//     react(),
//     compression({
//       algorithm: "brotliCompress", // Usa Brotli (más eficiente que Gzip)
//       ext: ".br", // Extensión del archivo comprimido
//       threshold: 256, // Comprime archivos mayores a 1KB
//       deleteOriginFile: false, // No eliminar archivos originales
//     }),
//     compression({
//       algorithm: "gzip", // También usar Gzip
//       ext: ".gz",
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@public': path.resolve(__dirname, '/'),
//       '@src': path.resolve(__dirname, 'src/'),
//       // components
//       '@atoms': path.resolve(__dirname, 'src/components/atoms'),
//       '@molecules': path.resolve(__dirname, 'src/components/molecules'),
//       '@organisms': path.resolve(__dirname, 'src/components/organisms'),
//       // features
//       '@auth': path.resolve(__dirname, 'src/features/auth'),
//       '@dashboard': path.resolve(__dirname, 'src/features/dashboard'),
//       '@dashPage': path.resolve(__dirname, 'src/features/dashboard/pages'),
//       '@dashComp': path.resolve(__dirname, 'src/features/dashboard/components'),
//       '@dashNavBar': path.resolve(__dirname, 'src/features/dashboard/components/dashNavBar'),
//       '@dashSideBar': path.resolve(__dirname, 'src/features/dashboard/components/dashSideBar'),
//       '@myAccount': path.resolve(__dirname, 'src/features/dashboard/components/myAccount'),
//       '@dashCommon': path.resolve(__dirname, 'src/features/dashboard/common'),
//       '@urlShortener': path.resolve(__dirname, 'src/features/urlShortener'),
//       '@common': path.resolve(__dirname, 'src/components/common'),
//       '@home': path.resolve(__dirname, 'src/features/home'),
//       '@homeSections': path.resolve(__dirname, 'src/features/home/components'),
//       '@assets': path.resolve(__dirname, 'src/assets'),
//       '@context': path.resolve(__dirname, 'src/context'),
//       '@hooks': path.resolve(__dirname, 'src/hooks'),
//       '@layouts': path.resolve(__dirname, 'src/layouts'),
//       '@pages': path.resolve(__dirname, 'src/pages'),
//       '@services': path.resolve(__dirname, 'src/services'),
//       '@utils': path.resolve(__dirname, 'src/utils'),
//     },
//   },
//   build: {
//     outDir: 'dist', 
//     minify: 'esbuild',
//     assetsInlineLimit: 4096,
//     rollupOptions: {
//       treeshake: true, 
//   },
//   },
  
// })
