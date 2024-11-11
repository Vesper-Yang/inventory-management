"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.createProduct = exports.getProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString();
        const products = yield prisma.products.findMany({
            where: {
                name: {
                    contains: search,
                },
            },
            orderBy: { createdAt: "desc" }, // 改为降序，最新创建的在列表最前面,
        });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving products" });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, name, price, rating, stockQuantity } = req.body;
        const product = yield prisma.products.create({
            data: {
                productId,
                name,
                price,
                rating,
                stockQuantity,
            },
        });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating products" });
    }
});
exports.createProduct = createProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 从前端api.ts的params查询参数获取产品ID
        const { id } = req.query;
        if (!id) {
            res.status(400).json({ message: "Product ID is required" });
            return;
        }
        yield prisma.products.delete({
            where: {
                productId: id.toString(),
            },
        });
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query; // 从前端api.ts的params查询参数获取产品ID
        const { name, price, rating, stockQuantity } = req.body; // 从请求体获取更新数据
        if (!id) {
            res.status(400).json({ message: "Product ID is required" });
            return;
        }
        const updatedProduct = yield prisma.products.update({
            where: {
                productId: id.toString(),
            },
            data: {
                name,
                price,
                rating,
                stockQuantity,
            },
        });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating product" });
    }
});
exports.updateProduct = updateProduct;
