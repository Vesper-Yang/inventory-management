import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// 1. 删除数据库中现有的所有数据
async function deleteAllData(orderedFileNames: string[]) {
  // 把文件名转换成模型名
  // 例如："products.json" -> "Products"
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  // 清空每个模型的数据
  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    if (model) {
      await model.deleteMany({}); // 删除该模型的所有数据
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

// 2. 主函数
async function main() {
  // 指定数据文件的位置
  const dataDirectory = path.join(__dirname, "seedData");

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
  await deleteAllData(orderedFileNames);

  // 遍历每个文件
  for (const fileName of orderedFileNames) {
    // 读取 JSON 文件
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    // 获取对应的数据库模型
    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    // 将数据插入数据库
    for (const data of jsonData) {
      await model.create({
        data,
      });
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

// 3. 运行主函数
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect(); // 断开数据库连接
  });
