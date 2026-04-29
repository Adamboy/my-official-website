<template>
  <section class="home-contact-cta">
    <div class="container cta-card">
      <div>
        <span>立即预约</span>
        <h2>无人机吊运服务，一次咨询即刻响应</h2>
        <p>我们的专业团队可为您评估工地环境、制定吊运方案，并在最短时间内安排施工。</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn-primary" href="tel:400-123-4567">拨打咨询电话</a>
        <router-link to="/contact" class="btn btn-outline">在线留言</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
@import '../styles/variables.less';

.home-contact-cta {
  padding: 4rem 0 5rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(14, 165, 233, 0.08));
}

.cta-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(59, 130, 246, 0.16);
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.08);
}

.cta-card span {
  display: inline-flex;
  color: #2563eb;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 0.9rem;
}

.cta-card h2 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 2.3vw, 2.4rem);
  line-height: 1.1;
}

.cta-card p {
  margin: 0;
  color: #475569;
  line-height: 1.8;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  border-radius: 999px;
  padding: 1rem 1.45rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: @primary-color;
  color: #ffffff;
}

.btn-outline {
  background: transparent;
  border: 2px solid @primary-color;
  color: @primary-color;
}

@media (max-width: 700px) {
  .cta-card {
    flex-direction: column;
    padding: 2rem;
  }

  .cta-actions {
    width: 100%;
    justify-content: stretch;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
