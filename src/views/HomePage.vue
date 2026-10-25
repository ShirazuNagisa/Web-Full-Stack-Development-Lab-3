<script setup>
import { computed } from 'vue'
import HeroBanner from '../components/HeroBanner.vue'
import RecipeCard from '../components/RecipeCard.vue'
import { recipes } from '../data/recipes'

// 计算属性：评分最高的 3 道菜作为"今日推荐"
const topRecipes = computed(() =>
  [...recipes].sort((a, b) => b.rating - a.rating).slice(0, 3)
)

// 站点小统计：用 reduce 汇总所有菜谱的数据
const totalIngredients = computed(() =>
  recipes.reduce((sum, r) => sum + r.ingredients.length, 0)
)
const totalComments = computed(() =>
  recipes.reduce((sum, r) => sum + r.comments.length, 0)
)
</script>

<template>
  <main class="page container">
    <!-- 横幅组件：按钮通过默认插槽传进去 -->
    <HeroBanner title="🍳 家常菜谱小站" subtitle="记录 8 道简单好吃的家常菜，今天也好好吃饭！">
      <router-link to="/recipes" class="btn">去看看全部菜谱 →</router-link>
    </HeroBanner>

    <h2 class="page-title">🔥 今日推荐</h2>
    <div class="card-grid">
      <RecipeCard v-for="r in topRecipes" :key="r.id" :recipe="r" />
    </div>

    <section class="stats">
      <div>
        <strong>{{ recipes.length }}</strong>
        <span>道菜谱</span>
      </div>
      <div>
        <strong>{{ totalIngredients }}</strong>
        <span>种食材</span>
      </div>
      <div>
        <strong>{{ totalComments }}</strong>
        <span>条留言</span>
      </div>
    </section>
  </main>
</template>

<style scoped>
.stats {
  display: flex;
  gap: 16px;
  margin-top: 28px;
}

.stats > div {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  text-align: center;
  padding: 18px;
}

.stats strong {
  display: block;
  font-size: 24px;
  color: #ff7322;
}

.stats span {
  color: #999;
  font-size: 13px;
}
</style>
