import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController";

// 创建路由器
const router = Router();

// 前端发送GET请求到/products时，后端调用getProducts函数获取所有产品
router.get("/", getProducts);

// 前端发送POST请求到/products时，后端调用createProduct创建一个新产品
router.post("/", createProduct);

// 前端发送DELETE请求到/products时，后端调用deleteProduct函数删除此产品
router.delete("/", deleteProduct);

// 前端发送PUT请求到/products时，后端调用updateProduct函数更新此产品
router.put("/", updateProduct);

export default router;
