import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forwards to `npm run server` (the Express backend) during local dev.
      "/api": "http://localhost:3001",
    },
  },
});
