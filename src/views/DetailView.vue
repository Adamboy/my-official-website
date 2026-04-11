<template>
  <div class="detail-page">
    <div class="container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/">首页</router-link> / 
        <span>产品详情</span>
      </div>

      <!-- 主要内容区域 -->
      <div class="detail-content">
        <div class="detail-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="detail-info">
          <h1>{{ product.name }}</h1>
          <p class="price">¥{{ product.price }}</p>
          <p class="description">{{ product.description }}</p>
          <button class="btn btn-primary">立即购买</button>
          <button class="btn btn-outline">加入收藏</button>
        </div>
      </div>

      <!-- 详细规格或额外信息 -->
      <div class="extra-section">
        <h3>产品规格</h3>
        <ul>
          <li v-for="(spec, idx) in product.specs" :key="idx">{{ spec }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = route.params.id

// 模拟根据 id 获取产品数据（实际可从 API 获取）
const product = ref({
  id: productId,
  name: '智能手表 Pro',
  price: 1299,
  image: 'https://picsum.photos/id/20/600/400',
  description: '超长续航，健康监测，运动追踪，时尚设计。适合日常佩戴和运动场景。',
  specs: ['1.8英寸 AMOLED 屏幕', '心率/血氧监测', '5ATM 防水', '14天续航']
})
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.detail-page {
  padding: @spacing-lg 0;
}
.breadcrumb {
  margin-bottom: @spacing-lg;
  color: #6b7280;
  a {
    color: @primary-color;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: @spacing-xl;
  margin-bottom: @spacing-xl;
}
.detail-image img {
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
}
.detail-info {
  h1 {
    font-size: 2rem;
    margin-bottom: @spacing-md;
  }
  .price {
    font-size: 1.5rem;
    color: @primary-color;
    font-weight: bold;
    margin-bottom: @spacing-md;
  }
  .description {
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: @spacing-lg;
  }
  .btn {
    margin-right: @spacing-md;
  }
}
.extra-section {
  border-top: 1px solid #e5e7eb;
  padding-top: @spacing-lg;
  h3 {
    margin-bottom: @spacing-md;
  }
  ul {
    list-style: disc;
    padding-left: @spacing-lg;
    color: #4b5563;
  }
}
@media (max-width: @screen-md) {
  .detail-content {
    grid-template-columns: 1fr;
    gap: @spacing-lg;
  }
}
</style>