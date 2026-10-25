<script setup>
import { computed, ref } from 'vue'

// 分步做菜：用"上一步/下一步"逐步展示烹饪步骤
const props = defineProps({
  steps: { type: Array, required: true },
})

const current = ref(0)
const total = computed(() => props.steps.length)
const finished = computed(() => current.value >= total.value)

function prev() {
  if (current.value > 0) current.value--
}

function next() {
  if (current.value < total.value) current.value++
}
</script>

<template>
  <div class="step-list">
    <h3>👨‍🍳 烹饪步骤</h3>

    <!-- 条件渲染：v-if / v-else 在"做菜中"和"已完成"两种状态间切换 -->
    <template v-if="!finished">
      <p class="step-no">第 {{ current + 1 }} / {{ total }} 步</p>
      <p class="step-text">{{ steps[current] }}</p>
      <!-- v-show：只是显示/隐藏，元素始终存在 -->
      <p v-show="current === total - 1" class="hint">这是最后一步啦，加油！</p>
      <div class="actions">
        <button class="btn btn-outline" :disabled="current === 0" @click="prev">上一步</button>
        <button class="btn" @click="next">下一步</button>
      </div>
    </template>

    <template v-else>
      <p class="finish">🎉 全部步骤完成，开吃！</p>
      <button class="btn btn-outline" @click="current = 0">↺ 再做一遍</button>
    </template>
  </div>
</template>

<style scoped>
h3 {
  font-size: 16px;
  margin-bottom: 12px;
}

.step-no {
  color: #ff8c42;
  font-weight: 600;
  margin-bottom: 8px;
}

.step-text {
  background: #fff;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 12px;
  line-height: 1.7;
}

.hint {
  color: #999;
  font-size: 12px;
  margin-bottom: 12px;
}

.actions {
  display: flex;
  gap: 10px;
}

.finish {
  font-weight: 600;
  margin-bottom: 12px;
}
</style>
