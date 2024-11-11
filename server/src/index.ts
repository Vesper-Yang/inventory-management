// 导入需要的包
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

/* ROUTE IMPORTS */
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";

/* CONFIGURATIONS */
// 配置环境变量
dotenv.config();

// 创建 Express 应用
const app = express();

// 中间件配置：在请求到达后端之前处理请求，负责解析、验证和记录等任务，通过中间件检查后，进入路由处理
app.use(express.json()); // 处理 JSON 请求
app.use(helmet()); // 安全防护
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // 允许跨源
app.use(morgan("common")); // 日志记录
app.use(bodyParser.json()); // 解析 JSON
app.use(bodyParser.urlencoded({ extended: false })); // 解析URL编码
app.use(cors()); // 允许跨域

/* ROUTES */
// 定义路由, 告诉服务器：当访问 /dashboard 时, 使用 dashboardRoutes 处理
app.use("/dashboard", dashboardRoutes); // http://localhost:8000/dashboard
app.use("/products", productRoutes); // http://localhost:8000/products

/* SERVER */
// 启动服务器, port是后端服务器的端口, 在.env里指定的PORT=8000
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
