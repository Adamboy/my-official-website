<!-- src/components/ScrollToTopButton.vue -->

<template>
  <button 
    v-show="showButton"
    class="scroll-to-top-button"
    @click="scrollToTop"
    aria-label="回到顶部"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor"
      class="scroll-icon"
    >
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showButton = ref(false);
const scrollY = ref(0);

// 滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// 监听滚动事件
const handleScroll = () => {
  scrollY.value = window.scrollY;
  showButton.value = scrollY.value > 300;
};

// 初始化
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 初始化检查
});

// 清理事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="less">
.scroll-to-top-button {
  position: fixed;
  bottom: 25vh;
  right: 24px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 120, 255, 0.15);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
}
  
.scroll-to-top-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 120, 255, 0.25);
}

.scroll-to-top-button:active {
  transform: translateY(0);
}

.scroll-icon {
  width: 24px;
  height: 24px;
  fill: white;
}

.scroll-to-top-button svg {
  width: 24px;
  height: 24px;
  fill: white;
}

@media (max-width: 768px) {
  .scroll-to-top-button {
    bottom: 70px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
}
</style>