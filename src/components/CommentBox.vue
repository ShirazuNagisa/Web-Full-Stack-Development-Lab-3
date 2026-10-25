<script setup>
import { ref } from 'vue'

// 留言输入框：填好后通过 submit 事件把新留言发给父组件
const emit = defineEmits(['submit'])

const author = ref('')
const text = ref('')
const error = ref('')

function submit() {
  if (!text.value.trim()) {
    error.value = '留言内容不能为空哦'
    return
  }
  error.value = ''
  emit('submit', {
    author: author.value.trim() || '匿名小厨',
    text: text.value.trim(),
  })
  // 发送成功后清空输入框
  author.value = ''
  text.value = ''
}
</script>

<template>
  <!-- 事件修饰符 .prevent：阻止表单默认的提交跳转 -->
  <form class="comment-box" @submit.prevent="submit">
    <input class="input" v-model="author" placeholder="你的昵称（可留空）" />
    <textarea class="input" v-model="text" rows="3" placeholder="做完了吗？留下你的心得…"></textarea>
    <p v-if="error" class="error">{{ error }}</p>
    <button class="btn" type="submit">发表留言</button>
  </form>
</template>

<style scoped>
.comment-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.comment-box .btn {
  align-self: flex-start;
}

.error {
  color: #e74c3c;
  font-size: 13px;
}
</style>
