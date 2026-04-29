<template>
  <div class="about-page">
    <!-- 关于我们 + 图片 Banner（未改动） -->
    <section class="banner-section">
      <div class="image-container">
        <img :src="bannerImage" alt="无人机吊运业务展示" />
        <div class="text-overlay">
          <div class="title1">关于我们</div>
          <div class="title2">
            用合规资质与项目执行能力，构建无人机吊运行业新标准。
          </div>
        </div>
      </div>
    </section>

    <!-- 公司资质介绍段落 -->
    <section class="intro-text">
      <div>
        <h2>关于我们</h2>
        <p v-if="aboutUsInfo?.attributes?.description">
          {{ aboutUsInfo.attributes.description }}
        </p>
        <p v-else>
          融科低空科技有限公司，企业注册资本50万元，位于惠州惠东县平山镇内，成立以来专注于无人机驾驶员培训及低空领域的行业服务，
          融科低空立足于技术与场景结合的无人机吊运领域，致力于为工程施工、城市改造和救援抢险等复杂场景提供高效、安全的低空解决方案。
          我们始终坚持"存在，即创造价值"的理念，从合规资质、技术研发到项目现场执行，持续为客户交付真实可落地的工程成果与优质服务体验。
        </p>
      </div>
    </section>

    <!-- Canvas 背景 + 圆形图标 + 公司资质文字 + 证书轮播卡片 -->
    <section class="cert-section">
      <canvas ref="bgCanvas" class="bg-canvas"></canvas>
      <div class="cert-content">
        <!-- 圆形图标 -->
        <div class="circle-icon">
          <img src="../assets/icon/16930179654690755.png" alt="图标" />
        </div>
        <div class="section-title">公司资质</div>

        <!-- 证书轮播卡片 -->
        <div class="certificates-carousel">
          <div class="carousel-container">
            <div class="carousel-wrapper">
              <button class="carousel-btn prev" @click="prevSlide" :disabled="currentIndex === 0">
                &#10094;
              </button>
             
              <div class="carousel-track-container">
              
                <div class="carousel-track" :style="trackStyle">
                  <div v-for="(item, idx) in certificates" :key="idx" class="cert-card" @click="openModal(item.image)">
                    <div class="card-inner">
                      <img :src="item.image" :alt="item.title" loading="lazy" />
                      <div class="card-caption">{{ item.title }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <button class="carousel-btn next" @click="nextSlide" :disabled="currentIndex === maxIndex">
                &#10095;
              </button>
            </div>
          
            <div class="carousel-dots">
              <span v-for="(_, idx) in certificates" :key="idx" class="dot" :class="{ active: currentIndex === idx }"
                @click="goToSlide(idx)"></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 图片弹窗蒙层 -->
    <Teleport to="body">
      <div v-if="modalVisible" class="image-modal" @click.self="closeModal">
        <button class="modal-close" @click="closeModal">&times;</button>
        <img :src="modalImage" alt="证书大图" class="modal-image" />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { usePublicInfo } from '../composables/usePublicInfo';
import { getAboutUsInfos, getAboutUsCarousel } from '../api/article';
// 关于我们信息状态
const aboutUsInfo = ref<any>(null)
const aboutUsLoading = ref(false)
const aboutUsError = ref<string | null>(null)

// 轮播图数据状态
const carouselData = ref<any[]>([])
// ---------- 图片资源路径（请根据实际项目调整） ----------
const bannerImage = new URL("../assets/about/45.jpg", import.meta.url).href;
const page1 = new URL(
  "../assets/pdf_images/pdf_image_page1_1.jpg",
  import.meta.url,
).href;
const page2 = new URL(
  "../assets/pdf_images/pdf_image_page1_2.jpg",
  import.meta.url,
).href;
const page3 = new URL(
  "../assets/pdf_images/pdf_image_page1_3.jpg",
  import.meta.url,
).href;

// 证书列表（使用接口数据）
const certificates = computed(() => {
  const API_BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
  // 直接从扁平结构读取字段
  const validItems = carouselData.value
    .filter(item => item.isTrue === true)               // 直接取 isTrue
    .sort((a, b) => (a.sortid || 0) - (b.sortid || 0)) // 直接取 sortid
    .map(item => ({
      title: item.title || '未命名',                    // 直接取 title
      // 拼接完整图片 URL：相对路径需要加上后端地址
      image: item.imageUrl?.url ? `${API_BASE_URL}${item.imageUrl.url}` : ''
    }))
    .filter(item => item.image !== '');                // 过滤掉没有有效图片的

  // 如果没有有效证书（接口空或全部无图），显示默认证书（本地图片）
  if (validItems.length === 0) {
    return [
      { title: "CAAC 运营合格证", image: page1 },
      { title: "CAAC 证件详情", image: page2 },
      { title: "低空经济信息表", image: page3 },
    ];
  }

  return validItems;
});

// ---------- 轮播逻辑 ----------
const cardWidth = 300; // 卡片宽度 (px)
const gap = 24; // 卡片间距 (px)
const slideStep = cardWidth + gap;
const currentIndex = ref(0);
const maxIndex = computed(() => Math.max(0, (certificates.value?.length || 0) - 1));

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * slideStep}px)`,
  transition: "transform 0.4s ease",
}));

function prevSlide() {
  if (currentIndex.value > 0) currentIndex.value--;
}
function nextSlide() {
  if (currentIndex.value < maxIndex.value) currentIndex.value++;
}
function goToSlide(index: number) {
  currentIndex.value = Math.min(maxIndex.value, Math.max(0, index));
}

// ---------- 弹窗逻辑 ----------
const modalVisible = ref(false);
const modalImage = ref("");
function openModal(imageUrl: string) {
  modalImage.value = imageUrl;
  modalVisible.value = true;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modalVisible.value = false;
  document.body.style.overflow = "";
}

// ---------- Canvas 粒子动画（完整保留原有效果） ----------
const bgCanvas = ref<HTMLCanvasElement | null>(null);
let animationId: number | null = null;

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  canvasWidth: number;
  canvasHeight: number;
  reset(): void;
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

const config = {
  particleCount: 25,
  lineDistance: 180,
  lineOpacity: 0.35,
  nodeColor: "rgba(122, 180, 255, 0.9)",
  lineColor: "rgba(122, 180, 255, 0.6)",
  baseRotationSpeed: 0.002,
  driftSpeed: 0.3,
};

let particles: Particle[] = [];
let rotationAngle = 0;

class ParticleImpl implements Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  canvasWidth: number;
  canvasHeight: number;
  constructor(
    canvasWidth: number,
    canvasHeight: number,
  ) {
    this.baseX = 0;
    this.baseY = 0;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.reset();
  }
  reset() {
    const angle = Math.random() * Math.PI * 2;
    const radius =
      Math.random() * Math.min(this.canvasWidth, this.canvasHeight) * 0.4;
    this.baseX = this.canvasWidth / 2 + Math.cos(angle) * radius;
    this.baseY = this.canvasHeight / 2 + Math.sin(angle) * radius;
    this.x = this.baseX;
    this.y = this.baseY;
    this.vx = (Math.random() - 0.5) * config.driftSpeed;
    this.vy = (Math.random() - 0.5) * config.driftSpeed;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = config.nodeColor;
    ctx.fill();
  }
}

function resizeCanvas() {
  if (!bgCanvas.value) return;
  const container = bgCanvas.value.parentElement;
  if (container) {
    bgCanvas.value.width = container.clientWidth;
    bgCanvas.value.height = container.clientHeight;
  } else {
    bgCanvas.value.width = window.innerWidth;
    bgCanvas.value.height = 600;
  }
}

function initParticles(canvasWidth: number, canvasHeight: number) {
  particles = [];
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(new ParticleImpl(canvasWidth, canvasHeight));
  }
}

function drawLines(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < config.lineDistance) {
        const opacity =
          (1 - distance / config.lineDistance) * config.lineOpacity;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(122, 180, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

function rotateParticles(canvasWidth: number, canvasHeight: number) {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  rotationAngle += config.baseRotationSpeed;
  particles.forEach((p) => {
    const dx = p.baseX - centerX;
    const dy = p.baseY - centerY;
    const radius = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) + rotationAngle;
    p.baseX = centerX + Math.cos(angle) * radius;
    p.baseY = centerY + Math.sin(angle) * radius;
  });
}

function animate() {
  if (!bgCanvas.value) return;
  const canvas = bgCanvas.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.shadowBlur = 6;
  ctx.shadowColor = "rgba(122, 180, 255, 0.4)";
  rotateParticles(canvas.width, canvas.height);
  particles.forEach((p) => p.update());
  drawLines(ctx);
  particles.forEach((p) => p.draw(ctx));
  ctx.shadowBlur = 0;
  animationId = requestAnimationFrame(animate);
}

function handleResize() {
  resizeCanvas();
  if (bgCanvas.value) {
    initParticles(bgCanvas.value.width, bgCanvas.value.height);
  }
}

onMounted(() => {
  // 获取公共信息数据
  const { fetchPublicInfo } = usePublicInfo()
  fetchPublicInfo()
  
  // 获取关于我们轮播图
  getAboutUsCarousel().then(res => {
    // Strapi 返回格式是 { data: [...], meta: {...} }
    carouselData.value =  res.data
  }).catch(_err => {
  }).finally(() => {
  })

  // 获取关于我们信息
  aboutUsLoading.value = true
  getAboutUsInfos().then(res => {
    aboutUsInfo.value = res.data
    aboutUsError.value = null
  }).catch(err => {
    aboutUsError.value = err.message || '获取关于我们信息失败'
  }).finally(() => {
    aboutUsLoading.value = false
  })

  resizeCanvas();
  if (bgCanvas.value) {
    initParticles(bgCanvas.value.width, bgCanvas.value.height);
    animate();
  }
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  if (animationId !== null) cancelAnimationFrame(animationId);
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="less" scoped>
/* ========= 顶部导航栏 ========= */




.logo-area {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}






/* ========= Banner 图片区域 ========= */
.image-container {
  position: relative;
  width: 100%;
  line-height: 0;
  overflow: hidden;
}

.image-container img {
  display: block;
  width: 100%;
  height: auto;
}

.text-overlay {
  position: absolute;
  top: 20%;
  left: 5%;
  right: 5%;
  max-width: 90%;
}

.title1 {
  color: #ffffff;
  font-size: clamp(1.5rem, 7vw, 3rem);
  font-weight: 700;
  margin-bottom: 4.45rem;
}

.title2 {
  color: #ffffff;
  font-size: clamp(0.85rem, 4vw, 1.3rem);
  font-weight: 400;
}

@media (max-width: 640px) {
  .text-overlay {
    top: 8%;
  }
}

/* ========= 公司资质介绍段落 ========= */
.intro-text {
  max-width: 1180px;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeUp 0.8s ease forwards;
  }

  p {
    font-size: 1rem;
    color: #475569;
    line-height: 1.8;
    margin-bottom: 1rem;
    text-align: left;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeUp 0.8s ease 0.3s forwards;
  }
}

/* 自下向上动画 */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========= Canvas 背景 + 圆形图标 + 轮播卡片整体区域 ========= */
.cert-section {
  position: relative;
  overflow: hidden;
  background: #ffffff;
  /* 后备背景色，canvas会覆盖 */
  min-height: 1140px;
}

.bg-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 0;
}

.cert-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.5rem 4rem;
}

/* 圆形图标 */
.circle-icon {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.04);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  overflow: hidden;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 0.8s ease 0.6s forwards;
}

.circle-icon:hover {
  transform: scale(1.08);
  box-shadow:
    0 15px 32px rgba(0, 0, 0, 0.12),
    0 0 0 2px rgba(0, 0, 0, 0.06);
}

.circle-icon img {
  width: 60%;
  height: 60%;
  object-fit: contain;
  transition: transform 0.3s ease;
  display: block;
  filter: brightness(0) saturate(100%) invert(29%) sepia(87%) saturate(1847%) hue-rotate(201deg) brightness(97%) contrast(93%);
}

.circle-icon:hover img {
  transform: scale(1.1);
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 2rem;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 0.8s ease 0.9s forwards;
}

/* 证书轮播卡片 */
.certificates-carousel {
  width: 100%;
  max-width: 90vw;
  margin: 0 auto;
  margin-top: 120px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 0.8s ease 1.2s forwards;
}

.carousel-container {
  text-align: center;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
}

.carousel-track-container {
  overflow: hidden;
  width: 100%;
  max-width: calc(300px * 3 + 24px * 2);
  margin: 0 auto;
}

@media (max-width: 1000px) {
  .carousel-track-container {
    max-width: calc(300px * 2 + 24px);
  }
}

@media (max-width: 700px) {
  .carousel-track-container {
    max-width: 300px;
  }
}

.carousel-track {
  display: flex;
  gap: 24px;
  will-change: transform;
  padding: 0.75rem 0.75rem;
}

.cert-card {
  flex: 0 0 300px;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border-radius: 20px;
  background: white;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 35px rgba(0, 0, 0, 0.15);
  }
}

.card-inner {
  display: flex;
  flex-direction: column;
  height: 460px;

  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    display: block;
    background: #f8fafc;
  }
}

.card-caption {
  padding: 1rem;
  font-weight: 500;
  color: #1e293b;
  background: white;
  border-top: 1px solid #eef2ff;
}

.carousel-btn {
  background: white;
  border: none;
  font-size: 2rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: #1e293b;

  &:hover:not(:disabled) {
    background: #2563eb;
    color: white;
    transform: scale(1.02);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.8rem;
}

.dot {
  width: 10px;
  height: 10px;
  background: #cbd5e1;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;

  &.active {
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    width: 24px;
    border-radius: 12px;
  }
}

/* 弹窗蒙层 */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
}

.modal-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.3);
}

.modal-close {
  position: absolute;
  top: 24px;
  right: 32px;
  background: none;
  border: none;
  font-size: 3rem;
  font-weight: 300;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
