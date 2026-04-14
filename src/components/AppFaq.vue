<template>
  <section ref="rootRef" class="faq-section">
    <div class="faq-header">
      <span class="faq-tag fade-in">常见疑问</span>
      <h2 class="fade-in">你的问题，我们提前准备好答案</h2>
      <p class="fade-in">覆盖应用场景、施工流程、技术保障、售后服务等核心疑问，让客户更快速放心决策。</p>
    </div>

    <div class="faq-list">
      <article
        v-for="(item, idx) in faqs"
        :key="item.id"
        :class="['faq-card', { 'is-visible': visibleCards[idx], 'faq-card-right': idx % 2 !== 0 }]"
        :data-index="idx"
      >
        <div class="faq-title">
          <div>
            <h3>{{ item.question }}</h3>
            <p>{{ item.category }}</p>
          </div>
        </div>
        <p class="faq-answer">{{ item.answer }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

type FAQItem = {
  id: number
  category: string
  question: string
  answer: string
}

const faqs = ref<FAQItem[]>([
  {
    id: 1,
    category: '价格透明',
    question: '空中吊运的收费标准是怎么样的？',
    answer: '我们采用透明的计价模式。基础费用包含起步价（按机型和载重区分），加上里程费和作业难度费（如超高层、夜间作业）。您在发布需求时，系统会根据算法预估价格，拒绝漫天要价。'
  },
  {
    id: 2,
    category: '技术保障',
    question: '如何保证起吊过程中的安全性？',
    answer: '我们采用多重安全保护装置，包含过载保护、限位开关、钢丝绳检测以及专业监控，所有操作人员均持证上岗。'
  },
  {
    id: 3,
    category: '服务流程',
    question: '从咨询到施工一般需要多久？',
    answer: '标准项目可在1-3天内完成方案制定与现场评估，施工周期根据项目规模而定，通常1-2天可完成小型作业。'
  },
  {
    id: 4,
    category: '售后保障',
    question: '售后服务包含哪些内容？',
    answer: '我们提供施工期间全程保障、设备维护建议和定期回访，出现问题可快速响应并派专员现场处理。'
  }
])

const rootRef = ref<HTMLElement | null>(null)
const visibleCards = ref<boolean[]>(faqs.value.map(() => false))
let observer: IntersectionObserver | null = null

const revealCards = (): void => {
  const cards = rootRef.value?.querySelectorAll<HTMLElement>('.faq-card') ?? []
  if (!observer) {
    visibleCards.value = visibleCards.value.map(() => true)
    return
  }

  cards.forEach((card) => {
    observer?.observe(card)
  })
}

onMounted(() => {
  nextTick(() => {
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return
            }
            const index = Number(entry.target.getAttribute('data-index'))
            if (!Number.isNaN(index)) {
              visibleCards.value[index] = true
            }
            observer?.unobserve(entry.target)
          })
        },
        {
          threshold: 0.2
        }
      )
      revealCards()
    } else {
      visibleCards.value = visibleCards.value.map(() => true)
    }
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

</script>

<style lang="less" scoped>
.faq-section {
  padding: 3rem 1.5rem;
  background: #f7fbff;
  color: #0f172a;
}

.faq-header {
  max-width: 960px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.faq-tag {
  display: inline-block;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  color: #2563eb;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.faq-header h2 {
  margin: 1rem 0 0.75rem;
  font-size: clamp(2rem, 2.5vw, 2.8rem);
  line-height: 1.05;
}

.faq-header p {
  margin: 0 auto;
  max-width: 760px;
  color: #475569;
  line-height: 1.8;
}

.fade-in {
  opacity: 0;
  transform: translateY(24px);
  animation: fade-in-up 0.8s ease forwards;
}

.faq-card.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.faq-header .fade-in:nth-child(1) {
  animation-delay: 0.15s;
}

.faq-header .fade-in:nth-child(2) {
  animation-delay: 0.25s;
}

.faq-header .fade-in:nth-child(3) {
  animation-delay: 0.35s;
}

@keyframes fade-in-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq-list {
  max-width: 980px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
}

.faq-card {
  padding: 1.5rem 1.4rem;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid rgba(59, 130, 246, 0.14);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.05);
  opacity: 0;
  transform: translateX(-28px);
  transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.25s ease;
}

.faq-card.faq-card-right {
  transform: translateX(28px);
}

.faq-card.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.faq-card.is-visible:hover {
  transform: translateX(0) translateY(-4px);
  border-color: rgba(59, 130, 246, 0.28);
}

.faq-title {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  align-items: flex-start;
}

.faq-title h3 {
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.5;
}

.faq-title p {
  margin: 0.45rem 0 0;
  color: #60a5fa;
  font-size: 0.95rem;
}

.faq-answer {
  margin: 1.25rem 0 0;
  color: #475569;
  line-height: 1.8;
}

</style>