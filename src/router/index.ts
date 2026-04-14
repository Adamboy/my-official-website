import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '应用场景',
      subtitle: '无人机空吊绞盘专业开发商',
      watermark: 'APPLICATION'
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/DetailView.vue'),
    meta: {
      title: '详情页面',
      subtitle: '查看产品详细信息',
      watermark: 'DETAIL'
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/IndustryNewsView.vue'),
    meta: {
      title: '行业新闻',
      subtitle: '掌握空吊行业最新趋势',
      watermark: 'NEWS'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router