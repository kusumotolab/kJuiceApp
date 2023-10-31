import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 3000,
      watch: {
        // 非wslのwindowsにクローンするとファイル更新イベントが発火しないため
        usePolling: true,
      },
    },
  };
});
