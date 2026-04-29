<template>
  <section class="hero">
    <div class="container hero__content">
      <h1 class="hero__title">{{ title }}</h1>
      <p class="hero__subtitle">{{ subtitle }}</p>
      <div class="hero__actions">
        <button class="btn btn-primary">立即咨询</button>
        <button class="btn btn-outline">查看服务</button>
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
  title: '无人机空中吊运，打通高空最后一公里',
  subtitle: '专业无人机吊运公司，复杂场景快速响应、安全精准、低扰动施工'
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
  &:hover {
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    color: white;
  }
}
.btn-outline {
  background: transparent;
  border: 2px solid @primary-color;
  color: @primary-color;
  &:hover {
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    color: white;
    border-color: transparent;
  }
}
@media (max-width: @screen-md) {
  .hero__title { font-size: 2rem; }
  .hero__subtitle { font-size: 1rem; }
}
</style>