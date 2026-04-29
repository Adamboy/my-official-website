<template>
  <div class="cases-page">
    <SceneBanner
      title="成功案例"
      subtitle="真实落地的无人机吊运项目，覆盖高层施工、旧楼改造与紧急救援。"
      watermark="CASE"
    />

    <section class="cases-intro">
      <div class="intro-text">
        <span>案例展示</span>
        <h2>从复杂工况到高效交付，我们的案例证明了无人机吊运的可行性与价值</h2>
        <p>
          以合规资质为基础，融科低空持续在工程施工、城市改造和灾后救援场景中提供精准、安全、快速的空中搬运服务。每一项案例都体现了我们在风险控制、现场协同和效率提升方面的坚实能力。
        </p>
      </div>

      <div class="intro-stats">
        <div>
          <strong>3</strong>
          <span>核心场景覆盖</span>
        </div>
        <div>
          <strong>0</strong>
          <span>安全事故</span>
        </div>
        <div>
          <strong>1.2天</strong>
          <span>平均响应速度</span>
        </div>
      </div>
    </section>

    <section class="cases-list">
      <article v-for="item in cases" :key="item.id" class="case-card">
        <div class="card-header">
          <span class="case-tag">{{ item.tag }}</span>
          <div class="case-result">{{ item.metric }}</div>
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <div class="case-meta">
          <div>
            <strong>{{ item.duration }}</strong>
            <span>执行周期</span>
          </div>
          <div>
            <strong>{{ item.outcome }}</strong>
            <span>项目成果</span>
          </div>
        </div>
        <ul>
          <li v-for="point in item.highlights" :key="point">{{ point }}</li>
        </ul>
      </article>
    </section>

    <section class="cases-action">
      <div>
        <h2>让无人机吊运成为施工现场的稳定选择</h2>
        <p>
          如需了解更多成功案例或定制化项目方案，可联系我们为您提供工程评估、方案设计与现场实施支持。
        </p>
      </div>
      <router-link to="/contact" class="action-button">立即咨询</router-link>
    </section>
  </div>
</template>

<script setup lang="ts">
import SceneBanner from '../components/SceneBanner.vue'
import { ref, onMounted } from 'vue'


interface CaseItem {
  id: number
  tag: string
  title: string
  description: string
  metric: string
  duration: string
  outcome: string
  highlights: string[]
}

const cases = ref<CaseItem[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchCases = async () => {
  try {
    loading.value = true
    error.value = null
  } catch (err) {
    error.value = 'Failed to load cases'
    console.error('Error fetching cases:', err)
    // 保留硬编码数据作为后备
    cases.value = [
      {
        id: 1,
        tag: '旧楼改造',
        title: '旧楼楼体构件精确空中吊运，提升施工效率',
        description: '在狭窄楼群和无电梯环境下，采用无人机绞盘系统完成家具、建材、构件快速转运，避免传统人工吊装风险。',
        metric: '18%',
        duration: '1.5天',
        outcome: '施工周期缩短',
        highlights: [
          '绕开楼道拥堵，保障现场安全',
          '减少对居民生活影响',
          '实现零碰撞、零破损交付'
        ]
      },
      {
        id: 2,
        tag: '高层住宅',
        title: '高层构件精准吊装，保障工程安全与稳定',
        description: '通过远程监控与自动化绞盘，完成高层外墙构件与设备吊装，降低高空作业风险，提高工程精度。',
        metric: '0',
        duration: '2天',
        outcome: '安全事故为零',
        highlights: [
          '连续风速检测与应急停机机制',
          '数据化作业记录，便于后续复盘',
          '与施工单位协同调度，实现高效进场'
        ]
      },
      {
        id: 3,
        tag: '灾后抢险',
        title: '灾后物资空投与抢险吊运，快速打通救援通道',
        description: '在道路受阻的紧急场景中，部署无人机吊装平台，实现重物与救援物资的快速空中转运。',
        metric: '24h',
        duration: '半天',
        outcome: '响应时间最快',
        highlights: [
          '快速勘察空域与任务路径',
          '适配复杂地形与障碍物',
          '保障物资安全到达目标点'
        ]
      }
    ]
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCases()
})
</script>

<style lang="less" scoped>
.cases-page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 2.8rem 1.5rem 4rem;
}

