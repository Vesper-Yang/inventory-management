import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController";

// 创建路由器
const router = Router();

// 当访问 /products 时，调用 getProducts 函数
router.get("/", getProducts);
// 当创建新产品时，调用 createProduct 函数
router.post("/", createProduct);
// 当删除产品时，调用 deleteProduct 函数
router.delete("/", deleteProduct);

export default router;
