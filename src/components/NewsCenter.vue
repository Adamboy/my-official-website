<template>
  <section class="news-center" id="news-center">
    <div class="news-center__inner">
      <div class="news-center__header">
        <div class="news-center__titles">
          <p class="news-center__eyebrow">新闻中心</p>
        </div>
      </div>

      <div class="news-list-wrapper">
        <div 
          class="news-list" 
          @mouseenter="pauseScroll" 
          @mouseleave="resumeScroll"
          @touchstart="pauseScroll"
          @touchend="resumeScroll"
        >
          <div 
            ref="newsTrackRef" 
            class="news-track" 
            :class="{ 'smooth-transition': enableTransition }"
          >
            <article 
              v-for="(item, idx) in duplicatedNews" 
              :key="`${item.id}-${idx}`" 
              class="news-item"
            >
              <img 
                :src="item.cover" 
                class="news-img" 
                :alt="item.title" 
                loading="lazy" 
                @load="handleImageLoad"
              />
              <div class="news-info">
                <div class="news-date">{{ item.date }}</div>
                <h3 class="news-title">{{ item.title }}</h3>
                <div class="news-desc">{{ item.desc }}</div>
                <a href="#" class="news-more" @click.prevent="handleDetail(item)">查看详情 →</a>
              </div>
            </article>
          </div>
        </div>
        
        <button class="slide-btn slide-btn--prev" @click="slidePrev" aria-label="上一组">←</button>
        <button class="slide-btn slide-btn--next" @click="slideNext" aria-label="下一组">→</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { getIndustryNews } from '../api/article'
const router = useRouter() 
// API 基础地址配置
const API_BASE_URL = import.meta.env.VITE_STRAPI_URL || (import.meta.env.DEV ? 'http://localhost:1337' : '')

// 分类映射
const categoryMap: Record<string, string> = {
  company: '企业新闻',
  public: '信息公示',
  third: '第三方报道'
}

interface NewsItem {
  id: any
  date: string
  title: string
  desc: string
  cover: string
  category: string
}

const newsList = ref<NewsItem[]>([])
const loading = ref(true)

// 从接口获取新闻数据
const fetchNews = async () => {
  try {
    loading.value = true
    const response = await getIndustryNews({
      type: '', // 获取所有类型
      page: 1,
      pageSize: 10
    })
    
    if (response.data && Array.isArray(response.data)) {
      newsList.value = response.data.map((item: any) => ({
        id: item.documentId,
        date: item.pushDate || new Date().toISOString().split('T')[0],
        title: item.title || '无标题',
        desc: item.summary || '',
        cover: item.newImageUrl?.url ? `${API_BASE_URL}${item.newImageUrl.url}` : '',
        category: categoryMap[item.type] || '企业新闻'
      }))
    }
  } catch (error) {
    console.error('获取新闻数据失败:', error)
    // 使用默认数据作为降级
    newsList.value = [
      {
        id: 1,
        date: '2026-04-15',
        title: '大型光伏基地无人机吊运项目顺利完成验收',
        desc: '本次吊运任务覆盖山区光伏板运输，有效提升施工效率，降低人工风险，获得甲方高度认可。',
        cover: 'https://picsum.photos/600/400?random=1',
        category: '项目案例'
      },
      {
        id: 2,
        date: '2026-04-10',
        title: '新一代重型吊运无人机正式投入使用',
        desc: '载重能力提升30%，续航更长，稳定性更强，适用于建材、光伏、工程应急等多种场景。',
        cover: 'https://picsum.photos/600/400?random=2',
        category: '公司动态'
      },
      {
        id: 3,
        date: '2026-04-05',
        title: '甲乙双方安全作业规范培训会顺利召开',
        desc: '会议明确现场作业流程、起降安全区域、时间确认机制及图片留证标准，强化安全管理。',
        cover: 'https://picsum.photos/600/400?random=3',
        category: '安全公告'
      },
      {
        id: 4,
        date: '2026-04-01',
        title: '无人机吊运技术获行业创新应用奖项',
        desc: '凭借高效、安全、环保的作业模式，在工程建设领域获得权威机构认可与表彰。',
        cover: 'https://picsum.photos/600/400?random=4',
        category: '行业资讯'
      },
      {
        id: 5,
        date: '2026-03-25',
        title: '山区建材吊运项目圆满完成，效率提升显著',
        desc: '针对复杂地形实施精准吊运，大幅减少人工搬运成本，缩短工期，获得合作方好评。',
        cover: 'https://picsum.photos/600/400?random=5',
        category: '项目案例'
      },
      {
        id: 6,
        date: '2026-03-20',
        title: '行业新规发布：无人机吊运安全标准进一步升级',
        desc: '公司积极响应政策，全面升级设备检测、人员培训与作业流程，确保合规安全运行。',
        cover: 'https://picsum.photos/600/400?random=6',
        category: '安全公告'
      }
    ]
  } finally {
    loading.value = false
  }
}

