import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {},
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "src/Hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@store": path.resolve(__dirname, "src/Store"),
      "@theme": path.resolve(__dirname, "src/Theme"),
      "@common": path.resolve(__dirname, "src/Common"),
      "@modules": path.resolve(__dirname, "src/Modules"),
      "@config": path.resolve(__dirname, "src/config.js"),
      "@constants": path.resolve(__dirname, "src/constants"),
    },
  },
});
