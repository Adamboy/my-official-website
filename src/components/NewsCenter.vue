<template>
  <section ref="rootRef" class="news-center" id="news-center">
    <div class="news-center__inner">
      <div class="news-center__header">
        <div class="news-center__titles">
          <p class="news-center__eyebrow">新闻中心</p>
          <h2 class="news-center__title">与您分享，易载航空实时动态</h2>
        </div>
        <router-link to="/news" class="news-center__more">
          查看更多 <span aria-hidden="true">→</span>
        </router-link>
      </div>

      <div class="news-center__grid">
        <article
          v-for="(item, idx) in newsList"
          :key="item.date"
          class="news-card"
          :class="{ 'is-visible': visibleCards[idx] }"
          :style="{ transitionDelay: `${idx * 0.1}s` }"
          :data-index="idx"
        >
          <div class="news-card__cover">
            <img
              :src="getCoverSrc(item.cover)"
              :alt="item.cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="news-card__content">
            <div class="news-card__meta">
              <span class="news-card__meta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7V12L15 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" stroke="currentColor" stroke-width="1.8"/>
                </svg>
              </span>
              <span class="news-card__meta-date">{{ item.date }}</span>
            </div>
            <h3 class="news-card__headline">{{ item.title }}</h3>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

interface NewsItem {
  date: string
  title: string
  cover: string
}

const newsList = ref<NewsItem[]>([
  {
    date: '2026-01-29',
    title: '向-30℃出发！易载航空EayLoad绞盘极寒可靠性验证纪实',
    cover: '极寒测试实景图'
  },
  {
    date: '2025-02-07',
    title: '喜报 | 天津易载航空“应用于无人机的货物运输索降绞盘及其控制方法”获发明专利!',
    cover: '红色喜报背景图'
  },
  {
    date: '2024-11-06',
    title: '来了!无人机空吊解决方案专业开发商!',
    cover: '蓝色科技风品牌图'
  }
])

const visibleCards = ref<boolean[]>(newsList.value.map(() => false))
const rootRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const revealCards = (): void => {
  const cards = rootRef.value?.querySelectorAll<HTMLElement>('.news-card') ?? []
  if (!observer) {
    visibleCards.value = visibleCards.value.map(() => true)
    return
  }

  cards.forEach((card) => {
    observer?.observe(card)
  })
}

const getCoverSrc = (label: string): string => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='%2336BFFA' />
          <stop offset='1' stop-color='%230F172A' />
        </linearGradient>
      </defs>
      <rect width='640' height='360' fill='url(%23g)' />
      <rect x='0' y='0' width='640' height='360' fill='rgba(255,255,255,0.16)' />
      <text x='50%' y='50%' fill='%23ffffff' font-size='30' font-family='Helvetica, Arial, sans-serif' text-anchor='middle' dominant-baseline='middle'>${label}</text>
    </svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

onMounted(() => {
  nextTick(() => {
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return
            }
            const index = Number(entry.target.getAttribute('data-index'))
            if (!Number.isNaN(index)) {
              visibleCards.value[index] = true
            }
            observer?.unobserve(entry.target)
          })
        },
        {
          threshold: 0.2
        }
      )
      revealCards()
    } else {
      visibleCards.value = visibleCards.value.map(() => true)
    }
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.news-center {
  position: relative;
  overflow: hidden;
  background: #ffffff;
  padding: 4rem 1rem 3rem;
}

.news-center::before {
  content: '';
  position: absolute;
  top: 1rem;
  left: 2%;
  width: 220px;
  height: 220px;
  opacity: 0.3;
  background-image: radial-gradient(circle at 0 0, rgba(148, 163, 184, 0.25) 1px, transparent 1px);
  background-size: 16px 16px;
  pointer-events: none;
}

.news-center::after {
  content: '';
  position: absolute;
  right: -20px;
  bottom: -20px;
  width: 380px;
  height: 260px;
  opacity: 0.22;
  background-image: linear-gradient(90deg, rgba(148, 163, 184, 0.18) 1px, transparent 1px),
    linear-gradient(rgba(148, 163, 184, 0.18) 1px, transparent 1px);
  background-size: 22px 22px;
  transform: rotate(18deg);
  pointer-events: none;
}

.news-center__inner {
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
}

.news-center__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: @spacing-lg;
  margin-bottom: 2.5rem;
}

.news-center__titles {
  max-width: 720px;
}

.news-center__eyebrow {
  margin: 0 0 0.75rem;
  font-size: 1.95rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: 0.06em;
}

.news-center__title {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.05;
  font-weight: 800;
  color: #0f172a;
}

.news-center__more {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  position: relative;
  text-decoration: none;
  color: #0f172a;
  font-weight: 500;
  font-size: 0.98rem;
  transition: color 0.3s ease;
}

.news-center__more::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  transition: width 0.3s ease;
}

.news-center__more span {
  display: inline-block;
  transition: transform 0.3s ease;
}

.news-center__more:hover {
  color: transparent;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
}

.news-center__more:hover::after {
  width: 100%;
}

.news-center__more:hover span {
  transform: translateX(4px);
}

.news-center__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.news-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);
  transform: translateY(16px);
  opacity: 0;
  transition: transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease;
}

.news-card.is-visible {
  transform: translateY(0);
  opacity: 1;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 38px rgba(15, 23, 42, 0.15);
}

.news-card:hover .news-card__cover img {
  transform: scale(1.05);
}

.news-card:hover .news-card__headline {
  color: transparent;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
}

.news-card__cover {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  background: #eef2ff;
}

.news-card__cover img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.news-card__content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.news-card__meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #94a3b8;
  font-size: 0.92rem;
}

.news-card__meta-icon {
  display: inline-flex;
  width: 1.2rem;
  height: 1.2rem;
  color: #94a3b8;
}

.news-card__headline {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.45;
  font-weight: 700;
  color: #0f172a;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 1199px) {
  .news-center__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .news-center {
    padding: 3rem 0.75rem 2rem;
  }

  .news-center__header {
    flex-direction: column;
    align-items: stretch;
  }

  .news-center__more {
    align-self: flex-start;
  }

  .news-center__title {
    font-size: 2rem;
  }

  .news-center__grid {
    grid-template-columns: 1fr;
  }
}
</style>