const newsTrackRef = ref<HTMLElement | null>(null)
const isPaused = ref(false)
const userPaused = ref(false)
let animationFrame: number | null = null
let currentTranslateX = 0
let trackWidth = 0
let resizeObserver: ResizeObserver | null = null
let autoResumeTimer: ReturnType<typeof setTimeout> | null = null

// 过渡动画相关
const enableTransition = ref(false)
let transitionTimer: ReturnType<typeof setTimeout> | null = null
let activeTransitionEndHandler: (() => void) | null = null

const duplicatedNews = computed(() => [...newsList.value, ...newsList.value])
/** 获取单个卡片宽度 + gap (步长) */
const getStepDistance = (): number => {
  if (!newsTrackRef.value) return 350
  const firstItem = newsTrackRef.value.querySelector('.news-item') as HTMLElement
  if (!firstItem) return 350
  const itemWidth = firstItem.offsetWidth
  const gap = 20
  return itemWidth + gap
}

/** 重新计算一组新闻的总宽度（trackWidth） */
const recalculateScrollWidth = () => {
  const el = newsTrackRef.value
  if (!el || el.children.length === 0) return
  const fullWidth = el.scrollWidth
  if (fullWidth > 0) {
    const newTrackWidth = fullWidth / 2
    if (Math.abs(newTrackWidth - trackWidth) > 1) {
      trackWidth = newTrackWidth
      // 确保当前偏移在有效范围内
      if (currentTranslateX >= trackWidth) {
        currentTranslateX -= trackWidth
        updatePositionWithoutTransition(currentTranslateX)
      } else if (currentTranslateX < 0) {
        currentTranslateX += trackWidth
        updatePositionWithoutTransition(currentTranslateX)
      }
    }
  }
}

/** 瞬间更新位置（不带动画） */
const updatePositionWithoutTransition = (x: number) => {
  if (!newsTrackRef.value) return
  const wasTransition = enableTransition.value
  if (wasTransition) {
    enableTransition.value = false
  }
  currentTranslateX = x
  newsTrackRef.value.style.transform = `translateX(-${currentTranslateX}px)`
  if (wasTransition) {
    // 强制浏览器重绘，确保下次动画时过渡属性生效
    void newsTrackRef.value.offsetHeight
    enableTransition.value = true
  }
}

/** 清除所有过渡相关状态，取消正在进行的动画 */
const cancelTransition = () => {
  if (activeTransitionEndHandler && newsTrackRef.value) {
    newsTrackRef.value.removeEventListener('transitionend', activeTransitionEndHandler)
    activeTransitionEndHandler = null
  }
  if (transitionTimer) {
    clearTimeout(transitionTimer)
    transitionTimer = null
  }
  enableTransition.value = false
}

/** 手动滑动核心（带平滑动画，支持无限循环） */
const slide = (direction: 1 | -1) => {
  if (!newsTrackRef.value) return

  // 取消任何正在进行的过渡动画
  cancelTransition()

  // 暂停自动滚动
  userPaused.value = true
  if (autoResumeTimer) clearTimeout(autoResumeTimer)
  autoResumeTimer = setTimeout(() => {
    userPaused.value = false
    autoResumeTimer = null
  }, 3000)

  // 确保 trackWidth 是最新的
  recalculateScrollWidth()
  const step = getStepDistance()
  let newX = currentTranslateX + direction * step

  // 无限循环核心：如果越界，先瞬间平移一整组宽度（无动画），再计算最终目标位置
  if (newX < 0) {
    // 向右移动越界：将位置向右平移一组宽度
    updatePositionWithoutTransition(currentTranslateX + trackWidth)
    newX = currentTranslateX + direction * step
  } else if (newX >= trackWidth) {
    // 向左移动越界：将位置向左平移一组宽度
    updatePositionWithoutTransition(currentTranslateX - trackWidth)
    newX = currentTranslateX + direction * step
  }

  // 启用过渡动画，移动到目标位置
  enableTransition.value = true
  currentTranslateX = newX
  newsTrackRef.value.style.transform = `translateX(-${currentTranslateX}px)`

  // 动画结束后的清理工作
  const onTransitionEnd = () => {
    cancelTransition()
    // 再次确保偏移量在有效范围内（避免累计误差）
    if (currentTranslateX >= trackWidth || currentTranslateX < 0) {
      const corrected = ((currentTranslateX % trackWidth) + trackWidth) % trackWidth
      updatePositionWithoutTransition(corrected)
    }
  }
  activeTransitionEndHandler = onTransitionEnd
  newsTrackRef.value.addEventListener('transitionend', onTransitionEnd, { once: true })
  // 保险：如果过渡事件未触发，0.4秒后强制结束
  transitionTimer = setTimeout(() => {
    if (enableTransition.value) {
      onTransitionEnd()
    }
  }, 400)
}

