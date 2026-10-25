<script setup>
// 根组件：负责整体布局 —— 顶部导航、中间页面内容、底部页脚
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <NavBar />
  <!-- 路由出口：当前访问的页面组件会渲染在这里 -->
  <router-view />
  <SiteFooter />
</template>
