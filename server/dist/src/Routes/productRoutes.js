"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
// 创建路由器
const router = (0, express_1.Router)();
// 前端发送GET请求到/products时，后端调用getProducts函数获取所有产品
router.get("/", productController_1.getProducts);
// 前端发送POST请求到/products时，后端调用createProduct创建一个新产品
router.post("/", productController_1.createProduct);
// 前端发送DELETE请求到/products时，后端调用deleteProduct函数删除此产品
router.delete("/", productController_1.deleteProduct);
// 前端发送PUT请求到/products时，后端调用updateProduct函数更新此产品
router.put("/", productController_1.updateProduct);
exports.default = router;