const slidePrev = () => slide(-1)
const slideNext = () => slide(1)

const pauseScroll = () => { isPaused.value = true }
const resumeScroll = () => { isPaused.value = false }

const handleImageLoad = () => {
  recalculateScrollWidth()
}

const handleDetail = (_item: NewsItem) => {
  // 可替换为实际路由跳转
   router.push({ name: 'news-detail', params: { id: _item.id } });
}

/** 自动滚动（逐帧平滑，无过渡） */
const startAutoScroll = async () => {
  await nextTick()
  const el = newsTrackRef.value
  if (!el) return

  recalculateScrollWidth()
  if (trackWidth <= 0) return

  const speed = 0.8
  const step = () => {
    if (!isPaused.value && !userPaused.value && trackWidth > 0) {
      currentTranslateX += speed
      if (currentTranslateX >= trackWidth) {
        currentTranslateX -= trackWidth
      }
      // 自动滚动时禁用过渡
      if (enableTransition.value) enableTransition.value = false
      el.style.transform = `translateX(-${currentTranslateX}px)`
    }
    animationFrame = requestAnimationFrame(step)
  }

  if (animationFrame) cancelAnimationFrame(animationFrame)
  animationFrame = requestAnimationFrame(step)
}

const handleResize = () => {
  recalculateScrollWidth()
  // 窗口大小变化后，确保位置不超出
  if (currentTranslateX >= trackWidth || currentTranslateX < 0) {
    const corrected = ((currentTranslateX % trackWidth) + trackWidth) % trackWidth
    updatePositionWithoutTransition(corrected)
  }
}

onMounted(async () => {
  await fetchNews()
  startAutoScroll()
  window.addEventListener('resize', handleResize)
  if (newsTrackRef.value && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => recalculateScrollWidth())
    resizeObserver.observe(newsTrackRef.value)
  }
})

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  if (autoResumeTimer) clearTimeout(autoResumeTimer)
  if (transitionTimer) clearTimeout(transitionTimer)
  cancelTransition()
  window.removeEventListener('resize', handleResize)
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<style lang="less" scoped>
.news-center {
  background: white;
}
.news-center__inner {
  margin: 0 auto;
  padding: 2rem 0;
}
.news-center__header {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
.news-center__eyebrow {
  font-size: 1.95rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.news-list-wrapper {
  position: relative;
}
.news-list {
  overflow: hidden;
  width: 100%;
}
.news-track {
  display: flex;
  gap: 20px;
  width: max-content;
  transform: translateX(0);
  will-change: transform;
  padding: 12px 0;
}
.news-track.smooth-transition {
  transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.news-item {
  flex: 0 0 330px;
  width: 330px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
}
.news-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.news-info {
  padding: 20px;
  position: relative;
  padding-bottom: 68px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.news-date {
  font-size: 13px;
  color: #999;
  margin-bottom: 8px;
}
.news-title {
  font-size: 18px;
  font-weight: bold;
  color: #222;
  margin-bottom: 10px;
}
.news-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.news-more {
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 8px 14px;
  border-radius: 999px;
  color: #1e3a5f;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #06b6d4);
    transition: width 0.3s ease;
  }
  &:hover {
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(135deg, #3b82f6, #06b6d4);
    &::after { width: 100%; }
  }
}

.slide-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  border: none;
  font-size: 28px;
  font-weight: 300;
  color: #1e293b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 2;
  &:hover {
    background: rgba(255, 255, 255, 0.6);
    transform: translateY(-50%) scale(1.05);
  }
  &:active { transform: translateY(-50%) scale(0.96); }
  &--prev { left: 16px; }
  &--next { right: 16px; }
}

@media (max-width: 768px) {
  .slide-btn { width: 36px; height: 36px; font-size: 22px; }
  .news-item { flex: 0 0 260px; width: 260px; }
}
@media (max-width: 992px) {
  .news-item { flex: 0 0 300px; width: 300px; }
}
</style>