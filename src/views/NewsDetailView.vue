<template>
  <div class="news-detail-page">
    <SceneBanner
      title="新闻详情"
      subtitle="深入解读空吊绞盘行业最新案例与技术趋势"
      watermark="NEWS"
    />

    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">首页</router-link>
        <span>/</span>
        <router-link to="/news">行业新闻</router-link>
        <span>/</span>
        <span>{{ article.title }}</span>
      </div>

      <div class="article-layout">
        <main class="article-main">
          <article class="article-card">
            <div class="article-header">
              <span class="article-tag">{{ article.tag }}</span>
              <h1>{{ article.title }}</h1>
              <div class="article-meta">
                <span>{{ article.date }}</span>
                <span>•</span>
                <span>{{ article.author }}</span>
                <span>•</span>
                <span>{{ article.readTime }}</span>
              </div>
              <p class="article-lead">{{ article.intro }}</p>
              <div class="article-cover">
                <img :src="article.cover" :alt="article.title" loading="lazy" />
              </div>
            </div>

            <div class="article-body">
              <section
                class="article-section"
                v-for="(section, index) in article.sections"
                :key="index"
              >
                <h2>{{ section.heading }}</h2>
                <p v-for="(paragraph, idx) in section.content" :key="idx">
                  {{ paragraph }}
                </p>
                <ul v-if="section.points">
                  <li v-for="(point, idx) in section.points" :key="idx">
                    {{ point }}
                  </li>
                </ul>
              </section>

              <blockquote class="article-quote">{{ article.quote }}</blockquote>

              <section class="article-section">
                <h2>项目价值与未来展望</h2>
                <p>{{ article.conclusion }}</p>
              </section>
            </div>
          </article>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SceneBanner from '../components/SceneBanner.vue'

const pdfCover = new URL('../assets/pdf_images/pdf_image_page1_1.jpg', import.meta.url).href

type NewsArticle = {
  id: number
  tag: string
  date: string
  author: string
  readTime: string
  title: string
  intro: string
  cover: string
  sections: Array<{ heading: string; content: string[]; points?: string[] }>
  quote: string
  conclusion: string
  tags: string[]
}

const route = useRoute()
const articleId = Number(route.params.id || 1)

