import { ref, computed, watch } from 'vue'

const KEY = 'recipe-favorites'

function readFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch (e) {
    // localStorage 数据损坏时退回空数组，避免页面崩溃
    return []
  }
}

// 这些代码写在模块顶层，只会执行一次：
// 所有组件调用 useFavorites() 拿到的都是同一份收藏数据（单例状态）
const favorites = ref(readFromStorage())

// 侦听器：收藏一变化就自动写回 localStorage，刷新页面也不会丢
watch(
  favorites,
  (val) => {
    localStorage.setItem(KEY, JSON.stringify(val))
  },
  { deep: true }
)

// 组合式函数：把"收藏"相关的状态和操作封装在一起，供多个组件复用
export function useFavorites() {
  // 计算属性：收藏数量
  const count = computed(() => favorites.value.length)

  function has(id) {
    return favorites.value.includes(id)
  }

  function toggle(id) {
    if (has(id)) {
      favorites.value = favorites.value.filter((item) => item !== id)
    } else {
      favorites.value.push(id)
    }
  }

  function clear() {
    favorites.value = []
  }

  return { favorites, count, has, toggle, clear }
}
