import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Local dev convenience:
    // When frontend calls `/api/...`, Vite will forward to backend.
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
});

