import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [purchasedProductIds, setPurchasedProductIds] = useState(new Set());

  useEffect(() => {
    fetchProducts();
    fetchTransactionDetails();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/pos/api/listproduct"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchTransactionDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/pos/api/listtransaksidetail"
      );
      const transactionDetails = response.data;
      const productIds = new Set(
        transactionDetails.map((detail) => detail.product_id)
      );
      setPurchasedProductIds(productIds);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:8080/pos/api/deleteproduct/${productId}`
      );
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const canDelete = (productId) => {
    return !purchasedProductIds.has(productId);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">List Product</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Product Id</th>
            <th className="py-2 px-4 border-b text-center">Product Name</th>
            <th className="py-2 px-4 border-b text-center">Price</th>
            <th className="py-2 px-4 border-b text-center">Category</th>
            <th className="py-2 px-4 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.title}</td>
              <td className="py-2 px-4 border-b text-center">
                {formatCurrency(product.price)}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product.category_name}
              </td>
              <td className="py-2 px-4 border-b space-x-2 text-center">
                <Link
                  to={`/product/detail/${product.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Detail
                </Link>
                <Link
                  to={`/product/edit/${product.id}`}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  Edit
                </Link>
                {canDelete(product.id) && (
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        to="/product/add"
        className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Product
      </Link>
    </div>
  );
};

export default ListProduct;
