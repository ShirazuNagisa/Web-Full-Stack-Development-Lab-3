import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RecipesPage from '../views/RecipesPage.vue'
import RecipeDetailPage from '../views/RecipeDetailPage.vue'
import FavoritesPage from '../views/FavoritesPage.vue'

// 路由表：一个路径对应一个页面组件
// 其中 /recipes/:id 是动态路由，id 会随菜谱变化
const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/recipes', name: 'recipes', component: RecipesPage },
  { path: '/recipes/:id', name: 'recipe-detail', component: RecipeDetailPage },
  { path: '/favorites', name: 'favorites', component: FavoritesPage },
]

const router = createRouter({
  // BASE_URL 来自 vite.config.js 的 base 配置，本地开发时是 “/”，
  // 部署到 GitHub Pages 时是 “/Web-Full-Stack-Development-Lab-3/”
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
