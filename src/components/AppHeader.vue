<template>
  <nav class="navbar">
    <div class="nav-container">
      <button class="hamburger" :class="{ active: menuOpen }" @click="toggleMenu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-menu" :class="{ active: menuOpen }">
        <li v-for="item in menuItems" :key="item.path">
          <router-link :to="item.path" class="nav-link" :class="{ active: $route.path === item.path }" @click="closeMenuOnMobile">
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'   // 新增

const route = useRoute() 

interface MenuItem {
  path: string
  label: string
}

const menuItems = ref<MenuItem[]>([
  { path: '/', label: '首页' },
  { path: '/service', label: '吊运服务' },
  { path: '/tech', label: '技术优势' },
  { path: '/cases', label: '成功案例' },
  { path: '/news', label: '新闻中心' },
  { path: '/about', label: '关于我们' },
  { path: '/contact', label: '联系我们' }
])

const menuOpen = ref<boolean>(false)

const toggleMenu = (): void => {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) {
    document.body.classList.add('menu-open')
  } else {
    document.body.classList.remove('menu-open')
  }
}

const closeMenu = (): void => {
  menuOpen.value = false
  document.body.classList.remove('menu-open')
}

const closeMenuOnMobile = (): void => {
  if (window.innerWidth <= 768) {
    closeMenu()
  }
}

const handleResize = (): void => {
  if (window.innerWidth > 768 && menuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.body.classList.remove('menu-open')
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(64, 164, 255, 0.2);
  box-shadow: 0 2px 12px rgba(0, 120, 255, 0.08);
}

.nav-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0.9rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2.2rem;
  list-style: none;
  transition: all 0.3s ease;
}

.nav-link {
  text-decoration: none;
  color: #1e3a5f;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s;
  letter-spacing: 0.5px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2.5px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-link:hover {
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.active {
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 600;
}

.nav-link.active::after {
  width: 100%;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0.3rem;
  z-index: 1001;
}

.hamburger span {
  width: 28px;
  height: 2.5px;
  background: #2c7be5;
  margin: 5px 0;
  transition: 0.3s;
  border-radius: 2px;
}

/* 移动端样式 - 菜单从左侧滑出 */
@media (max-width: 768px) {
  .nav-container {
    justify-content: space-between;
  }

  .hamburger {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    left: -100%;        /* 从左侧隐藏 */
    top: 0;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(16px);
    width: 75%;
    max-width: 280px;
    height: 100vh;
    justify-content: flex-start;
    padding: 5rem 2rem 2rem;
    gap: 2rem;
    transition: left 0.3s ease-in-out;  /* 过渡动画跟随 left */
    box-shadow: 4px 0 24px rgba(0, 80, 150, 0.15);  /* 阴影方向改为右侧 */
    border-right: 1px solid rgba(59, 130, 246, 0.3); /* 边框放在右侧 */
    z-index: 1000;
  }

  .nav-menu.active {
    left: 0;           /* 滑出到左侧可见区域 */
  }

  .nav-link {
    font-size: 1.2rem;
    width: 100%;
    text-align: left;
    padding: 0.6rem 0;
  }

  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(8px, 6px);
    background: #1e88e5;
  }
  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
    background: #1e88e5;
  }

  body.menu-open {
    overflow: hidden;
  }
}

@media (min-width: 769px) {
  .nav-menu {
    display: flex !important;
  }
}
</style>