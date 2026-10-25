<script setup>
import { computed, ref } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import TagFilter from '../components/TagFilter.vue'
import RecipeCard from '../components/RecipeCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { recipes } from '../data/recipes'

const keyword = ref('')
const selectedTags = ref([])

// 计算属性：汇总所有菜谱出现过的标签（去重）
const allTags = computed(() => [...new Set(recipes.flatMap((r) => r.tags))])

// 计算属性：按"关键词 + 已选标签"过滤菜谱
// 关键词或标签一变，这个列表会自动重新计算
const filteredRecipes = computed(() => {
  return recipes.filter((r) => {
    const matchKeyword = r.name.includes(keyword.value.trim())
    const matchTags = selectedTags.value.every((t) => r.tags.includes(t))
    return matchKeyword && matchTags
  })
})
</script>

<template>
  <main class="page container">
    <h2 class="page-title">📖 全部菜谱（{{ filteredRecipes.length }} 道）</h2>

    <SearchBar v-model="keyword" />
    <TagFilter v-model="selectedTags" :tags="allTags" />

    <!-- v-if / v-else：有结果就渲染卡片列表，没结果就显示空状态 -->
    <div v-if="filteredRecipes.length" class="card-grid">
      <RecipeCard v-for="r in filteredRecipes" :key="r.id" :recipe="r" />
    </div>
    <EmptyState v-else text="没有找到符合条件的菜谱，换个关键词试试吧">
      <button class="btn btn-outline" @click="keyword = ''; selectedTags = []">
        清空筛选条件
      </button>
    </EmptyState>
  </main>
</template>
