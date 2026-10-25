<script setup>
import { computed } from 'vue'
import RatingStars from './RatingStars.vue'

// 菜谱卡片：数据由父组件通过 props 传入
const props = defineProps({
  recipe: { type: Object, required: true },
})

// 计算属性：最多展示两个标签，避免卡片太挤
const briefTags = computed(() => props.recipe.tags.slice(0, 2).join(' / '))
</script>

<template>
  <router-link :to="`/recipes/${recipe.id}`" class="card">
    <span class="diff">{{ recipe.difficulty }}</span>
    <span class="emoji">{{ recipe.emoji }}</span>
    <h3>{{ recipe.name }}</h3>
    <p class="brief">{{ briefTags }}</p>
    <div class="meta">
      <RatingStars :rating="recipe.rating" />
      <span>⏱ {{ recipe.time }} 分钟</span>
    </div>
  </router-link>
</template>

<style scoped>
.card {
  display: block;
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  position: relative;
  transition: transform 0.15s, box-shadow 0.15s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.emoji {
  font-size: 44px;
}

h3 {
  margin: 8px 0 4px;
}

.brief {
  color: #b05b1b;
  font-size: 12px;
  margin-bottom: 10px;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #888;
}

.diff {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #fff4ec;
  color: #ff7322;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 12px;
}
</style>
