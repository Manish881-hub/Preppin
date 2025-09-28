import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::", // Listen on all network interfaces (IPv4 and IPv6)
    port: 3000, // Use port 3000
  },
  plugins: [
    react(), // Use the React plugin with SWC for fast builds
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Path alias for imports
    },
  },
});