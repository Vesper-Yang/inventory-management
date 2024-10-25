// 这个文件用来处理与后端服务器的所有通信

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  // 设置基础URL，指向后端服务器，对应.env.local http://localhost:8000
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  // 这个名字会在 redux.tsx 中用到，redux持久化存储它的状态
  reducerPath: "api",
  // 用于缓存管理的标签
  tagTypes: [],
  // 后续会添加具体的API调用
  endpoints: (build) => ({}),
});

// 自动生成的hooks
export const {} = api;
