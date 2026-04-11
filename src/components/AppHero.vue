<template>
  <section class="hero">
    <div class="container hero__content">
      <h1 class="hero__title">{{ title }}</h1>
      <p class="hero__subtitle">{{ subtitle }}</p>
      <div class="hero__actions">
        <button class="btn btn-primary">开始体验</button>
        <button class="btn btn-outline">了解更多</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
}
withDefaults(defineProps<Props>(), {
  title: '构建您的下一代官网',
  subtitle: '快速、现代、响应式 – 使用 Vue 3 + TypeScript + Less'
})
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.hero {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: @spacing-xl 0;
  text-align: center;
}
.hero__title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: @spacing-md;
}
.hero__subtitle {
  font-size: 1.25rem;
  color: #4b5563;
  max-width: 600px;
  margin: 0 auto @spacing-lg;
}
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  margin: 0 @spacing-sm;
}
.btn-primary {
  background: @primary-color;
  color: white;
  &:hover { background: darken(@primary-color, 10%); }
}
.btn-outline {
  background: transparent;
  border: 2px solid @primary-color;
  color: @primary-color;
  &:hover {
    background: @primary-color;
    color: white;
  }
}
@media (max-width: @screen-md) {
  .hero__title { font-size: 2rem; }
  .hero__subtitle { font-size: 1rem; }
}
</style>