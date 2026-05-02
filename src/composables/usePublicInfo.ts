import { ref, readonly } from 'vue'
import { getPublicInfo } from '../api/article'

// 公共信息数据类型定义
export interface PublicInfo {
  companyName?: string
  phone?: string
  email?: string
  address?: string
  wechatQrCode?: string
  douyinQrCode?: string
  serviceHotline?: string
  socialMedia?: {
    wechat?: string
    douyin?: string
    [key: string]: string | undefined
  }
  [key: string]: any
}

// 全局状态
const publicInfo = ref<PublicInfo | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// 获取公共信息
export const usePublicInfo = () => {
  const fetchPublicInfo = async () => {
    
    if (publicInfo.value) {
      return publicInfo.value // 已有数据，直接返回
    }
    
    loading.value = true
    error.value = null
    
    try {
      const response = await getPublicInfo()
      // 处理 Strapi 响应结构
      let attributes = null
      
      if (response.data) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          // 数组形式: { data: [{ id: 1, attributes: {} }] }
          attributes = response.data[0].attributes
        } else if (response.data.attributes) {
          // 单个对象形式: { data: { id: 1, attributes: {} } }
          attributes = response.data.attributes
        } else if (response.data.companyName || response.data.phone) {
          // 直接返回属性: { companyName: '', phone: '' }
          attributes = response.data
        }
      }
      
      if (attributes) {
        publicInfo.value = {
          companyName: attributes.companyName,
          phone: attributes.phone,
          email: attributes.email,
          address: attributes.address,
          // 处理图片URL - 直接从对象获取url字段
          wechatQrCode: attributes.wechatQrCode?.url,
          douyinQrCode: attributes.douyinQrCode?.url,
          serviceHotline: attributes.serviceHotline,
          socialMedia: attributes.socialMedia
        }
      }
      
      return publicInfo.value
    } catch (err) {
      error.value = '获取公共信息失败，请检查网络连接或稍后重试'
      console.error('获取公共信息失败:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // 重置状态（用于重新加载数据）
  const reset = () => {
    publicInfo.value = null
    loading.value = false
    error.value = null
  }

  return {
    publicInfo: readonly(publicInfo),
    loading: readonly(loading),
    error: readonly(error),
    fetchPublicInfo,
    reset
  }
}