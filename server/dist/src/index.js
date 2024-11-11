"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 导入需要的包
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
/* ROUTE IMPORTS */
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
/* CONFIGURATIONS */
// 配置环境变量
dotenv_1.default.config();
// 创建 Express 应用
const app = (0, express_1.default)();
// 中间件配置：在请求到达后端之前处理请求，负责解析、验证和记录等任务，通过中间件检查后，进入路由处理
app.use(express_1.default.json()); // 处理 JSON 请求
app.use((0, helmet_1.default)()); // 安全防护
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" })); // 允许跨源
app.use((0, morgan_1.default)("common")); // 日志记录
app.use(body_parser_1.default.json()); // 解析 JSON
app.use(body_parser_1.default.urlencoded({ extended: false })); // 解析URL编码
app.use((0, cors_1.default)()); // 允许跨域
/* ROUTES */
// 定义路由, 告诉服务器：当访问 /dashboard 时, 使用 dashboardRoutes 处理
app.use("/dashboard", dashboardRoutes_1.default); // http://localhost:8000/dashboard
app.use("/products", productRoutes_1.default); // http://localhost:8000/products
/* SERVER */
// 启动服务器, port是后端服务器的端口, 在.env里指定的PORT=8000
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});
