<template>
  <section class="features" id="features">
    <div class="container">


      <div class="features__grid">
        <div
          v-for="(feature, idx) in features"
          :key="feature.id"
          class="feature-card"
          :style="{ animationDelay: `${0.2 + idx * 0.15}s` }"
        >
          <div class="feature-card__body">
            <div class="feature-card__icon" v-html="feature.icon"></div>
            <div class="feature-card__content">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

interface Feature {
  id: number
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    id: 1,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M12 7v10M4 17h16" /></svg>',
    title: '高精度绞盘控制',
    description: '毫米级张力校准与载荷反馈，确保吊运过程稳定无抖动。'
  },
  {
    id: 2,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v7"/><path d="M5.22 9.22l4.24 4.24"/><path d="M18.78 9.22l-4.24 4.24"/><circle cx="12" cy="17" r="4"/></svg>',
    title: '远程实时监控',
    description: '作业过程全程可视化，现场与指挥中心同步数据。'
  },
  {
    id: 3,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l4 4-4 4-4-4 4-4z"/><path d="M12 22v-8"/><path d="M6 14h12"/></svg>',
    title: '全天候作业',
    description: '防风雨设计与工业级抗震保护，支持多场景连续作业。'
  },
  {
    id: 4,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><path d="M12 4v16"/><path d="M6 6l12 12"/><path d="M18 6l-12 12"/></svg>',
    title: '低扰动施工',
    description: '高空吊运不占地、少噪音，适合城市与敏感场地。'
  },
  {
    id: 5,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18"/><path d="M12 3v18"/><circle cx="12" cy="12" r="3"/></svg>',
    title: '智能路径规划',
    description: '自动避障与高效航线规划，减少空中运行时间。'
  },
  {
    id: 6,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/><path d="M8 8l8 8"/><path d="M16 8l-8 8"/></svg>',
    title: '专业风险管控',
    description: '多重安全保护与故障预警，保障吊运现场零事故。'
  }
]

onMounted(() => {

})
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.features {
  padding: @spacing-xl 0;
  background: white;
}



.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: @spacing-lg;
}

.feature-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  padding: 2rem;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
  animation: slideUpFade 0.5s forwards, float 3s ease-in-out infinite;
  will-change: transform;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 30px 70px rgba(15, 23, 42, 0.1);
    animation-play-state: paused;
  }

  &__body {
    display: flex;
    gap: @spacing-lg;
    align-items: flex-start;
  }

  &__icon {
    width: 56px;
    min-width: 56px;
    height: 56px;
    border-radius: 0.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(56, 189, 248, 0.1);
  }

  &__icon svg {
    width: 2.25rem;
    height: 2.25rem;
  }

  &__content {
    flex: 1;
  }

  &__content h3 {
    margin: 0 0 0.5rem;
    line-height: 1.25;
  }

  &__content p {
    margin: 0;
    color: #475569;
    line-height: 1.75;
  }
}

.detail-link {
  align-self: flex-end;
  margin-top: @spacing-lg;
  font-size: 0.9rem;
  color: #0f172a;
  text-decoration: none;
  transition: color 0.3s ease;
}

.detail-link:hover {
  color: transparent;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
}

/* 入场动画：从下方淡入 */
@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 浮动动画：上下轻微移动 */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>