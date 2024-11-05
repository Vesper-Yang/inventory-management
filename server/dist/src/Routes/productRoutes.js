"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
// 创建路由器
const router = (0, express_1.Router)();
// 当访问 /products 时，调用 getProducts 函数
router.get("/", productController_1.getProducts);
// 当创建新产品时，调用 createProduct 函数
router.post("/", productController_1.createProduct);
exports.default = router;
