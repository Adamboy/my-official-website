<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- 左侧：公司信息 + 快速链接 -->
        <div class="footer-left">
          <div class="brand">
            <h2 class="brand-name">融科</h2>
            <p class="brand-desc">
              专注工业无人机吊运解决方案，提供大载重、精准投放、全天候作业服务。
            </p>
          </div>
          <div class="quick-links">
            <h4>快速链接</h4>
            <ul>
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/service">吊运服务</router-link></li>
              <li><router-link to="/cases">成功案例</router-link></li>
              <li><router-link to="/about">关于我们</router-link></li>
              <li><router-link to="/contact">联系我们</router-link></li>
            </ul>
          </div>
        </div>

        <!-- 右侧：上中下三部分 -->
        <div class="footer-right">
          <div class="right-item">
            <div class="item-label">全国服务热线</div>
            <a v-if="publicInfo?.serviceHotline" :href="`tel:${publicInfo.serviceHotline}`" class="hotline">{{ publicInfo.serviceHotline }}</a>
            <a v-else href="tel:13380685782" class="hotline">13380685782</a>
          </div>
          <div class="right-item">
            <div class="item-label">公司地址</div>
            <div class="address">{{ publicInfo?.address || '惠州市惠东县平山街道黄排社区高桥水地段' }}</div>
          </div>
          <div class="right-item social">
            <div class="item-label">关注我们</div>
            <div class="social-icons">
              <div class="social-icon" @mouseenter="showQr('wechat')" @mouseleave="hideQr">
                <img :src="wechatIcon" alt="微信" class="icon-img" loading="lazy" />
                <span>微信</span>
                <div v-if="activeQr === 'wechat'" class="qr-popup">
                  <img :src="wechatQrCode" alt="微信二维码" loading="lazy" />
                  <span>扫一扫关注</span>
                </div>
              </div>
              <div class="social-icon" @mouseenter="showQr('douyin')" @mouseleave="hideQr">
                 <img :src="dyIcon" alt="抖音" class="icon-img" loading="lazy" />
                <span>抖音</span>
                <div v-if="activeQr === 'douyin'" class="qr-popup">
                  <img :src="douyinQrCode" alt="抖音二维码" loading="lazy" />
                  <span>抖音扫码关注</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-copyright">
        <p>&copy; {{ currentYear }} 惠州融科低空科技有限公司</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePublicInfo } from '../composables/usePublicInfo'

const currentYear = new Date().getFullYear()
const activeQr = ref<string | null>(null)
import wechatIcon from '@/assets/icon/link_icon_01.png'
import dyIcon from '@/assets/icon/dy.png'
const { publicInfo, fetchPublicInfo } = usePublicInfo()

// API 基础地址配置
const API_BASE_URL = import.meta.env.VITE_STRAPI_URL || (import.meta.env.DEV ? 'http://localhost:1337' : '')
// 动态二维码路径（使用公共信息数据）
const wechatQrCode = ref('@/assets/icon/wechatma.png')
const douyinQrCode = ref('@/assets/icon/dyma.png')

onMounted(async () => {
  await fetchPublicInfo() 
  // 更新二维码路径（拼接 API 基础 URL）
  if (publicInfo.value) {
    if (publicInfo.value.wechatQrCode) {
      wechatQrCode.value = `${API_BASE_URL}${publicInfo.value.wechatQrCode}`
    }
    if (publicInfo.value.douyinQrCode) {
      douyinQrCode.value = `${API_BASE_URL}${publicInfo.value.douyinQrCode}`
    }
  }
})

const showQr = (type: string) => {
  activeQr.value = type
}
const hideQr = () => {
  activeQr.value = null
}
</script>

<style scoped>
.footer {
  /* 背景图 + 半透明渐变叠加，层次分明且文字可读 */
  background: url('../img/footer_bg.jpg'); /* 请替换为你需要的背景图链接 */
  background-size: cover;
  background-position: center;
  backdrop-filter: blur(1px);
  color: #e5e7eb;
  font-family: 'Segoe UI', 'Poppins', system-ui, sans-serif;
  padding: 3rem 0 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
}

.footer-container {
  max-width: 1300px;
  margin: 0 auto;
  /* padding: 0 1.5rem; */
}

