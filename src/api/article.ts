import request from '../utils/request';

// 文章类型定义（TS 必加）
export interface Article {
  title: string;
  content?: string;
}

// 获取公共信息
export const getPublicInfo = () => {
  return request({
    url: '/public-info?populate=*',
    method: 'GET',
  });
};

// 提交联系表单
export const submitContactForm = (data: {
  name: string;
  email: string;
  message: string;
  other: string;
}) => {
  return request({
    url: '/submit-forms',
    method: 'POST',
    data: { data },
  });
};

//获取关于我们

export const getAboutUsInfos = () => {
  return request({
    url: '/about-info?populate=*',
    method: 'GET',
  });
};


//获取关于我们轮播图
export const getAboutUsCarousel = () => {
  return request({
    url: '/about-carousels?populate=*',
    method: 'GET',
  });
};

// 获取行业新闻（带 type 筛选 + 分页 + 图片）
// 获取行业新闻（Strapi 专用：自动过滤空筛选条件）
export const getIndustryNews = (params: {
  type?: string;          // 可选，不传或空字符串时不添加 filter
  page: number;
  pageSize: number;
}) => {
  const queryParams: Record<string, any> = {
    'pagination[page]': params.page,
    'pagination[pageSize]': params.pageSize,
    'populate': '*',
  };

  // 只有 type 存在且非空字符串时才添加过滤条件
  if (params.type && params.type.trim() !== '') {
    queryParams['filters[type][$eq]'] = params.type;
  }

  return request({
    url: '/news-centers',
    method: 'GET',
    params: queryParams,
  });
};