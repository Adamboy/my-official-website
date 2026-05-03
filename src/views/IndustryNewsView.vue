<template>
  <div class="news-page">
    <div class="hero-banner">
      <img src="../img/new.jpg" alt="行业观察" class="banner-image" />
    </div>

    <section class="news-section">
      <nav class="tab-bar">
        <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" @click="switchTab(tab.id)">
          {{ tab.label }}
        </button>
      </nav>

      <div class="news-grid">
        <article v-for="item in paginatedNews" :key="item.id" class="news-card">
          <img :src="item.cover" class="news-cover" loading="lazy" />
          <div class="news-meta">
            <span class="news-tag">{{ item.tag }}</span>
            <span class="news-date">{{ item.date }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
          <router-link :to="`/news/${item.id}`" class="news-link">阅读全文</router-link>
        </article>
      </div>

      <div v-if="totalPages > 1" class="pagination">
        <button class="pagination-btn" :disabled="currentPage === 1" @click="setPage(currentPage - 1)">
          上一页
        </button>
        <div class="pagination-pages">
          <template v-for="page in displayedPages" :key="page">
            <span v-if="page === '...'" class="pagination-ellipsis">…</span>
            <button v-else class="pagination-num" :class="{ active: currentPage === page }"
              @click="setPage(page as number)">
              {{ page }}
            </button>
          </template>
        </div>
        <button class="pagination-btn" :disabled="currentPage === totalPages" @click="setPage(currentPage + 1)">
          下一页
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getIndustryNews } from '../api/article';

type TabId = "all" | "company" | "public" | "third";
interface NewsItem {
  id: number;
  category: string;
  tag: string;
  date: string;
  title: string;
  summary: string;
  link: string;
  cover: string;
}

const API_BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

const tabs: { id: TabId; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "company", label: "企业新闻" },
  { id: "public", label: "信息公示" },
  { id: "third", label: "第三方报道" },
];

const activeTab = ref<TabId>("all");
const currentPage = ref(1);
const pageSize = 6;

const DEFAULT_COVER = "https://picsum.photos/id/1/400/240";

const industryNewsData = ref<any[]>([]);
const totalItems = ref(0);

// ==============================================
// 核心：映射接口数据
// ==============================================
const news = computed((): NewsItem[] => {
  const tagMap: Record<string, string> = {
    company: "企业新闻",
    public: "信息公示",
    third: "第三方报道",
  };

  return industryNewsData.value.map((item: any) => {
    return {
      id:item.documentId,
      category: item.type || "company",
      tag: tagMap[item.type] || "企业新闻",
      date: item.pushDate || new Date().toISOString().split('T')[0],
      title: item.title || "无标题",
      summary: item.summary || "",
      link: `/news/${item.sortid}`,
      cover: item.newImageUrl?.url ? `${API_BASE_URL}${item.newImageUrl.url}` : DEFAULT_COVER,
    };
  });
});

const currentNewsList = computed(() => news.value);
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize));

const paginatedNews = computed(() => currentNewsList.value);

const displayedPages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
});

const setPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchData();
  }
};

const switchTab = (tab: TabId) => {
  activeTab.value = tab;
  currentPage.value = 1;
  fetchData();
};

// ==============================================
// 正确调用接口：筛选 + 分页
// ==============================================
const fetchData = async () => {
  const res = await getIndustryNews({
    type: activeTab.value === "all" ? "" : activeTab.value,
    page: currentPage.value,
    pageSize: pageSize,
  });

  industryNewsData.value = res.data;
  totalItems.value = (res as any).meta.pagination.total;
};

onMounted(() => {
  fetchData();
});
</script>

<style lang="less" scoped>
// 你的样式完全不变，保留
@primary-gradient-start: #3b82f6;
@primary-gradient-end: #06b6d4;
@border-light: rgba(59, 130, 246, 0.16);
@shadow-light: 0 26px 60px rgba(15, 23, 42, 0.06);
@shadow-hover: 0 38px 90px rgba(15, 23, 42, 0.12);
@card-radius: 22px;
@banner-bg: #eef2ff;
@page-bg: #f8fbff;

.tab-bar {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem 2rem 0rem;
  margin: 0 auto;
}

.tab-bar button {
  padding: 0.6rem 1rem;
  border: none;
  background: white;
  cursor: pointer;
  border-radius: 24px;
  font-weight: 500;
  transition: background 0.2s;
}

.tab-bar button.active,
.tab-bar button:hover {
  background: linear-gradient(135deg, @primary-gradient-start, @primary-gradient-end);
  color: white;
}

.hero-banner {
  width: 100%;
  overflow: hidden;
  background-color: @banner-bg;
}

.banner-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

@media (max-width: 700px) {
  .banner-image {
    object-fit: contain;
    aspect-ratio: auto;
    background-color: #f1f5f9;
  }
}

.news-page {
  background: @page-bg;
  min-height: 100vh;
}

.news-section {
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(260px, 1fr));
  gap: 1.5rem;
}

.news-card {
  display: flex;
  flex-direction: column;
  padding: 1.8rem;
  border-radius: @card-radius;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid @border-light;
  box-shadow: @shadow-light;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  height: 100%;
}

.news-cover {
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 4 / 3;
  border-radius: 18px;
  margin-bottom: 1rem;
}

.news-card:hover {
  transform: translateY(-6px);
  box-shadow: @shadow-hover;
}

.news-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.news-tag {
  display: inline-flex;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  color: #2563eb;
  font-size: 0.85rem;
  font-weight: 700;
}

.news-date {
  color: #94a3b8;
  font-size: 0.92rem;
}

.news-card h3 {
  margin: 0 0 0.85rem;
  color: #0f172a;
  font-size: 1.25rem;
  line-height: 1.6;
  height: 4.8rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.news-card p {
  margin: 0 0 1rem;
  line-height: 1.8;
  height: 5.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: #475569;
}

.news-link {
  margin-top: auto;
  color: #0f172a;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  align-self: flex-start;
}

.news-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, @primary-gradient-start, @primary-gradient-end);
  transition: width 0.3s ease;
}

.news-link:hover::after {
  width: 100%;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

.pagination-btn,
.pagination-num {
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e1;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.pagination-ellipsis {
  padding: 0 0.5rem;
  color: #64748b;
  user-select: none;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn:hover:not(:disabled),
.pagination-num:hover {
  background: #eef2ff;
  border-color: @primary-gradient-start;
}

.pagination-num.active {
  background: @primary-gradient-start;
  color: white;
  border-color: @primary-gradient-start;
}

.pagination-pages {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

@media (max-width: 980px) {
  .news-grid {
    grid-template-columns: repeat(2, minmax(260px, 1fr));
  }
}

@media (max-width: 700px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
  .pagination-pages {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>