const articles: NewsArticle[] = [
  {
    id: 1,
    tag: '技术升级',
    date: '2026-04-10',
    author: '易载航空研究员',
    readTime: '阅读 4 分钟',
    title: '智能绞盘系统助力无人机吊运进入新阶段',
    intro:
      '通过自动化控制与远程监测，绞盘作业精度进一步提升，行业施工效率显著提高。本文解读典型应用案例、核心技术优势与落地价值。',
    cover: 'https://picsum.photos/id/1018/1200/700',
    sections: [
      {
        heading: '背景概述',
        content: [
          '近年来，无人机空吊绞盘在高层建筑、桥梁施工与应急抢险领域获得了快速推广。面对复杂环境，智能控制与远程诊断成为应用关键。',
          '本次案例聚焦一种具备高精度张力控制、自动避障和全天候运行能力的智能绞盘系统。'
        ]
      },
      {
        heading: '技术亮点',
        content: [
          '该系统通过动态负载调节与同步张力控制，将吊运误差控制在毫米级。配合边缘计算设备，可在现场实时分析作业状态并自动调整参数。'
        ],
        points: [
          '一体化云端监控与故障预警',
          '模块化防护设计支持雨雪环境作业',
          '支持多平台任务协同，提升施工效率'
        ]
      },
      {
        heading: '落地成果',
        content: [
          '实际项目中，智能绞盘系统将吊运周期缩短了 18%，同时累计节省现场人力成本 21%。项目现场运行期间未发生一次安全事故，整体作业稳定性显著提升。'
        ]
      }
    ],
    quote:
      '“当技术与场景深度结合，空吊绞盘不仅是工具，更成为施工效率与安全管理的核心。”',
    conclusion:
      '进入 2026 年，行业对智能化、可视化绞盘系统的需求愈发明确。未来，更多项目将在“轻量化、智能化、协同化”方向展开，推动空吊业务从单点作业向全链路解决方案转型。',
    tags: ['智能绞盘', '无人机吊运', '施工效率', '安全控制']
  },
  {
    id: 2,
    tag: '市场热点',
    date: '2026-04-08',
    author: '行业分析师',
    readTime: '阅读 3 分钟',
    title: '城市旧楼改造需求推动空吊服务快速增长',
    intro:
      '随着城市更新计划加速，轻量化空吊服务在旧楼改造中的应用愈发广泛。本文分析市场驱动因素与最佳实践。',
    cover: 'https://picsum.photos/id/1027/1200/700',
    sections: [
      {
        heading: '市场趋势',
        content: [
          '城市更新与旧楼改造对施工灵活性、现场占地和噪声控制提出了更高要求。空吊绞盘以低扰动、快速部署的优势在改造现场获得青睐。'
        ]
      },
      {
        heading: '典型应用',
        content: [
          '案例显示，通过无人机空吊设备进行材料运输与小型构件吊装，可以避免大型机械进场，降低对周边社区的影响。'
        ],
        points: ['减少地面施工占用', '提高拆装节奏', '改善施工安全管理']
      }
    ],
    quote:
      '“在城市更新中，空吊服务成为空间受限环境下最灵活的施工方式之一。”',
    conclusion:
      '未来，城市旧楼改造项目将持续成为空吊服务的重要增长点，企业需在产品轻量化与服务响应速度上下功夫。',
    tags: ['城市更新', '旧楼改造', '空吊服务']
  },
  {
    id: 3,
    tag: '案例分享',
    date: '2026-04-05',
    author: '项目经理',
    readTime: '阅读 3 分钟',
    title: '高层住宅吊装项目：安全与速度如何兼得？',
    intro:
      '本案例总结高层住宅吊装作业的关键控制点，展示了技术优化和现场协同如何保障速度与安全并重。',
    cover: 'https://picsum.photos/id/1039/1200/700',
    sections: [
      {
        heading: '项目挑战',
        content: [
          '高层住宅吊装现场空间紧凑、风速变化快，传统大型吊机难以满足快速切换与场地适应需求。'
        ]
      },
      {
        heading: '解决方案',
        content: [
          '采用无人机空吊绞盘结合模块化索具，实现快速搭建与精确吊运。现场调度依托实时数据监控，动态调整吊运方案。'
        ],
        points: ['构件精准定位', '快速方案切换', '可视化安全监测']
      }
    ],
    quote:
      '“在高层吊装中，安全管理和任务速度不是对立，而是需要同样重视的两个核心指标。”',
    conclusion:
      '该项目证明了现代空吊技术在高层住宅建设中的可行性，未来类项目将更多依赖智能化吊装方案来兼顾施工进度与安全风险。',
    tags: ['高层吊装', '现场协同', '安全管理']
    },
    {
      id: 4,
      tag: '资质案例',
      date: '2026-04-15',
      author: '融科低空官方',
      readTime: '阅读 3 分钟',
      title: '融科低空：资质与无人机吊运服务能力全景介绍',
      intro:
        '通过中铁建工委托函、CAAC运营合格证与低空经济业务备案，展示公司在无人机吊运工程、培训与综合服务方面的合法能力与项目实力。',
      cover: pdfCover,
      sections: [
        {
          heading: '授权与委托案例',
          content: [
            '中铁建工集团及其分包方河南明城建筑出具的无人机吊运作业委托函，确认了惠州市融科低空科技有限公司在广州番禺区开展水泥沙石吊运的服务内容与作业时间。',
            '该委托函明确了作业空域、高度等合规要求，并由委托单位盖章确认，体现了真实项目的服务能力。'
          ]
        },
        {
          heading: '核心合规资质',
          content: [
            '融科低空拥有中国民用航空局（CAAC）颁发的民用无人驾驶航空器运营合格证，编号 UAOC-0-HQ-20250802011。',
            '证书支持留空飞行、航线飞行、其他飞行，以及载货类（吊运）、培训类和其他类运营类型，具备法定商业运营资格。'
          ]
        },
        {
          heading: '业务能力与服务范围',
          content: [
            '公司业务备案信息表显示其具备无人机研发设计、运营服务、整机租赁、飞手培训、解决方案和咨询服务等多元能力。'
          ],
          points: ['农业植保与农业吊运', '光伏板吊运与工程吊运', '铁塔吊运与高空吊装', '合法空域培训场地与专业装备']
        }
      ],
      quote:
        '“合法资质是无人机商务运营的核心，真实项目案例是服务能力的最好证明。”',
      conclusion:
        '融科低空凭借完整资质与真实项目案例，为无人机吊运工程的合规开展、现场安全和服务交付提供了有力支撑。',
      tags: ['无人机吊运', '资质合规', '项目案例']
    }
  ]

