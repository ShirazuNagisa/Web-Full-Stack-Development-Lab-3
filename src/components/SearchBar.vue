<script setup>
import { onMounted, ref } from 'vue'

// 在自定义组件上使用 v-model：
// 父组件写 v-model="keyword" 时，等价于传入 modelValue 属性 +
// 监听 update:modelValue 事件，所以这里要按这个约定实现
defineProps({
  modelValue: { type: String, default: '' },
})
defineEmits(['update:modelValue'])

// 模板引用：拿到 input 的真实 DOM 元素
const input = ref(null)

// 生命周期钩子：组件挂载后自动聚焦搜索框
onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <div class="search-bar">
    <input
      ref="input"
      class="input"
      type="text"
      placeholder="搜索菜谱名称…"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button v-if="modelValue" class="btn btn-outline" @click="$emit('update:modelValue', '')">
      清空
    </button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.search-bar .input {
  flex: 1;
}
</style>
