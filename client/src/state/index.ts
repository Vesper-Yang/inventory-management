// 负责 侧边栏展开/收起 和 明暗主题 的切换逻辑（使用redux/toolkit）

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

// 设置初始状态（默认值）
const initialState: InitialStateTypes = {
  isSidebarCollapsed: false, // 侧边栏展开
  isDarkMode: false, // 浅色模式
};

// 创建一个全局的状态切片
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // 定义改变侧边栏状态的方法
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    // 定义改变主题模式的方法
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

// actions的导出是给界面组件用的，用来修改状态（action用来操作）
export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions;

// // reducer的导出是给 redux 用的，用来保存状态（reducer用来存储）
export default globalSlice.reducer;

/*
如果项目中没有使用 Redux 或者不需要全局状态管理，那么这个 index.ts 文件就不是必需的。

组件使用 actions 来发出"我要改变状态"的指令，redux 使用 reducer 来实际存储和管理这些状态。

*/