const article = computed(() => articles.find((item) => item.id === articleId) || articles[0])
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.news-detail-page {
  background: #ffffff;
  min-height: 100vh;
  padding: 3rem 0 4.5rem;
}

.container {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 2rem;
}

.breadcrumb a {
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb a:hover {
  color: #1d4ed8;
}

.breadcrumb span {
  color: #94a3b8;
}

.article-layout {
  display: grid;
  grid-template-columns: 1fr;
}

.article-main {
  min-width: 0;
}

.article-card {
  background: #ffffff;
  border-radius: 2rem;
  padding: 2.5rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 30px 70px rgba(15, 23, 42, 0.08);
}

.article-header {
  margin-bottom: 2.2rem;
}

.article-tag {
  display: inline-flex;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  color: #2563eb;
  font-weight: 700;
  font-size: 0.93rem;
  margin-bottom: 1.1rem;
  letter-spacing: 0.03em;
}

.article-header h1 {
  margin: 0;
  font-size: clamp(2.2rem, 3.2vw, 3.4rem);
  line-height: 1.04;
  color: #0f172a;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  color: #64748b;
  margin: 1.1rem 0 1.8rem;
  font-size: 0.95rem;
}

.article-meta span {
  display: inline-flex;
  align-items: center;
}

.article-lead {
  color: #475569;
  line-height: 1.95;
  margin-bottom: 2rem;
  font-size: 1.08rem;
}

.article-cover {
  border-radius: 1.6rem;
  overflow: hidden;
  box-shadow: 0 34px 72px rgba(15, 23, 42, 0.12);
  margin-bottom: 2.4rem;
}

.article-cover img {
  display: block;
  width: 100%;
  height: auto;
}

.article-body {
  color: #334155;
  line-height: 2;
}

.article-section {
  margin-bottom: 2.8rem;
}

.article-section h2 {
  margin-bottom: 1rem;
  font-size: clamp(1.6rem, 2.4vw, 2rem);
  color: #0f172a;
}

.article-section p {
  margin-bottom: 1.25rem;
}

.article-section ul {
  margin: 1rem 0 0 1.25rem;
  list-style: disc;
  color: #475569;
}

.article-section li {
  margin-bottom: 0.9rem;
}

.article-quote {
  margin: 0 0 2.5rem;
  padding: 1.8rem 1.6rem;
  border-left: 4px solid #3b82f6;
  background: #f8fbff;
  color: #0f172a;
  font-style: italic;
  border-radius: 1.2rem;
}

@media (max-width: 900px) {
  .article-card {
    padding: 2rem;
  }
}

@media (max-width: 700px) {
  .news-detail-page {
    padding: 2rem 0 3rem;
  }

  .container {
    padding: 0 1rem;
  }

  .article-card {
    padding: 1.5rem;
  }

  .article-header h1 {
    font-size: 2rem;
  }

  .article-lead {
    font-size: 1rem;
  }
}
</style>
