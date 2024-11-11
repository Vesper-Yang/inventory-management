// Routes 定义访问路径（用什么URL访问）
import { Router } from "express";
import { getDashboardMetrics } from "../controllers/dashboardController";

// 创建路由器
const router = Router();

// 当访问 /dashboard 时，调用 getDashboardMetrics 函数
router.get("/", getDashboardMetrics);

export default router;
