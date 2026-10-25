<script setup>
import { useFavorites } from '../composables/useFavorites'

// 导航栏也读取全局的收藏数量，收藏一变这里会自动更新
const { count } = useFavorites()
</script>

<template>
  <nav class="nav">
    <div class="container nav-inner">
      <router-link to="/" class="logo">🍳 家常菜谱小站</router-link>
      <div class="links">
        <router-link to="/">首页</router-link>
        <router-link to="/recipes">全部菜谱</router-link>
        <router-link to="/favorites">我的收藏</router-link>
      </div>
      <span class="fav-count">⭐ 已收藏 {{ count }} 道</span>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 56px;
}

.logo {
  font-weight: 700;
  font-size: 18px;
}

.links {
  display: flex;
  gap: 16px;
}

.links a {
  padding: 4px 2px;
  color: #666;
}

.links a:hover {
  color: #ff8c42;
}

/* router-link 激活时自带的 class，用来高亮当前页面 */
.links a.router-link-active {
  color: #ff8c42;
  font-weight: 600;
  border-bottom: 2px solid #ff8c42;
}

.fav-count {
  margin-left: auto;
  color: #999;
  font-size: 13px;
}
</style>
