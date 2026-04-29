<template>
  <div class="home-page">
    <AppHero />

    <AppApplication />

    <section id="tech" class="home-tech">
      <SceneBanner
        title="技术优势"
        subtitle="智能无人机吊运技术，让复杂场景也能实现快速、安全、可控的空中搬运。"
        watermark="ADVANTAGE"
      />

      <AppFeatures />
    </section>
    <HomeCases />
    <HomeProcess />
    <AppFaq />
    <NewsCenter />
    <HomeContactCta />
    <ScrollToTopButton />
  </div>
</template>

<script setup lang="ts">
import AppHero from '../components/AppHero.vue'
import AppApplication from '../components/AppApplication.vue'
import AppFeatures from '../components/AppFeatures.vue'
import NewsCenter from '../components/NewsCenter.vue'
import AppFaq from '../components/AppFaq.vue'
import SceneBanner from '../components/SceneBanner.vue'
import ScrollToTopButton from '../components/ScrollToTopButton.vue'
import HomeCases from '../components/HomeCases.vue'
import HomeProcess from '../components/HomeProcess.vue'
import HomeContactCta from '../components/HomeContactCta.vue'
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.home-stats {
  padding: 2rem 0 3rem;
  background: #f8fbff;
}

.stats-grid {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 1rem;
}

.stat-item {
  background: #ffffff;
  border: 1px solid rgba(59, 130, 246, 0.14);
  border-radius: 1.2rem;
  padding: 1.5rem 1.25rem;
  text-align: center;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.05);
}

.stat-item strong {
  display: block;
  font-size: 2rem;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.stat-item span {
  color: #475569;
}

@media (max-width: 980px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  }
}

.home-tech {
  scroll-margin-top: 100px;
}

@media (max-width: 700px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>


