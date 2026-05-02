import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vue 核心及生态
          if (/[\\/]node_modules[\\/](vue|@vue|vue-router|pinia|@vueuse)[\\/]/.test(id)) {
            return 'vendor-vue';
          }
          // UI 库单独拆分
          if (id.includes('element-plus')) return 'vendor-element';
          if (id.includes('echarts')) return 'vendor-echarts';
          // 其余 node_modules 依赖
          if (id.includes('node_modules')) return 'vendor-lib';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 500, // 调高阈值
  },
});