<script setup>
import { computed, ref } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import EmptyState from '../components/EmptyState.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import { recipes } from '../data/recipes'
import { useFavorites } from '../composables/useFavorites'

const { favorites, clear } = useFavorites()
const showModal = ref(false)

// 计算属性：从全部菜谱里挑出被收藏的那些
const favoriteRecipes = computed(() =>
  recipes.filter((r) => favorites.value.includes(r.id))
)

function confirmClear() {
  clear()
  showModal.value = false
}
</script>

<template>
  <main class="page container">
    <div class="fav-head">
      <h2 class="page-title">⭐ 我的收藏（{{ favoriteRecipes.length }}）</h2>
      <button v-if="favoriteRecipes.length" class="btn btn-danger" @click="showModal = true">
        清空收藏
      </button>
    </div>

    <div v-if="favoriteRecipes.length" class="card-grid">
      <RecipeCard v-for="r in favoriteRecipes" :key="r.id" :recipe="r" />
    </div>
    <EmptyState v-else text="还没有收藏任何菜谱，快去逛逛吧">
      <router-link to="/recipes" class="btn">去挑几道想吃的菜 →</router-link>
    </EmptyState>

    <!-- 确认弹窗：标题用具名插槽，正文用默认插槽 -->
    <ConfirmModal :show="showModal" @cancel="showModal = false" @confirm="confirmClear">
      <template #title>⚠️ 清空收藏</template>
      确定要清空全部 {{ favoriteRecipes.length }} 个收藏吗？此操作不可恢复。
    </ConfirmModal>
  </main>
</template>

<style scoped>
.fav-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.fav-head .page-title {
  margin-bottom: 0;
}
</style>
