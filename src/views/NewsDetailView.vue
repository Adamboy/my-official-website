<template>
  <div class="news-detail-page">
    <SceneBanner title="新闻详情" subtitle="深入解读空吊绞盘行业最新案例与技术趋势" watermark="NEWS" />

    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">首页</router-link>
        <span>/</span>
        <router-link to="/news">行业新闻</router-link>
        <span>/</span>
        <span>{{ articleData.title }}</span>
      </div>

      <div class="article-layout">
        <main class="article-main">
          <article class="article-card">
            <div class="article-header">
              <span class="article-tag">{{ articleData.tag }}</span>
              <h1>{{ articleData.title }}</h1>
              <div class="article-meta">
                <span>{{ articleData.date }}</span>
                <span>•</span>
                <span>{{ articleData.author }}</span>
                <span>•</span>
                <span>{{ articleData.readTime }}</span>
              </div>
              <p class="article-lead">{{ articleData.intro }}</p>
              <div class="article-cover" v-if="articleData.cover">
                <img :src="articleData.cover" :alt="articleData.title" loading="lazy" />
              </div>
            </div>

            <div class="article-body">
              <!-- 根据 detail_blocks 动态渲染内容 -->
               {{}}
              <div v-for="(block, index) in articleData.detailBlocks" :key="index" class="detail-block">
                <!-- 文本块 -->
                <section v-if="block.__component === 'text-block.text-block'" class="article-section">
                  <h2>{{ block.title }}</h2>
                  <p>{{ block.content }}</p>
                </section>

                <!-- 纯文本 -->
                <section v-else-if="block.__component === 'only-text.only-text'" class="article-section">
                  <p>{{ block.text }}</p>
                </section>

                <!-- 图片块 -->
                <section v-else-if="block.__component === 'image-block.image-block'" class="article-section">
                  <div class="article-image-block">
                    <img :src="block.imageUrl?.url ? `${API_BASE_URL}${block.imageUrl.url}` : ''" :alt="block.caption || ''" loading="lazy" />
                    <span v-if="block.caption" class="image-caption">{{ block.caption }}</span>
                  </div>
                </section>

                <!-- 富文本 -->
                <section v-else-if="block.__component === 'rich-text.rich-text'" class="article-section">
                  <h2>{{ block.title }}</h2>
                  <div class="rich-text-content" v-html="renderRichText(block.richText || [])"></div>
                </section>
              </div>

              <!-- 默认段落 -->
              <section class="article-section" v-if="articleData.conclusion">
                <h2>项目价值与未来展望</h2>
                <p>{{ articleData.conclusion }}</p>
              </section>
            </div>
          </article>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import SceneBanner from '../components/SceneBanner.vue'
import { getNewsDetail } from '../api/article';

// API 基础地址配置
const API_BASE_URL = import.meta.env.VITE_STRAPI_URL || (import.meta.env.DEV ? 'http://localhost:1337' : '')

// 分类映射
const categoryMap: Record<string, string> = {
  company: '企业新闻',
  public: '信息公示',
  third: '第三方报道'
}

// 文章数据类型
interface DetailBlock {
  __component: string
  id: number
  title?: string
  content?: string
  text?: string
  caption?: string
  captions?: string[]
  imageUrl?: {
    url: string
  }
  richText?: Array<{
    type: string
    children: Array<{
      type: string
      text: string
      italic?: boolean
    }>
    format?: string
    level?: number
  }>
}

interface ArticleData {
  id: any
  tag: string
  date: string
  author: string
  readTime: string
  title: string
  intro: string
  cover: string
  detailBlocks: DetailBlock[]
  conclusion: string
}

const route = useRoute()
const articleId = route.params.id as string

// 文章数据
const articleData = ref<ArticleData>({
  id: 0,
  tag: '企业新闻',
  date: '',
  author: '融科低空官方',
  readTime: '阅读 3 分钟',
  title: '',
  intro: '',
  cover: '',
  detailBlocks: [],
  conclusion: ''
})

// 渲染富文本
const renderRichText = (richText: any[]): string => {
  if (!richText || !Array.isArray(richText)) return ''
  
  return richText.map((block) => {
    if (block.type === 'paragraph') {
      const text = block.children?.map((child: any) => {
        if (child.italic) {
          return `<em>${child.text || ''}</em>`
        }
        return child.text || ''
      }).join('')
      return `<p>${text}</p>`
    } else if (block.type === 'heading') {
      const level = block.level || 1
      const text = block.children?.map((child: any) => child.text || '').join('')
      return `<h${level + 1}>${text}</h${level + 1}>`
    } else if (block.type === 'list') {
      const listItems = block.children?.map((item: any) => {
        const itemText = item.children?.map((child: any) => child.text || '').join('')
        return `<li>${itemText}</li>`
      }).join('')
      return `<ul>${listItems}</ul>`
    }
    return ''
  }).join('')
}

// 获取新闻详情
const fetchData = async () => {
  try {
    const response = await getNewsDetail(articleId)
    
    if (response.data) {
      const data = response.data
      
      articleData.value = {
        id: data.id,
        tag: categoryMap[data.type] || '企业新闻',
        date: data.pushDate || new Date().toISOString().split('T')[0],
        author: '融科低空官方',
        readTime: '阅读 3 分钟',
        title: data.title || '无标题',
        intro: data.summary || '',
        cover: data.newImageUrl?.url ? `${API_BASE_URL}${data.newImageUrl.url}` : '',
        detailBlocks: data.detail_blocks || [],
        conclusion: ''
      }
    }
  } catch (error) {
    console.error('获取新闻详情失败:', error)
    // 使用默认数据作为降级
    articleData.value = {
      id: articleId,
      tag: '企业新闻',
      date: '2026-04-10',
      author: '融科低空官方',
      readTime: '阅读 3 分钟',
      title: '融科低空：资质与无人机吊运服务能力全景介绍',
      intro: '通过中铁建工委托函、CAAC运营合格证与低空经济业务备案，展示公司在无人机吊运工程、培训与综合服务方面的合法能力与项目实力',
      cover: '',
      detailBlocks: [
        {
          __component: 'text-block.text-block',
          id: 1,
          title: '授权与委托案例',
          content: '中铁建工集团及其分包方河南明城建筑出具的无人机吊运作业委托函，确认了惠州市融科低空科技有限公司在广州番禺区开展水泥沙石吊运的服务内容与作业时间。'
        },
        {
          __component: 'only-text.only-text',
          id: 2,
          text: '该委托函明确了作业空域、高度等合规要求，并由委托单位盖章确认，体现了真实项目的服务能力。'
        },
        {
          __component: 'text-block.text-block',
          id: 3,
          title: '核心合规资质',
          content: '融科低空拥有中国民用航空局（CAAC）颁发的民用无人驾驶航空器运营合格证。'
        }
      ],
      conclusion: ''
    }
  }
}

onMounted(() => {
  fetchData();
  console.log('我只想了')
});
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

/* 图片块样式 */
.article-image-block {
  margin: 1.5rem 0;
  border-radius: 1rem;
  overflow: hidden;
}

.article-image-block img {
  display: block;
  width: 100%;
  height: auto;
}

.image-caption {
  display: block;
  text-align: center;
  padding: 0.8rem 0;
  color: #64748b;
  font-size: 0.9rem;
  background: #f8fafc;
}

/* 富文本内容样式 */
.rich-text-content {
  line-height: 2;
  color: #334155;
}

.rich-text-content p {
  margin-bottom: 1.25rem;
}

/* 详情块间距 */
.detail-block {
  margin-bottom: 2.8rem;
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
