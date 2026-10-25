<script setup>
import { computed, reactive } from 'vue'

// 食材清单：可以勾选"已经备好了哪些食材"
const props = defineProps({
  ingredients: { type: Array, required: true },
})

// reactive 数组：记录每一项食材有没有被勾选
const checked = reactive(props.ingredients.map(() => false))

// 计算属性：已备齐的数量，实时统计
const doneCount = computed(() => checked.filter(Boolean).length)
</script>

<template>
  <div class="ingredient-list">
    <h3>🧺 食材清单（已备 {{ doneCount }}/{{ checked.length }}）</h3>
    <label v-for="(item, index) in ingredients" :key="item.name" class="ing">
      <input type="checkbox" v-model="checked[index]" />
      <span :class="{ done: checked[index] }">{{ item.name }}（{{ item.amount }}）</span>
    </label>
  </div>
</template>

<style scoped>
h3 {
  font-size: 16px;
  margin-bottom: 12px;
}

.ing {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 0;
  border-bottom: 1px dashed #eee;
  cursor: pointer;
}

.ing input {
  accent-color: #ff8c42;
}

.done {
  color: #bbb;
  text-decoration: line-through;
}
</style>
