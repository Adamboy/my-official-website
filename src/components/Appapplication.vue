<template>
  <section id="application" class="app-application">
    <SceneBanner
      title="应用场景"
      subtitle="无人机吊运服务覆盖城市旧楼、高层建筑、山地工地与应急抢险等复杂环境。"
      watermark="SCENARIO"
    />

    <!-- <div class="application-intro container">
      <div class="intro-text">
        <span>服务场景</span>
        <h2>让高空作业更安全、更快捷、更可靠</h2>
        <p>我们提供专业无人机空中吊装服务，适用于场地受限、人工搬运困难、时间紧迫的各类项目。</p>
      </div>
    </div> -->

    <div class="scenario-grid container">
      <article
        v-for="(scenario, idx) in scenarios"
        :key="scenario.id"
        class="feature-card"
        :style="{ animationDelay: `${0.2 + idx * 0.12}s` }"
      >
        <div class="feature-card__body">
          <div class="feature-card__icon" v-html="scenario.icon"></div>
          <div class="feature-card__content">
            <h3>{{ scenario.title }}</h3>
            <p>{{ scenario.description }}</p>
            <router-link :to="`/detail/${scenario.id}`" class="feature-card__detail">查看详情</router-link>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import SceneBanner from './SceneBanner.vue'

const scenarios = [
  {
    id: 'city-old',
    title: '城市旧楼吊运',
    description: '在无电梯、楼道狭窄的环境中，通过无人机直接将家具和物资吊装至阳台或楼顶。',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V5a2 2 0 0 1 2-2h4v18H4z" /><path d="M14 21V3h4a2 2 0 0 1 2 2v16h-6z" /><path d="M8 7h2" /><path d="M8 11h2" /><path d="M16 9h2" /><path d="M16 13h2" /></svg>'
  },
  {
    id: 'construction',
    title: '工地建材运输',
    description: '为施工现场提供水泥、钢材、模板等材料的高空吊运，节省时间并降低地面干扰。',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18" /><path d="M4 6v13h16V6" /><path d="M8 6v13" /><path d="M16 6v13" /><path d="M12 6v13" /></svg>'
  },
  {
    id: 'photovoltaic',
    title: '光伏吊装',
    description: '支持屋顶光伏组件与配套设备精准吊运，减少组件破损，提升安装效率。',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M3 12h18" /><path d="M8 7V4" /><path d="M16 7V4" /></svg>'
  },
  {
    id: 'mountain',
    title: '山地运输',
    description: '面对崎岖山路和限行区域，无人机吊运可实现物资直达，避免复杂地面运输。',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l4-6 4 6 4-8 4 8" /><path d="M3 17h14" /></svg>'
  },
  {
    id: 'rescue',
    title: '应急救援',
    description: '灾害抢险时提供快速物资投送和医疗用品输送，打通生命线，缩短响应时间。',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18" /><path d="M6 12h12" /><path d="M19 7h-4v4h-2V7H5v10h4v-4h2v4h4V7z" /></svg>'
  },
  {
    id: 'delivery',
    title: '精准配送',
    description: '适用于易损物资与生鲜食品，提供小件高空定点运输服务。',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#36BFFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" /><path d="M3 7l9 6 9-6" /><path d="M12 13v7" /></svg>'
  }
]
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.app-application {
  background: #ffffff;
  padding-bottom: 4rem;
}

.application-intro {
  max-width: 1120px;
  margin: 0 auto;
  padding: 3rem 1.5rem 1rem;
  text-align: center;
}

.intro-text span {
  display: inline-flex;
  color: @primary-color;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.intro-text h2 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 2.4vw, 2.8rem);
  line-height: 1.05;
}

.intro-text p {
  margin: 0 auto;
  max-width: 720px;
  color: #475569;
  line-height: 1.8;
}

.scenario-grid {
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1.5rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  padding: 2rem 2rem 3rem;
  border-radius: 1rem;
  background: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.06);
  position: relative;
  height: 240px;
  min-height: 240px;
  opacity: 0;
  transform: translateY(30px);
  animation: slideUpFade 0.5s forwards, float 3s ease-in-out infinite;
  will-change: transform;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 70px rgba(15, 23, 42, 0.1);
}

.feature-card__body {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.feature-card__icon {
  width: 56px;
  min-width: 56px;
  height: 56px;
  border-radius: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(56, 189, 248, 0.1);
}

.feature-card__icon svg {
  width: 2.25rem;
  height: 2.25rem;
}

.feature-card__content {
  flex: 1;
}

.feature-card__detail {
  position: absolute;
  right: 1.75rem;
  bottom: 1.75rem;
  display: inline-flex;
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1.2;
  color: #1e3a5f;
  text-decoration: none;
  padding-bottom: 2px;
  transition: color 0.2s ease, transform 0.2s ease;
}

.feature-card__detail::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  transition: width 0.3s ease;
}

.feature-card__detail:hover {
  color: #3b82f6;
}

.feature-card__detail:hover::after {
  width: 100%;
}

.feature-card__content h3 {
  margin: 0 0 0.5rem;
  line-height: 1.25;
}

.feature-card__content p {
  margin: 0;
  color: #475569;
  line-height: 1.75;
}

.scenario-card h3 {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
  color: #0f172a;
}

.scenario-card p {
  margin: 0;
  color: #475569;
  line-height: 1.85;
}

@media (max-width: 980px) {
  .scenario-grid {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }
}

@media (max-width: 700px) {
  .scenario-grid {
    grid-template-columns: 1fr;
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