.cases-intro {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: center;
}

.cases-intro .intro-text span {
  display: inline-flex;
  color: #2563eb;
  font-weight: 700;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.cases-intro .intro-text h2 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 2.5vw, 3rem);
  line-height: 1.05;
}

.cases-intro .intro-text p {
  color: #475569;
  line-height: 1.9;
}

.intro-stats {
  display: grid;
  gap: 1rem;
}

.intro-stats div {
  background: #f8fbff;
  border: 1px solid rgba(59, 130, 246, 0.18);
  border-radius: 1.5rem;
  padding: 1.6rem 1.4rem;
  text-align: center;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.05);
}

.intro-stats strong {
  display: block;
  font-size: 2.4rem;
  color: #0f172a;
  margin-bottom: 0.4rem;
}

.intro-stats span {
  color: #64748b;
}

.cases-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.case-card {
  background: #ffffff;
  border-radius: 1.8rem;
  padding: 2rem;
  border: 1px solid rgba(59, 130, 246, 0.12);
  box-shadow: 0 22px 55px rgba(15, 23, 42, 0.06);
  transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
  cursor: pointer;
}
.case-card:hover {
  box-shadow: 0 8px 32px rgba(59,130,246,0.18);
  transform: translateY(-4px) scale(1.03);
  border-color: #2563eb;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.case-tag {
  display: inline-flex;
  padding: 0.55rem 0.95rem;
  border-radius: 999px;
  background: linear-gradient(90deg, #2563eb 0%, #60a5fa 100%);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(59,130,246,0.08);
}

.case-result {
  color: #0f172a;
  font-weight: 700;
  font-size: 1.4rem;
}

.case-card h3 {
  margin: 0 0 0.9rem;
  font-size: 1.35rem;
}

.case-card p {
  margin: 0 0 1.5rem;
  color: #475569;
  line-height: 1.8;
}

.case-meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1.4rem;
}

.case-meta div {
  background: #f8fbff;
  padding: 1rem 1.1rem;
  border-radius: 1.3rem;
}

.case-meta strong {
  display: block;
  font-size: 1.45rem;
  color: #0f172a;
}

.case-meta span {
  color: #64748b;
}

.case-card ul {
  list-style: disc inside;
  padding-left: 0.8rem;
  color: #475569;
}

.case-card li {
  margin-bottom: 0.75rem;
  line-height: 1.75;
}

.cases-action {
  background: #eff6ff;
  border-radius: 2rem;
  padding: 2.2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.cases-action h2 {
  margin: 0 0 0.9rem;
  font-size: clamp(1.8rem, 2.5vw, 2.4rem);
}

.cases-action p {
  margin: 0;
  color: #475569;
  line-height: 1.85;
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  padding: 0.95rem 1.4rem;
  border-radius: 999px;
  background: linear-gradient(90deg, #2563eb 0%, #60a5fa 100%);
  color: #ffffff;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(59,130,246,0.08);
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
}

.action-button:hover {
  background: linear-gradient(90deg, #60a5fa 0%, #2563eb 100%);
  box-shadow: 0 8px 24px rgba(59,130,246,0.18);
  transform: translateY(-2px) scale(1.04);
}

@media (max-width: 980px) {
  .cases-intro {
    grid-template-columns: 1fr;
  }
  .intro-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .cases-list {
    grid-template-columns: repeat(2, minmax(260px, 1fr));
  }
}

@media (max-width: 760px) {
  .intro-stats {
    grid-template-columns: 1fr;
  }
  .case-card {
    padding: 1.2rem;
  }
  .cases-list {
    grid-template-columns: 1fr;
    gap: 0.7rem;
  }
  .cases-action {
    flex-direction: column;
    text-align: center;
  }
}
</style>
