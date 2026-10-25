<script setup>
// 确认弹窗：用 v-if 控制显示；标题用具名插槽，正文用默认插槽
defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '提示' },
})
defineEmits(['cancel', 'confirm'])
</script>

<template>
  <div v-if="show" class="mask" @click.self="$emit('cancel')">
    <div class="modal">
      <h3>
        <slot name="title">{{ title }}</slot>
      </h3>
      <div class="body">
        <slot>确定要执行这个操作吗？</slot>
      </div>
      <div class="actions">
        <button class="btn btn-outline" @click="$emit('cancel')">取消</button>
        <button class="btn btn-danger" @click="$emit('confirm')">确定</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background: #fff;
  border-radius: 12px;
  padding: 22px;
  width: 320px;
}

h3 {
  margin-bottom: 10px;
}

.body {
  color: #555;
  line-height: 1.6;
  margin-bottom: 18px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
