import { copyFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Vite 配置：注册 Vue 插件，用于编译 .vue 单文件组件
export default defineConfig({
  // GitHub Pages 把网站部署在“仓库名”子路径下，
  // 必须设置 base，否则线上加载 JS/CSS 资源会 404
  base: '/Web-Full-Stack-Development-Lab-3/',
  plugins: [
    vue(),
    // 构建后把 index.html 复制一份命名为 404.html：
    // GitHub Pages 找不到路径时会返回 404.html，页面加载后由 vue-router 接管，
    // 这样刷新深层路由（如 /recipes/1）就不会 404
    {
      name: 'copy-404-for-pages',
      apply: 'build',
      closeBundle() {
        copyFileSync('dist/index.html', 'dist/404.html')
      },
    },
  ],
})
