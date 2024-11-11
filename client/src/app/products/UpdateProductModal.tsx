import { useUpdateProductMutation } from "@/state/api";
import { useState } from "react";
import Header from "../(components)/Header";
Header;

useUpdateProductMutation;
interface UpdateProductFormProps {
  product: {
    productId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
  };
  onClose: () => void;
}

export const UpdateProductModal = ({
  product,
  onClose,
}: UpdateProductFormProps) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    rating: product.rating,
    stockQuantity: product.stockQuantity,
  });

  const [updateProduct] = useUpdateProductMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct({
        id: product.productId,
        data: formData,
      });
      onClose(); // 关闭表单
    } catch (error) {
      console.error("更新产品时出错:", error);
    }
  };

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Update Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            className={inputCssStyles}
            required
          />

          {/* PRICE */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            value={formData.price}
            className={inputCssStyles}
            required
          />

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            onChange={(e) =>
              setFormData({
                ...formData,
                stockQuantity: Number(e.target.value),
              })
            }
            value={formData.stockQuantity}
            className={inputCssStyles}
            required
          />

          {/* RATING */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            onChange={(e) =>
              setFormData({ ...formData, rating: Number(e.target.value) })
            }
            value={formData.rating}
            className={inputCssStyles}
            required
          />

          {/* UPDATE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
