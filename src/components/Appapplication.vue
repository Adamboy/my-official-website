<template>
  <section class="glass-page">
    <SceneBanner></SceneBanner>

    <div class="glass-hero">
      <div class="hero-meta">
        <span class="badge">Glassmorphism</span>
        <h1>当前页面样式</h1>
        <p>本页面仅在 Appapplication.vue 内生效，使用浮动卡片、模糊背景与渐变光晕。</p>
      </div>
    </div>

    <div class="card-grid">
      <article
        v-for="(feature, idx) in features"
        :key="feature.id"
        class="glass-card"
        :style="{ animationDelay: `${0.1 + idx * 0.12}s` }"
      >
        <div class="feature-icon" v-html="feature.icon"></div>
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.description }}</p>
        <router-link :to="`/detail/${feature.id}`" class="detail-link">
          查看详情 →
        </router-link>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'
import SceneBanner from './SceneBanner.vue'

interface Feature {
  id: number
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    id: 1,
    icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3EBDFF" stroke-width="2"><path d="M12 2L2 7L12 12L22 7L12 2Z" /><path d="M2 17L12 22L22 17" /><path d="M2 12L12 17L22 12" /></svg>',
    title: '家具上楼',
    description: '针对无电梯老旧小区或超大件家具，直接吊运至阳台或楼顶，省去人工搬运烦恼。'
  },
  {
    id: 2,
    icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3EBDFF" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>',
    title: '工地建材',
    description: '水泥、沙石、砖块等建材垂直运输，轻松跨越复杂工地地形，效率提升数倍。'
  },
  {
    id: 3,
    icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3EBDFF" stroke-width="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>',
    title: '电力光伏',
    description: '屋顶光伏板吊装、电力塔材运输，精准定位投放，减少组件破损。'
  },
  {
    id: 4,
    icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3EBDFF" stroke-width="2"><polygon points="1 6 5 2 9 6 13 2 17 6 21 2 21 22 1 22 1 6" /></svg>',
    title: '山地运输',
    description: '景区物资补给、基站建设材料上山。无视崎岖山路，直线抵达目的地。'
  },
  {
    id: 5,
    icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3EBDFF" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>',
    title: '应急救援',
    description: '道路阻断时的物资投送、医疗急救包配送。争分夺秒，打通生命通道。'
  },
  {
    id: 6,
    icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3EBDFF" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>',
    title: '生鲜水果',
    description: '易损生鲜、水果的最后一里极速直达，避开地面拥堵。'
  }
]

const pageName = 'Appapplication'

onBeforeMount(() => {
  console.log(`${pageName}: before mount`)
})

onMounted(() => {
  console.log(`${pageName}: mounted`)
})

onBeforeUpdate(() => {
  console.log(`${pageName}: before update`)
})

onUpdated(() => {
  console.log(`${pageName}: updated`)
})

onBeforeUnmount(() => {
  console.log(`${pageName}: before unmount`)
})

onUnmounted(() => {
  console.log(`${pageName}: unmounted`)
})
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500&display=swap');

.glass-page {
  position: relative;
  min-height: 100vh;
  // padding: 3rem 1.5rem 4rem;
  background: #ffffff;
  color: #0f172a;
  overflow: hidden;
}



.glass-page::before,
.glass-page::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.35;
  animation: floatBubble 12s ease-in-out infinite;
}

.glass-page::before {
  width: 420px;
  height: 420px;
  background: rgba(56, 189, 248, 0.25);
  top: -100px;
  left: -80px;
}

.glass-page::after {
  width: 360px;
  height: 360px;
  background: rgba(56, 189, 248, 0.18);
  bottom: -90px;
  right: -80px;
  animation-delay: 6s;
}

.glass-hero {
  position: relative;
  width: min(1120px, 100%);
  margin: 0 auto 2rem;
  padding: 2.2rem 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(56, 189, 248, 0.18);
  backdrop-filter: blur(24px);
  box-shadow: 0 40px 80px rgba(15, 23, 42, 0.08);
}

.hero-meta {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.badge {
  align-self: flex-start;
  display: inline-flex;
  padding: 0.45rem 0.95rem;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #0284c7;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-meta h1 {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: clamp(2.2rem, 3vw, 3.6rem);
  line-height: 1.05;
  color: #0f172a;
}

.hero-meta p {
  margin: 0;
  max-width: 780px;
  color: #475569;
  font-size: 1rem;
  line-height: 1.75;
}

.card-grid {
  position: relative;
  width: min(1120px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 1.5rem;
}

.glass-card {
  position: relative;
  padding: 1.75rem;
  min-height: 190px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(56, 189, 248, 0.18);
  backdrop-filter: blur(24px);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
  transform: translateY(0);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards, floatCard 6s ease-in-out 1.2s infinite alternate;
}

.card-1 { animation-delay: 0.08s, 1.2s; transform: translateY(-4px); }
.card-2 { animation-delay: 0.18s, 1.35s; transform: translateY(-10px); }
.card-3 { animation-delay: 0.28s, 1.5s; transform: translateY(-18px); }

.glass-card:hover {
  transform: scale(1.05) translateY(-4px);
  box-shadow: 0 50px 110px rgba(15, 23, 42, 0.15);
  border-color: rgba(56, 189, 248, 0.35);
}

.glass-card h2 {
  margin: 0 0 0.85rem;
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: #0369a1;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.glass-card p {
  margin: 0;
  color: #475569;
  font-family: 'Plus Jakarta Sans', sans-serif;
  line-height: 1.7;
}

.detail-link {
  display: inline-block;
  margin-top: 1rem;
    color: #0f172a;
    text-decoration: none;
    font-weight: 500;
    position: relative;
    transition: color 0.2s ease;
  }

  .detail-link::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 0;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, #3b82f6, #06b6d4);
    transition: width 0.28s ease;
  }

  .detail-link:hover {
    color: transparent;
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    -webkit-background-clip: text;
    background-clip: text;
  }

  .detail-link:hover::after {
    width: 100%;
  }
.content-card p {
  margin: 0 0 1.5rem;
  color: #475569;
  font-family: 'Plus Jakarta Sans', sans-serif;
  line-height: 1.75;
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

@keyframes floatCard {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes floatBubble {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(20px) scale(1.05);
  }
}

@media (max-width: 900px) {
  .card-grid {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
}

@media (max-width: 640px) {
  .glass-page {
    padding: 2rem 1rem 3rem;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>