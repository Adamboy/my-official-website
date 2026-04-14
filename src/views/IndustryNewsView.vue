<template>
  <div class="news-page">
    <SceneBanner
      title="行业新闻"
      subtitle="实时追踪空吊绞盘行业最新动态"
      watermark="NEWS"
    />

    <section class="news-section">
      <div class="news-header">
        <h2>行业观察 · 真实数据 · 前沿趋势</h2>
        <p>聚焦行业热点、技术革新与项目实践，为你提供有价值的市场参考。</p>
      </div>

      <div class="news-grid">
        <article v-for="article in news" :key="article.id" class="news-card">
          <div class="news-meta">
            <span class="news-tag">{{ article.tag }}</span>
            <span class="news-date">{{ article.date }}</span>
          </div>
          <h3>{{ article.title }}</h3>
          <p>{{ article.summary }}</p>
          <router-link :to="article.link" class="news-link">阅读全文</router-link>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SceneBanner from '../components/SceneBanner.vue'

type NewsItem = {
  id: number
  tag: string
  date: string
  title: string
  summary: string
  link: string
}

const news: NewsItem[] = [
  {
    id: 1,
    tag: '技术升级',
    date: '2026-04-10',
    title: '智能绞盘系统助力无人机吊运进入新阶段',
    summary: '通过自动化控制与远程监测，绞盘作业精度进一步提升，行业施工效率显著提高。',
    link: '/detail/1'
  },
  {
    id: 2,
    tag: '市场热点',
    date: '2026-04-08',
    title: '城市旧楼改造需求推动空吊服务快速增长',
    summary: '在改造施工周期缩短背景下，轻量级空吊绞盘成为城市施工首选方案。',
    link: '/detail/2'
  },
  {
    id: 3,
    tag: '案例分享',
    date: '2026-04-05',
    title: '高层住宅吊装项目：安全与速度如何兼得？',
    summary: '结合真实项目总结施工要点，保障高层吊装过程中的稳定与高效。',
    link: '/detail/3'
  }
]
</script>

<style lang="less" scoped>
.news-page {
  background: #f8fbff;
  min-height: 100vh;
}

.news-section {
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.news-header {
  text-align: center;
  margin-bottom: 2rem;
}

.news-header h2 {
  font-size: clamp(2rem, 2.4vw, 2.8rem);
  margin-bottom: 0.75rem;
  color: #0f172a;
}

.news-header p {
  max-width: 760px;
  margin: 0 auto;
  color: #475569;
  line-height: 1.8;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(260px, 1fr));
  gap: 1.5rem;
}

.news-card {
  padding: 1.8rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(59, 130, 246, 0.16);
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.news-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 38px 90px rgba(15, 23, 42, 0.12);
}

.news-meta {
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.news-tag {
  display: inline-flex;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  color: #2563eb;
  font-size: 0.85rem;
  font-weight: 700;
}

.news-date {
  color: #94a3b8;
  font-size: 0.92rem;
}

.news-card h3 {
  margin: 0 0 0.85rem;
  color: #0f172a;
  font-size: 1.25rem;
  line-height: 1.4;
}

.news-card p {
  margin: 0 0 1.5rem;
  color: #475569;
  line-height: 1.8;
}

.news-link {
  color: #0f172a;
  font-weight: 600;
  text-decoration: none;
  position: relative;
}

.news-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  transition: width 0.3s ease;
}

.news-link:hover::after {
  width: 100%;
}

@media (max-width: 980px) {
  .news-grid {
    grid-template-columns: repeat(2, minmax(260px, 1fr));
  }
}

@media (max-width: 700px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>