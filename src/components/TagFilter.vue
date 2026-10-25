<script setup>
// 标签筛选：同样支持组件级 v-model（选中标签的数组）
const props = defineProps({
  tags: { type: Array, required: true },
  modelValue: { type: Array, required: true },
})
const emit = defineEmits(['update:modelValue'])

function toggle(tag) {
  if (props.modelValue.includes(tag)) {
    // 已经选中：从数组里去掉
    emit('update:modelValue', props.modelValue.filter((t) => t !== tag))
  } else {
    // 未选中：加入数组（注意要生成新数组，不能直接改 props）
    emit('update:modelValue', [...props.modelValue, tag])
  }
}
</script>

<template>
  <div class="tag-filter">
    <button
      v-for="tag in tags"
      :key="tag"
      class="tag"
      :class="{ active: modelValue.includes(tag) }"
      @click="toggle(tag)"
    >
      {{ tag }}
    </button>
  </div>
</template>

<style scoped>
.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.tag {
  border: 1px solid #ffb26b;
  background: #fff;
  color: #b05b1b;
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 13px;
}

.tag.active {
  background: #ff8c42;
  border-color: #ff8c42;
  color: #fff;
}
</style>
