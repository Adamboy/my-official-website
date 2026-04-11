<template>
  <section class="features" id="features">
    <div class="container">
      <h2 class="features__title" :style="{ animationDelay: '0.1s' }">应用场景</h2>
      <p class="features__title_detail" :style="{ animationDelay: '0.2s' }">
        哪里路不通，哪里就有我们。我们为各种复杂环境提供专业的吊运解决方案。
      </p>
      <div class="features__grid">
        <div
          v-for="(feature, idx) in features"
          :key="feature.id"
          class="feature-card"
          :style="{ animationDelay: `${0.2 + idx * 0.2}s` }"
        >
          <div class="feature-card__icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
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
    icon: '⚡',
    title: '家具上楼',
    description: '针对无电梯老旧小区或超大件家具，直接吊运至阳台或楼顶，省去人工搬运烦恼。'
  },
  {
    id: 2,
    icon: '🛡️',
    title: '工地建材',
    description: '水泥、沙石、砖块等建材垂直运输，轻松跨越复杂工地地形，效率提升数倍。'
  },
  {
    id: 3,
    icon: '☀️',
    title: '电力光伏',
    description: '屋顶光伏板吊装、电力塔材运输。精准定位投放，减少因人工搬运造成的组件破损。'
  },
  {
    id: 4,
    icon: '⛰️',
    title: '山地运输',
    description: '景区物资补给、基站建设材料上山。无视崎岖山路，直线抵达目的地。'
  },
  {
    id: 5,
    icon: '🚑',
    title: '应急救援',
    description: '道路阻断时的物资投送、医疗急救包配送。争分夺秒，打通生命通道。'
  },
  {
    id: 6,
    icon: '🍓',
    title: '生鲜水果',
    description: '易损生鲜、水果的最后一里极速直达。避开地面拥堵，比快更快。'
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

.features__title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: @spacing-md;
  opacity: 0;
  transform: translateY(30px);
  animation: slideUpFade 0.5s forwards;
}

.features__title_detail {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: @spacing-xl;
  opacity: 0;
  transform: translateY(30px);
  animation: slideUpFade 0.5s forwards;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: @spacing-lg;
}

.feature-card {
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

  &__icon {
    font-size: 3rem;
    margin-bottom: @spacing-md;
  }

  h3 {
    margin-bottom: @spacing-sm;
  }

  p {
    color: #6b7280;
  }

  .detail-link {
    display: inline-block;
    margin-top: @spacing-md;
    color: #42b983;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: #2c8c66;
    }
  }
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