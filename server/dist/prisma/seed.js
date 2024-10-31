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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
// 1. 删除数据库中现有的所有数据
function deleteAllData(orderedFileNames) {
    return __awaiter(this, void 0, void 0, function* () {
        // 把文件名转换成模型名
        // 例如："products.json" -> "Products"
        const modelNames = orderedFileNames.map((fileName) => {
            const modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
            return modelName.charAt(0).toUpperCase() + modelName.slice(1);
        });
        // 清空每个模型的数据
        for (const modelName of modelNames) {
            const model = prisma[modelName];
            if (model) {
                yield model.deleteMany({}); // 删除该模型的所有数据
                console.log(`Cleared data from ${modelName}`);
            }
            else {
                console.error(`Model ${modelName} not found. Please ensure the model name is correctly specified.`);
            }
        }
    });
}
// 2. 主函数
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 指定数据文件的位置
        const dataDirectory = path_1.default.join(__dirname, "seedData");
        // 需要处理的文件列表（按顺序，文件的顺序很重要，有产品才有销售，有销售才有销售总结）
        const orderedFileNames = [
            "products.json",
            "expenseSummary.json",
            "sales.json",
            "salesSummary.json",
            "purchases.json",
            "purchaseSummary.json",
            "users.json",
            "expenses.json",
            "expenseByCategory.json",
        ];
        // 先清空现有数据
        yield deleteAllData(orderedFileNames);
        // 遍历每个文件
        for (const fileName of orderedFileNames) {
            // 读取 JSON 文件
            const filePath = path_1.default.join(dataDirectory, fileName);
            const jsonData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
            const modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
            const model = prisma[modelName];
            // 获取对应的数据库模型
            if (!model) {
                console.error(`No Prisma model matches the file name: ${fileName}`);
                continue;
            }
            // 将数据插入数据库
            for (const data of jsonData) {
                yield model.create({
                    data,
                });
            }
            console.log(`Seeded ${modelName} with data from ${fileName}`);
        }
    });
}
// 3. 运行主函数
main()
    .catch((e) => {
    console.error(e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect(); // 断开数据库连接
}));