/* 左右网格 + 中间竖线 */
.footer-grid {
  display: flex;
  gap: 4rem;
  position: relative;
  padding-bottom: 2rem;
}

.footer-left {
  flex: 1.2;
}

.footer-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

/* 中间 solid 分隔线（半透） */
.footer-grid::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(45, 55, 72, 0.8);
  transform: translateX(-50%);
}

/* 左侧样式 */
.brand-name {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 0.75rem;
}

.brand-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #cbd5e1;
  margin-bottom: 1.8rem;
  max-width: 380px;
}

.quick-links h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 0.8rem;
  letter-spacing: 0.5px;
}

.quick-links ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
}

.quick-links li a {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
  position: relative;
  display: inline-block;
  padding-bottom: 2px;
}

/* 从左往右滑出下划线（通用） */
.quick-links li a::after,
.hotline::after,
.address::after,
.social-icon span:last-child::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1.5px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.quick-links li a:hover::after,
.hotline:hover::after,
.address:hover::after,
.social-icon:hover span:last-child::after {
  width: 100%;
}

.quick-links li a:hover {
  color: transparent;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
}

/* 右侧每项样式 */
.right-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.item-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #9ca3af;
}

.loading-placeholder {
  color: #9ca3af;
  font-style: italic;
  font-size: 0.9rem;
}

.error-placeholder {
  color: #ef4444;
  font-size: 0.8rem;
  font-style: italic;
}

.hotline {
  font-size: 1.3rem;
  font-weight: 600;
  color: #3b82f6;
  text-decoration: none;
  position: relative;
  display: inline-block;
  width: fit-content;
  padding-bottom: 2px;
}

.hotline:hover {
  color: transparent;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
}

.address {
  font-size: 0.9rem;
  color: #cbd5e1;
  line-height: 1.4;
  position: relative;
  display: inline-block;
  width: fit-content;
  padding-bottom: 2px;
  cursor: default;
}

.address::after {
  bottom: 0;
}

/* 社交图标 - 彻底无抖动版本 */
.social-icons {
  display: flex;
  gap: 1.8rem;
  margin-top: 0.2rem;
}

.social-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  /* 确保任何变化都不影响布局 */
  transition: none;
}

.social-icon:hover {
  /* 只改变透明度和颜色，不改变尺寸 */
  opacity: 0.8;
}

.social-icon span{
    font-size: 0.7rem !important;
}
.social-icon span:last-child::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
  border-radius: 2px;
}


.icon-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.icon-emoji {
  font-size: 28px;
}

/* 二维码弹出框 */
.qr-popup {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 12px;
  background: rgba(255, 255, 255,1); 
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); /* 减少阴影强度 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 120px;
  border: 1px solid rgba(255, 255, 255, 0.2); /* 添加细边框增强定义 */
  z-index: 10;
  opacity: 1;
}

.qr-popup img {
  width: 100px;
  height: 100px;
  display: block;
}

.qr-popup span {
  font-size: 0.7rem;
  color: #111827;
  font-weight: 500;
}

.qr-popup::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: white transparent transparent transparent;
}

/* 底部版权：无分隔线，居左 */
.footer-copyright {
  text-align: left;
  padding-top: 1.5rem;
  font-size: 0.95rem;
  color: #6b7280;
  border-top: none;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 1rem;
  }

  .footer-container {
    padding: 0 1rem;
  }

  .footer-grid {
    flex-direction: column;
    gap: 2rem;
    border-bottom: none;
  }

  .footer-grid::before {
    display: none;
  }

  .footer-left {
    border-bottom: 1px solid rgba(45, 55, 72, 0.8);
    padding-bottom: 1.5rem;
  }

  .footer-right {
    gap: 1.5rem;
  }

  .right-item {
    align-items: center;
    text-align: center;
  }

  .hotline,
  .address {
    display: inline-block;
    width: auto;
  }

  .social-icons {
    justify-content: center;
  }

  .quick-links ul {
    justify-content: center;
  }

  .brand-name,
  .brand-desc {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .quick-links h4 {
    text-align: center;
  }

  .footer-copyright {
    text-align: center;
  }

}
</style>