<script setup>
import { computed } from 'vue'

// 评分星星：接收一个 0~5 的评分数字
const props = defineProps({
  rating: { type: Number, required: true },
})

// 计算属性：根据评分生成"实心星 + 空心星"的字符串
const stars = computed(() => {
  const full = Math.round(props.rating)
  return '★'.repeat(full) + '☆'.repeat(5 - full)
})
</script>

<template>
  <span class="stars" :title="`评分 ${rating} 分`">{{ stars }}</span>
</template>

<style scoped>
.stars {
  color: #ffb400;
  letter-spacing: 2px;
}
</style>
