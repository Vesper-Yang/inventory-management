// 这个文件用来处理与后端服务器的所有通信

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 这些接口定义是在描述从后端接收的数据结构
export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummarId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const api = createApi({
  // 设置基础URL，指向后端服务器，对应.env.local http://localhost:8000
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  // 这个名字会在 redux.tsx 中用到，redux持久化存储它的状态
  reducerPath: "api",
  // 用于缓存管理的标签
  tagTypes: ["DashboardMetrics"],
  // 具体的API调用
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
  }),
});

// 自动生成的hooks
export const { useGetDashboardMetricsQuery } = api;
