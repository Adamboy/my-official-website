<template>
  <div class="detail-page">
    <SceneBanner :title="scenario.title" :subtitle="scenario.subtitle" watermark="DETAIL" />
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">首页</router-link>
        <span class="divider">/</span>
        <router-link to="/">应用场景</router-link>
        <span class="divider">/</span>
        <span>{{ scenario.title }}</span>
      </div>

      <div class="detail-intro">
        <div class="intro-card">
          <p>{{ scenario.intro }}</p>
        </div>
      </div>

      <div class="detail-layout">
        <section
          v-for="(section, idx) in scenario.sections"
          :key="section.label"
          class="detail-block"
          :class="{ reverse: Number(idx) % 2 === 1 }"
        >
          <div class="detail-image">
            <img :src="section.image" :alt="section.title" class="img-rotate" loading="lazy" />
          </div>
          <div class="detail-text">
            <span class="section-label">{{ section.label }}</span>
            <h2>{{ section.title }}</h2>
            <p>{{ section.text }}</p>
            <ul v-if="section.points && section.points.length">
              <li v-for="(item, index) in section.points" :key="index">{{ item }}</li>
            </ul>
          </div>
        </section>
      </div>

      <div class="detail-cta">
        <div class="cta-copy">
          <h2>选择无人机吊运，开启高效施工新方式</h2>
          <p>我们为复杂场景提供专业空运方案，减少人工转运，缩短施工周期，提升安全可控性。</p>
        </div>
        <router-link to="/" class="btn btn-primary">立即咨询</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import SceneBanner from '../components/SceneBanner.vue'
import scenarios from '@/data/scenarios.ts'
import { getApplicationCase } from '../api/article'

// API 基础地址配置（与原代码保持一致）
const API_BASE_URL = import.meta.env.VITE_STRAPI_URL || (import.meta.env.DEV ? 'http://localhost:1337' : '')

const route = useRoute()
const id = String(route.params.id)

// 静态数据作为基准（包含所有文字内容和占位图片）
const scenario = ref((scenarios as any)[id] || (scenarios as any)['city-old'])

// 将 Strapi 媒体对象转换为完整 URL
function getFullImageUrl(imageObj: any): string {
  if (!imageObj) return ''
  // 如果已经是字符串（静态占位图），直接返回
  if (typeof imageObj === 'string') return imageObj
  // Strapi 媒体对象：取 url 字段并拼接域名
  if (imageObj.url) {
    return imageObj.url.startsWith('http') ? imageObj.url : `${API_BASE_URL}${imageObj.url}`
  }
  return ''
}

// 获取接口图片并静默替换
onMounted(async () => {
  try {
    const response = await getApplicationCase({ type: id })
    const apiItem = response?.data?.[0]
    if (apiItem && apiItem.disadvantageUrl && apiItem.advantagesUrl) {
      // 深拷贝静态数据，避免直接修改原对象
      const newScenario = JSON.parse(JSON.stringify(scenario.value))
      if (newScenario.sections && newScenario.sections.length >= 2) {
        newScenario.sections[0].image = getFullImageUrl(apiItem.disadvantageUrl)
        newScenario.sections[1].image = getFullImageUrl(apiItem.advantagesUrl)
        scenario.value = newScenario
      }
    }
  } catch (e) {
    // 静默失败，继续使用静态数据中的占位图片，不影响页面展示
    console.warn('获取场景图片失败，使用默认图片', e)
  }
})
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.detail-page {
  padding: @spacing-lg 0;
}
.detail-intro,
.detail-block {
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}
.detail-block:nth-child(odd) {
  animation-name: fadeInLeft;
}
.detail-block:nth-child(even) {
  animation-name: fadeInRight;
}
.breadcrumb {
  margin-bottom: @spacing-lg;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  color: #6b7280;
}
.breadcrumb a {
  color: @primary-color;
  text-decoration: none;
  transition: color 0.2s ease;
}
.breadcrumb a:hover {
  color: darken(@primary-color, 10%);
}
.divider {
  color: #cbd5e1;
}
.detail-intro {
  margin-bottom: @spacing-xl;
  max-width: 860px;
}
.intro-card {
  padding: 2rem 2.5rem;
  border-radius: 1.5rem;
  background: #f8fbff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
}
.intro-card p {
  margin: 0;
  color: #475569;
  line-height: 1.9;
  font-size: 1rem;
}
.detail-layout {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
.detail-block {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  grid-template-areas: 'image text';
  gap: @spacing-xl;
  align-items: center;
}
.detail-block.reverse {
  grid-template-columns: 0.9fr 1.1fr;
  grid-template-areas: 'text image';
}
.detail-image {
  grid-area: image;
}
.detail-text {
  grid-area: text;
  padding: 0.5rem 0;
}
.detail-image img {
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
}
.img-rotate {
  width: 100%;
  border-radius: 12px;
  transition: transform 0.4s ease;
}
.detail-block:not(.reverse) .img-rotate:hover {
  transform: rotate(-2deg) scale(1.05);
}
.detail-block.reverse .img-rotate:hover {
  transform: rotate(-2deg) scale(1.05);
}
.section-label {
  display: inline-block;
  margin-bottom: 1rem;
  color: @primary-color;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.detail-text h2 {
  margin: 0 0 1rem;
  font-size: clamp(1.75rem, 2.2vw, 2.1rem);
  line-height: 1.2;
  color: #0f172a;
}
.detail-text p {
  margin: 0 0 1rem;
  color: #475569;
  line-height: 1.75;
}
.detail-text ul {
  list-style: disc;
  padding-left: @spacing-lg;
  margin: 0;
  color: #475569;
}
.detail-text ul li {
  margin-bottom: 0.9rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: @screen-md) {
  .detail-block,
  .detail-block.reverse {
    grid-template-columns: 1fr;
    grid-template-areas: 'image' 'text';
  }
  .detail-text {
    padding-top: 1rem;
  }
}

.detail-cta {
  margin-top: 3rem;
  padding: 2rem;
  background: linear-gradient(180deg, rgba(59, 130, 246, 0.08), rgba(14, 165, 233, 0.04));
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.cta-copy h2 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.7rem, 2.5vw, 2.4rem);
  line-height: 1.05;
  color: #0f172a;
}

.cta-copy p {
  margin: 0;
  max-width: 760px;
  color: #475569;
  line-height: 1.8;
}

@media (max-width: @screen-md) {
  .detail-cta {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>