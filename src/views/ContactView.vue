<!-- ContactPage.vue -->
<template>
  <div class="contact-page">
    <!-- 场景横幅，按需替换 -->
    <SceneBanner title="联系我们" subtitle="欢迎与我们取得联系，获取无人机吊运与工程服务支持。" watermark="CONTACT" />

    <section class="contact-section">
      <div class="contact-map-block">
        <!-- 地图容器 -->
        <div class="map-container">
          <div ref="mapContainer" class="map-content"></div>
        </div>
        <div class="contact-info">
          <h3>联系方式</h3>
          <ul>
            <li><strong>电话：</strong>
              <span v-if="loading">加载中...</span>
              <span v-else-if="error" class="error-text">{{ error }}</span>
              <span v-else>{{ publicInfo?.phone || '13380685782' }}</span>
            </li>
            <li><strong>邮箱：</strong>
              <span v-if="loading">加载中...</span>
              <span v-else-if="error" class="error-text">{{ error }}</span>
              <span v-else>{{ publicInfo?.email || 'info@rongke-uav.com' }}</span>
            </li>
            <li><strong>地址：</strong>
              <span v-if="loading">加载中...</span>
              <span v-else-if="error" class="error-text">{{ error }}</span>
              <span v-else>{{ publicInfo?.address || '惠州市惠东县融科无人机培训基地' }}</span>
            </li>
          </ul>
          <div class="contact-social">
            <!-- 可以在此处添加社交媒体图标，例如微信、抖音等 -->
          </div>
        </div>
      </div>
      <div class="contact-form-block">
        <h3>在线留言</h3>
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-row">
            <input v-model="form.name" type="text" placeholder="姓名" required />
            <input v-model="form.email" type="email" placeholder="邮箱" required />
            <input v-model="form.other" type="text" placeholder="其他联系方式"/>
          </div>
          <textarea v-model="form.message" placeholder="留言内容" required rows="4"></textarea>
          <button type="submit" :disabled="formLoading">{{ formLoading ? '提交中...' : '提交' }}</button>
        </form>
        <div v-if="submitted" class="form-success">感谢您的留言，我们会尽快联系您！</div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SceneBanner from '../components/SceneBanner.vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { usePublicInfo } from '../composables/usePublicInfo'
import { submitContactForm } from '../api/article'

const { publicInfo, loading, error, fetchPublicInfo } = usePublicInfo()

// --- 地图相关配置 ---
const mapContainer = ref<HTMLDivElement | null>(null)
let map: any = null

// 高德开放平台申请的 API Key（JavaScript API 与 Web 服务类型均可）
const AMAP_KEY = '88de84e720cde5a26af5f131f71763ce'   // ⬅️ 请替换为你的高德地图 API Key

// 【重要】坐标请务必从高德坐标拾取器获取：https://lbs.amap.com/tools/picker
// 下方为示例坐标（惠东县城中心），请替换为你获取到的精确坐标
// 格式：[经度, 纬度]
const companyLngLat = [114.738514, 22.962216]  // ⬅️ 请替换为融科无人机培训基地的实际坐标

// --- 留言表单相关配置 ---
const form = ref({
  name: '',
  email: '',
  message: '',
  other: ''
})
const submitted = ref(false)
const formLoading = ref(false)

// 提交表单（真实 API 调用）
function submitForm() {
  formLoading.value = true

  submitContactForm({
    name: form.value.name,
    email: form.value.email,
    message: form.value.message,
    other: form.value.other
  })
    .then(() => {
      submitted.value = true
      form.value = { name: '', email: '', message: '', other: '' }
      setTimeout(() => submitted.value = false, 3000)
    })
    .catch((error) => {
      console.error('提交表单失败:', error)
      alert('提交失败，请稍后重试')
    })
    .finally(() => {
      formLoading.value = false
    })
}

