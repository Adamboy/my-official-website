<template>
  <section class="scene-banner">
    <div class="banner-content">
      <span class="watermark">{{ bannerWatermark }}</span>
      <h1 class="main-title">{{ bannerTitle }}</h1>
      <p class="sub-title">{{ bannerSubtitle }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

type BannerMeta = {
  title?: string
  subtitle?: string
  watermark?: string
}

const props = defineProps<BannerMeta>()

const route = useRoute()

const defaultMeta: Record<string, BannerMeta> = {
  home: {
    title: '应用场景',
    subtitle: '无人机空吊绞盘专业开发商',
    watermark: 'APPLICATION'
  },
  detail: {
    title: '详情页面',
    subtitle: `当前产品编号：${route.params.id ?? ''}`,
    watermark: 'DETAIL'
  }
}

const effectiveMeta = computed(() => {
  const routeName = String(route.name ?? 'home')
  const routeMeta: BannerMeta = {
    title: route.meta.title as string,
    subtitle: route.meta.subtitle as string,
    watermark: route.meta.watermark as string
  }

  return {
    title: props.title || routeMeta.title || defaultMeta[routeName]?.title || '页面标题',
    subtitle: props.subtitle || routeMeta.subtitle || defaultMeta[routeName]?.subtitle || '根据路由自动展示不同内容',
    watermark: props.watermark || routeMeta.watermark || defaultMeta[routeName]?.watermark || 'PAGE'
  }
})

const bannerTitle = computed(() => effectiveMeta.value.title)
const bannerSubtitle = computed(() => effectiveMeta.value.subtitle)
const bannerWatermark = computed(() => effectiveMeta.value.watermark)
</script>

<style lang="less" scoped>
.scene-banner {
  width: 100%;
  height: 200px;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.scene-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  opacity: 0.8;
}

.banner-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding-top: 50px;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

.watermark {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 80px;
  font-weight: 700;
  color: #eeeeee;
  opacity: 0.5;
  z-index: 1;
  user-select: none;
  pointer-events: none;
}

.main-title {
  font-size: 48px;
  font-weight: 700;
  color: black;
  margin-bottom: 16px;
  z-index: 3;
  opacity: 0;
  animation: fadeInUp 0.7s ease forwards;
  animation-delay: 0.1s;
}

.sub-title {
  font-size: 24px;
  font-weight: 400;
  color: #333333;
  z-index: 3;
  opacity: 0;
  animation: fadeInUp 0.7s ease forwards;
  animation-delay: 0.2s;
}

@media (max-width: 768px) {
  .scene-banner {
    height: 150px;
  }
  .watermark {
    font-size: 50px;
    top: 5px;
  }
  .main-title {
    font-size: 32px;
  }
  .sub-title {
    font-size: 18px;
  }
  .banner-content {
    padding-top: 40px;
  }
}

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
