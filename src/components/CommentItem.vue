<script setup>
import { computed } from 'vue'

// 单条留言：展示数据由 props 传入
const props = defineProps({
  comment: { type: Object, required: true },
})

// 计算属性：取昵称第一个字当作头像
const avatar = computed(() => props.comment.author.slice(0, 1))
</script>

<template>
  <li class="comment-item">
    <span class="avatar">{{ avatar }}</span>
    <div class="content">
      <p class="meta">{{ comment.author }} · {{ comment.date }}</p>
      <p>{{ comment.text }}</p>
    </div>
  </li>
</template>

<style scoped>
.comment-item {
  display: flex;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px dashed #eee;
  list-style: none;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #ffb26b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.meta {
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
</style>
