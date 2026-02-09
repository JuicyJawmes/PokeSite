// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:8081",
//         changeOrigin: true,
//       },
//     },
//   },
// });
import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_PROXY || "http://backend:8080",
        changeOrigin: true,
      },
    },
  },
};