// --- 初始化地图 ---
onMounted(async () => {
  // 获取公共信息数据
  await fetchPublicInfo()

  if (!mapContainer.value) return

  try {
    // 加载高德地图 JS API 2.0
    const AMap = await AMapLoader.load({
      key: AMAP_KEY,
      version: '2.0',
      plugins: ['AMap.Marker', 'AMap.InfoWindow']
    })

    // 创建地图实例
    map = new AMap.Map(mapContainer.value, {
      zoom: 15,                 // 缩放级别，可根据需要调整
      center: companyLngLat,    // 地图中心点（培训基地坐标）
      viewMode: '2D',
    })

    // 添加标记点
    const marker = new AMap.Marker({
      position: companyLngLat,
      title: '融科无人机培训基地',
    })
    marker.setMap(map)

    // 添加点击后弹出的信息窗口
    const infoWindow = new AMap.InfoWindow({
      content: `
        <div style="padding: 8px 12px; font-size: 14px; line-height: 1.4;">
          <strong>融科无人机培训基地</strong><br>
          惠州市惠东县融科无人机培训基地
        </div>
      `,
      offset: new AMap.Pixel(0, -30),
    })
    marker.on('click', () => {
      infoWindow.open(map, marker.getPosition())
    })

    // 可选：地图加载完成后自动打开一次信息窗
    infoWindow.open(map, companyLngLat)

    // 启用滚轮缩放
    map.enableScrollWheelZoom(true)
  } catch (error) {
    console.error('地图加载失败:', error)
  }
})

// 组件销毁时销毁地图实例（释放资源）
onUnmounted(() => {
  if (map) {
    map.destroy()
    map = null
  }
})
</script>

<style lang="less" scoped>
.contact-section {
  max-width: 1180px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.contact-map-block {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.map-container {
  flex: 1 1 380px;
  min-width: 320px;
  min-height: 260px;
  background: #f1f5f9;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;
}

.map-content {
  width: 100%;
  height: 100%;
  min-height: 260px;
}

.contact-info {
  flex: 1 1 260px;
  min-width: 240px;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.08);
  padding: 2rem 1.5rem;
}

.contact-info h3 {
  margin-bottom: 1.2rem;
  color: #0f172a;
  font-size: 1.2rem;
}

.contact-info ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.2rem 0;
}

.contact-info li {
  margin-bottom: 0.7rem;
  color: #475569;
}

.contact-social {
  display: flex;
  gap: 1.1rem;
  margin-top: 0.5rem;
}

.contact-social img {
  width: 28px;
  height: 28px;
}

.contact-form-block {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.08);
  padding: 2rem 1.5rem;
  max-width: 600px;
}

.contact-form-block h3 {
  margin-bottom: 1.2rem;
  color: #0f172a;
  font-size: 1.2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-row {
  display: flex;
  gap: 1.2rem;
}

.form-row input {
  flex: 1 1 0;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 0.8rem;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  color: #0f172a;
  background: #f8fafc;
  outline: none;
  transition: border-color 0.2s;
}

input:focus,
textarea:focus {
  border-color: #2563eb;
}

button[type="submit"] {
  background: linear-gradient(90deg, #2563eb 0%, #60a5fa 100%);
  color: #fff;
  border: none;
  border-radius: 0.8rem;
  padding: 0.9rem 2.2rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

button[type="submit"]:hover {
  background: linear-gradient(90deg, #1d4ed8 0%, #38bdf8 100%);
}

.form-success {
  margin-top: 1.2rem;
  color: #22c55e;
  font-weight: 700;
  background: #dcfce7;
  border: 1px solid #bbf7d0;
  border-radius: 0.8rem;
  padding: 1rem 1.2rem;
  text-align: center;
  animation: fadeIn 0.5s ease;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.15);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .contact-map-block {
    flex-direction: column;
    gap: 1.5rem;
  }
}

@media (max-width: 700px) {
  .contact-section {
    padding: 2rem 0.5rem 2.5rem;
  }

  .contact-form-block {
    padding: 1.2rem 0.7rem;
  }

  .contact-info {
    padding: 1.2rem 0.7rem;
  }

  .map-content {
    min-height: 220px;
  }
}

.error-text {
  color: #ef4444;
  font-size: 0.9rem;
  font-style: italic;
}
</style>