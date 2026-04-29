<template>
  <section class="home-cases" id="cases">
    <div class="container">
      <div class="section-head">
        <h2>无人机吊运项目，覆盖多种复杂场景</h2>
        <p>从旧楼改造到高层吊装，再到山地灾后抢险，我们的无人机吊运方案已被多类客户验证。</p>
      </div>

      <div class="case-grid">
        <article v-for="caseItem in cases" :key="caseItem.id" class="case-card">
          <div class="case-badge">{{ caseItem.tag }}</div>
          <h3>{{ caseItem.title }}</h3>
          <p>{{ caseItem.description }}</p>
          <div class="case-details">
            <div>
              <strong>{{ caseItem.metric }}</strong>
              <span>{{ caseItem.metricLabel }}</span>
            </div>
            <div>
              <strong>{{ caseItem.duration }}</strong>
              <span>完成周期</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface CaseItem {
  id: number
  tag: string
  title: string
  description: string
  metric: string
  metricLabel: string
  duration: string
}

const cases: CaseItem[] = [
  {
    id: 1,
    tag: '旧楼改造',
    title: '密集楼宇家具吊装，快速打通楼层通道',
    description: '针对无电梯老旧小区进行户外空中吊运，避开楼道拥堵，实现高效无损搬运。',
    metric: '18%',
    metricLabel: '项目周期缩短',
    duration: '1.5天'
  },
  {
    id: 2,
    tag: '高层住宅',
    title: '超高层构件精确吊装，保障施工安全',
    description: '通过智能绞盘与远程监控，在高层施工现场实现稳定吊装、零事故交付。',
    metric: '0',
    metricLabel: '安全事故',
    duration: '2天'
  },
  {
    id: 3,
    tag: '灾后抢险',
    title: '山地物资快速投送，打通生命补给线',
    description: '在道路受阻环境下，通过无人机绞盘实现物资快速转运，响应时间极短。',
    metric: '24h',
    metricLabel: '响应时间',
    duration: '半天'
  }
]
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.home-cases {
  padding: 4rem 0;
  background: white;
}

.section-head {
  max-width: 720px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.section-head span {
  display: inline-flex;
  color: @primary-color;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.section-head h2 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 2.4vw, 2.7rem);
  line-height: 1.05;
}

.section-head p {
  margin: 0;
  color: #475569;
  line-height: 1.85;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(260px, 1fr));
  gap: 1.5rem;
}

.case-card {
  padding: 2rem;
  border-radius: 1.5rem;
  background: #ffffff;
  border: 1px solid rgba(59, 130, 246, 0.12);
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.06);
  transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 32px rgba(59,130,246,0.18);
    transform: translateY(-4px) scale(1.03);
    border-color: @primary-color;
  }
}

.case-badge {
  display: inline-flex;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: linear-gradient(90deg, #2563eb 0%, #60a5fa 100%);
  color: #fff;
  font-weight: 700;
  margin-bottom: 1.1rem;
  box-shadow: 0 2px 8px rgba(59,130,246,0.08);
}

.case-card h3 {
  margin: 0 0 1rem;
  font-size: 1.3rem;
}

.case-card p {
  margin: 0 0 1.8rem;
  color: #475569;
  line-height: 1.85;
}

.case-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.case-details div {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.case-details strong {
  font-size: 1.65rem;
  color: #0f172a;
}

.case-details span {
  color: #64748b;
}

@media (max-width: 980px) {
  .case-grid {
    grid-template-columns: repeat(2, minmax(260px, 1fr));
  }
}

@media (max-width: 700px) {
  .case-card {
    padding: 1.2rem;
  }
  .case-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
