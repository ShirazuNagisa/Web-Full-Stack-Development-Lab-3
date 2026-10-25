<script setup>
// 横幅组件：标题和副标题通过 props 传入，中间留了插槽方便父组件塞按钮
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <section class="hero">
    <h1>{{ title }}</h1>
    <p v-if="subtitle">{{ subtitle }}</p>
    <!-- 默认插槽：父组件写在 <HeroBanner> 标签里的内容会显示在这里 -->
    <slot></slot>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, #ffd8a8, #ffb26b);
  border-radius: 16px;
  padding: 40px 32px;
  margin-bottom: 28px;
}

.hero h1 {
  font-size: 30px;
  margin-bottom: 8px;
}

.hero p {
  color: #7a4a1d;
  margin-bottom: 16px;
}
</style>
