<template>
  <section class="home-process" id="process">
    <div class="container">
      <div class="process-header">

        <h2>四步完成无人机吊运服务</h2>
        <p>从咨询到落地，我们提供可视化、安全可控的吊运方案，确保每一次空中吊装都高效无忧。</p>
      </div>

      <div class="process-grid">
        <article v-for="step in steps" :key="step.id" class="process-step">
          <div class="step-index">0{{ step.id }}</div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Step {
  id: number
  title: string
  description: string
}

const steps: Step[] = [
  {
    id: 1,
    title: '在线咨询',
    description: '提交需求后，快速获得专业评估与空中吊运方案建议。'
  },
  {
    id: 2,
    title: '方案设计',
    description: '无人机路径、载荷、场地安全与调度方案一并确定。'
  },
  {
    id: 3,
    title: '现场执行',
    description: '专业队伍携带智能绞盘和配套设备，按计划快速施工作业。'
  },
  {
    id: 4,
    title: '验收保障',
    description: '施工后进行质量复核和安全验收，提供完整项目报告。'
  }
]
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.home-process {
  padding: 4rem 0;
}

.process-header {
  max-width: 720px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.process-header span {
  display: inline-flex;
  color: @primary-color;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.process-header h2 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 2.4vw, 2.7rem);
  line-height: 1.05;
}

.process-header p {
  margin: 0;
  color: #475569;
  line-height: 1.85;
}

.process-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
  padding: 2rem 0;
}

.process-grid::after {
  content: '';
  position: absolute;
  left: 3rem;
  right: 3rem;
  top: 50%;
  height: 4px;
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.18), rgba(14, 165, 233, 0.18));
  z-index: 0;
}

.process-step {
  position: relative;
  padding: 2rem;
  border-radius: 1.6rem;
  background: #ffffff;
  border: 1px solid rgba(59, 130, 246, 0.12);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  z-index: 1;
}

.process-step:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 70px rgba(15, 23, 42, 0.12);
}

.process-step::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 2rem;
  transform: translateX(-50%);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: @primary-color;
  box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.12);
}

.step-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: #ffffff;
  font-weight: 800;
  margin-bottom: 1.5rem;
  box-shadow: 0 12px 30px rgba(59, 130, 246, 0.18);
}

.process-step h3 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
}

.process-step p {
  margin: 0;
  color: #475569;
  line-height: 1.85;
}

@media (max-width: 980px) {
  .process-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .process-grid::after {
    display: none;
  }
}

@media (max-width: 700px) {
  .process-grid {
    grid-template-columns: 1fr;
  }
}
</style>
