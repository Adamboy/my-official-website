<template>
  <section class="features" id="features">
    <div class="container">
  
      <div class="features__grid">
        <div
          v-for="(feature, idx) in features"
          :key="feature.id"
          class="feature-card"
          :style="{ animationDelay: `${0.2 + idx * 0.2}s` }"
        >
          <div class="feature-card__body">
            <div class="feature-card__icon" v-html="feature.icon"></div>
            <div class="feature-card__content">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
          <router-link :to="`/detail/${feature.id}`" class="detail-link">
            查看详情 →
          </router-link>
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
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7h20v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z"></path><path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"></path><path d="M2 7l5 5h10l5-5"></path></svg>',
    title: '家具上楼',
    description: '针对无电梯老旧小区或超大件家具，直接吊运至阳台或楼顶，省去人工搬运烦恼。'
  },
  {
    id: 2,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c3.866 0 7 3.134 7 7v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9c0-3.866 3.134-7 7-7z"></path><path d="M7 14v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3"></path></svg>',
    title: '工地建材',
    description: '水泥、沙石、砖块等建材垂直运输，轻松跨越复杂工地地形，效率提升数倍。'
  },
  {
    id: 3,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    title: '电力光伏',
    description: '屋顶光伏板吊装、电力塔材运输。精准定位投放，减少因人工搬运造成的组件破损。'
  },
  {
    id: 4,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"></path><path d="M4 20l6-8 4 4 6-8 4 8"></path></svg>',
    title: '山地运输',
    description: '景区物资补给、基站建设材料上山。无视崎岖山路，直线抵达目的地。'
  },
  {
    id: 5,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    title: '应急救援',
    description: '道路阻断时的物资投送、医疗急救包配送。争分夺秒，打通生命通道。'
  },
  {
    id: 6,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c-1.36-1.36-2-3.14-2-5 0-2.21 1.79-4 4-4 1.47 0 2.76.81 3.55 2h-3.55c-1.1 0-2 .9-2 2 0 1.26.56 2.42 1.45 3.21.88.79 2.07 1.21 3.55 1.21 1.77 0 3.3-.77 4.4-2"></path><path d="M18 12c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 1.66.68 3.16 1.78 4.22C8.16 17.32 6.66 18 5 18c-3.31 0-6-2.69-6-6s2.69-6 6-6"></path></svg>',
    title: '生鲜水果',
    description: '易损生鲜、水果的最后一里极速直达，比快更快。'
  }
]

// 生命周期示例：组件挂载后打印日志
onMounted(() => {
  console.log('Features 组件已挂载，卡片浮动动效已启用')
})
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.features {
  padding: @spacing-xl 0;
  background: rgb(248 250 252);
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
  padding: @spacing-lg;
  border-radius: 1rem;
  background: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
  /* 入场动画 + 持续浮动动画 */
  animation: slideUpFade 0.5s forwards, float 3s ease-in-out infinite;
  will-change: transform;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.15);
    /* hover 时暂停浮动动画，避免冲突 */
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