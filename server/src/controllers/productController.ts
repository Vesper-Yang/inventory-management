import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      orderBy: { createdAt: "desc" }, // 改为降序，最新创建的在列表最前面,
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body;
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating products" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // 从前端api.ts的params查询参数获取产品ID
    const { id } = req.query;
    if (!id) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }
    await prisma.products.delete({
      where: {
        productId: id.toString(),
      },
    });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.query; // 从前端api.ts的params查询参数获取产品ID
    const { name, price, rating, stockQuantity } = req.body; // 从请求体获取更新数据

    if (!id) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    const updatedProduct = await prisma.products.update({
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
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};
