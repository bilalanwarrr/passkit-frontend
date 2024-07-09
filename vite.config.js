/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

const env = process.env.NODE_ENV;

if (env !== "production" && env !== "development") {
  dotenv.config();
} else {
  dotenv.config({ path: `.env.${env}` });
}
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL),
      VITE_GOOGLE_MAPS_API_KEY: JSON.stringify(
        process.env.VITE_GOOGLE_MAPS_API_KEY
      ),
    },
  },
});
