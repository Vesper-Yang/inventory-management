"use client";

import Header from "@/app/(components)/Header";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Rating from "../(components)/Rating";
import CreateProductModal from "./CreateProductModal";
import { UpdateProductModal } from "./UpdateProductModal";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type Product = {
  productId: string;
  name: string;
  price: number;
  stockQuantity: number;
  rating?: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductsQuery(searchTerm);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 创建产品（添加一个新产品，api.ts）
  const [createProduct] = useCreateProductMutation();

  // 点击 Create 创建按钮触发的
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  // 删除产品
  const [deleteProduct] = useDeleteProductMutation();

  // 删除处理的函数
  const handleDeleteProduct = async (productId: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        await deleteProduct(productId);
      }
    } catch (error) {
      console.error("删除产品时出错:", error);
    }
  };

  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleUpdateProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsUpdateFormOpen(true);
  };

  if (isLoading) {
    return <div className="py-4">Loading</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                image
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
              <div className="flex gap-3 flex-row items-center justify-center">
                <button
                  className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleUpdateProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteProduct(product.productId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL：需要在主界面是因为它是从主界面弹出来的，但具体的表单内容分离到单独组件 */}
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProduct}
      />

      {isUpdateFormOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <UpdateProductModal
              product={selectedProduct}
              onClose={() => setIsUpdateFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
