import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: '应用场景',
      subtitle: '无人机空吊绞盘专业开发商',
      watermark: 'APPLICATION',
      description: '融科低空提供城市旧楼、建筑工地、山地运输等多场景无人机吊运服务，空中直达搬运更高效。'
    }
  },
    {
    path: '/service',
    name: 'service',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: '吊运服务',
      subtitle: '无人机吊运服务覆盖城市旧楼、高层建筑、山地工地与应急抢险。',
      watermark: 'SERVICE',
      description: '融科低空提供专业无人机吊运服务，覆盖城市旧楼搬运、工地建材输送、光伏组件吊装、山地物资运输等应用场景。'
    }
  },
  //   {
  //   path: '/tech',
  //   name: 'tech',
  //   redirect: '/#tech', // 重定向到首页的 tech 锚点
  //   meta: {
  //     title: '技术优势',
  //     subtitle: '智能无人机吊运技术，让复杂场景也能实现快速、安全、可控的空中搬运。',
  //     watermark: 'ADVANTAGE'
  //   }
  // },
    {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/DetailView.vue'),
    meta: {
      title: '无人机吊运场景详情',
      subtitle: '查看产品详细信息',
      watermark: 'DETAIL',
      description: '查看不同场景的无人机吊运解决方案与优势分析。'
    }
  },
    {
    path: '/cases',
    name: 'cases',
    component: () => import('../views/CasesView.vue'),
    meta: {
      title: '成功案例',
      subtitle: '无人机吊运在真实工程中的落地实践',
      watermark: 'CASE',
      description: '展示融科低空在真实工程中的落地实践，包括广州番禺水泥沙石吊运项目等。'
    }
  },
    {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: '关于我们',
      subtitle: '融科低空资质、合规与服务能力介绍',
      watermark: 'ABOUT',
      description: '融科低空凭借 CAAC 运营合格证与中铁建工集团委托函，提供合规资质与工程级无人机吊运服务。'
    }
  },
    {
    path: '/news',
    name: 'news',
    component: () => import('../views/IndustryNewsView.vue'),
    meta: {
      title: '行业新闻',
      subtitle: '掌握空吊行业最新趋势',
      watermark: 'NEWS',
      description: '了解低空经济与无人机运输行业最新发展趋势、政策解读与技术创新动态。'
    }
  },
  {
    path: '/news/:id',
    name: 'news-detail',
    component: () => import('../views/NewsDetailView.vue'),
    meta: {
      title: '新闻详情',
      subtitle: '深入解读行业趋势与案例分析',
      watermark: 'NEWS'
    }
  },
    {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: '联系我们',
      subtitle: '获取无人机吊运与工程服务支持',
      watermark: 'CONTACT',
      description: '欢迎咨询融科低空的无人机吊运与工程服务，获取专业方案支持与合作机会。'
    }
  }
]

// Interface for route meta
interface RouteMeta {
  title?: string
  subtitle?: string
  description?: string
  keywords?: string[]
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    // /service 重定向到 #application
    if (to.path === '/service') {
      return {
        el: '#application',
        behavior: 'smooth'
      }
    }
    // /tech 重定向到 #tech（已在路由中配置 redirect）
    // 当用户访问 /#tech 时，这里的 to.hash 会匹配
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

// Route guard for SEO meta updates
router.beforeEach((to, _from, next) => {
  const meta = to.meta as RouteMeta
  
  // Update page title
  if (meta?.title) {
    document.title = `${meta.title} - 融科低空`
  } else {
    document.title = '融科低空 | 无人机空吊绞盘专业开发商'
  }
  
  // Update meta description if available
  if (meta?.description) {
    let descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement
    if (!descEl) {
      descEl = document.createElement('meta')
      descEl.setAttribute('name', 'description')
      document.head.appendChild(descEl)
    }
    descEl.content = meta.description
  }
  
  next()
})

export default router