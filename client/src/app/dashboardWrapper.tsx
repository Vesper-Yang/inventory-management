"use client";

import React, { useEffect } from "react";
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";

// 2. 内层组件 - 使用 Redux 数据
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // 从 Redux 存储中获取数据(index.ts创建、管理了这些状态，而这里就是使用这些状态的地方)
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // useEffect：在组件加载后执行一些操作
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  return (
    // light：tailwind.config.ts里设置的明暗模式
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

// 1. 外层组件 - 提供 Redux 环境
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    // <StoreProvider> 连接Redux
    // <DashboardLayout> 使用 Redux 数据的组件
    <StoreProvider>
      <DashboardLayout> {children} </DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
