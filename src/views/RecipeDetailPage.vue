<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RatingStars from '../components/RatingStars.vue'
import IngredientList from '../components/IngredientList.vue'
import StepList from '../components/StepList.vue'
import CommentBox from '../components/CommentBox.vue'
import CommentItem from '../components/CommentItem.vue'
import EmptyState from '../components/EmptyState.vue'
import { recipes } from '../data/recipes'
import { useFavorites } from '../composables/useFavorites'

const route = useRoute()
const { has, toggle } = useFavorites()

const recipe = ref(null)
const loading = ref(true)

// 根据路由参数 id 找到菜谱，用 setTimeout 模拟网络请求的加载过程
function loadRecipe() {
  loading.value = true
  recipe.value = null
  setTimeout(() => {
    recipe.value = recipes.find((r) => String(r.id) === String(route.params.id)) || null
    loading.value = false
  }, 300)
}

// 生命周期：第一次进入页面时加载
onMounted(loadRecipe)
// 侦听器：在两个详情页之间跳转时组件会复用，必须监听路由参数重新加载
watch(() => route.params.id, loadRecipe)

const comments = computed(() => (recipe.value ? recipe.value.comments : []))

function addComment(newComment) {
  newComment.date = new Date().toLocaleDateString('zh-CN')
  comments.value.unshift(newComment)
}
</script>

<template>
  <main class="page container">
    <!-- 三种互斥状态：加载中 / 没找到 / 正常内容 -->
    <p v-if="loading" class="loading">⏳ 菜谱加载中…</p>

    <EmptyState v-else-if="!recipe" text="没有找到这道菜，可能链接不对哦">
      <router-link to="/recipes" class="btn">返回菜谱列表</router-link>
    </EmptyState>

    <template v-else>
      <section class="detail-head">
        <span class="big-emoji">{{ recipe.emoji }}</span>
        <div>
          <h2>{{ recipe.name }}</h2>
          <p class="meta">
            <RatingStars :rating="recipe.rating" /> {{ recipe.rating }} 分 ·
            约 {{ recipe.time }} 分钟 · 难度：{{ recipe.difficulty }} ·
            {{ recipe.servings }} 人份
          </p>
          <p class="tags">
            <span v-for="t in recipe.tags" :key="t" class="tag">{{ t }}</span>
          </p>
          <button class="btn" :class="{ 'btn-outline': has(recipe.id) }" @click="toggle(recipe.id)">
            {{ has(recipe.id) ? '★ 已收藏，点击取消' : '☆ 收藏这道菜' }}
          </button>
        </div>
      </section>

      <p class="desc">{{ recipe.desc }}</p>

      <section class="two-col">
        <IngredientList :ingredients="recipe.ingredients" />
        <StepList :steps="recipe.steps" />
      </section>

      <section class="comments">
        <h3>💬 小厨留言（{{ comments.length }}）</h3>
        <CommentBox @submit="addComment" />
        <ul>
          <CommentItem v-for="(c, i) in comments" :key="i" :comment="c" />
        </ul>
      </section>
    </template>
  </main>
</template>

<style scoped>
.loading {
  text-align: center;
  padding: 60px 0;
  color: #999;
}

.detail-head {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 16px;
}

.big-emoji {
  font-size: 72px;
}

h2 {
  margin-bottom: 6px;
}

.meta {
  color: #777;
  margin-bottom: 8px;
}

.tags {
  margin-bottom: 12px;
}

.tags .tag {
  display: inline-block;
  background: #fff4ec;
  color: #b05b1b;
  border-radius: 999px;
  padding: 2px 12px;
  font-size: 12px;
  margin-right: 6px;
}

.desc {
  background: #fff;
  border-radius: 12px;
  padding: 14px 16px;
  color: #666;
  margin-bottom: 20px;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 28px;
}

.comments h3 {
  font-size: 16px;
  margin-bottom: 14px;
}

@media (max-width: 720px) {
  .two-col {
    grid-template-columns: 1fr;
  }
}
</style>
