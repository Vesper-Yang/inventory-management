"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Routes 定义访问路径（用什么URL访问）
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
// 创建路由器
const router = (0, express_1.Router)();
// 当访问 /dashboard 时，调用 getDashboardMetrics 函数
router.get("/", dashboardController_1.getDashboardMetrics);
exports.default = router;
