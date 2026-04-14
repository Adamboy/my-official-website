<template>
  <div>
    <AppHero />
    <AppApplication />
    <SceneBanner
      title="应用场景"
      subtitle="哪里路不通，哪里就有我们。我们为各种复杂环境提供专业的吊运解决方案。"
      watermark="APPLICATION"
    />

    <AppFeatures />
    <AppFaq />
    <NewsCenter />

    <div class="loader"></div>
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
</script>
<style scoped>
 .loader {
    position: relative;
    width: 120px;
    height: 90px;
    margin: 0 auto;
    right: 0;
    margin: 0;
  }

  .loader:before {
    content: "";
    position: absolute;
    bottom: 30px;
    left: 50px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: #2a9d8f;
    animation: loading-bounce 0.5s ease-in-out infinite alternate;
  }

  .loader:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    height: 7px;
    width: 45px;
    border-radius: 4px;
    box-shadow: 0 5px 0 #f2f2f2, -35px 50px 0 #f2f2f2, -70px 95px 0 #f2f2f2;
    animation: loading-step 1s ease-in-out infinite;
  }

  @keyframes loading-bounce {
    0% {
      transform: scale(1, 0.7);
    }

    40% {
      transform: scale(0.8, 1.2);
    }

    60% {
      transform: scale(1, 1);
    }

    100% {
      bottom: 140px;
    }
  }

  @keyframes loading-step {
    0% {
      box-shadow: 0 10px 0 rgba(0, 0, 0, 0),
              0 10px 0 #f2f2f2,
              -35px 50px 0 #f2f2f2,
              -70px 90px 0 #f2f2f2;
    }

    100% {
      box-shadow: 0 10px 0 #f2f2f2,
              -35px 50px 0 #f2f2f2,
              -70px 90px 0 #f2f2f2,
              -70px 90px 0 rgba(0, 0, 0, 0);
    }
  }
</style>