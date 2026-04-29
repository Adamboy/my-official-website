// 通用响应结构
export interface StrapiResponse<T> {
  data: T;
  meta: any;
}

// 单条数据包装
export interface StrapiItem<T> {
  id: number;
  attributes: T;
}

// 新闻
export interface News {
  title: string;
  content: string;
  coverImage?: {
    data: {
      attributes: {
        url: string;
        formats?: any;
      };
    } | null;
  };
  publishDate: string;
}

// 产品
export interface Product {
  name: string;
  description: string;
  gallery?: {
    data: Array<{
      attributes: { url: string };
    }>;
  };
}

// 留言提交参数
export interface MessageInput {
  name: string;
  email: string;
  content: string;
}