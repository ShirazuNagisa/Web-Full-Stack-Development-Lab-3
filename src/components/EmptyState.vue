<script setup>
// 空状态提示：默认文案可用 text 属性覆盖，插槽里可以放按钮等操作
defineProps({
  text: { type: String, default: '这里空空如也~' },
})
</script>

<template>
  <div class="empty">
    <p class="emoji">🍽️</p>
    <p>{{ text }}</p>
    <div class="extra">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.empty {
  text-align: center;
  padding: 56px 0;
  color: #999;
}

.emoji {
  font-size: 44px;
  margin-bottom: 10px;
}

.extra {
  margin-top: 14px;
}
</style>
