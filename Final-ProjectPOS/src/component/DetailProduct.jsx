import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/FormatCurrency";

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/pos/api/detailproduct/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    fetchDetailProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 font-sans">
      <h2 className="text-xl font-bold mb-4">Detail Produk</h2>
      <div className="flex justify-between items-start border border-gray-300 p-5 rounded-lg">
        <div>
          <p className="mb-2">
            <strong>ID Produk:</strong> {product.id}
          </p>
          <p className="mb-2">
            <strong>Nama Produk:</strong> {product.title}
          </p>
          <p className="mb-2">
            <strong>Harga Satuan:</strong> {formatCurrency(product.price)}{" "}
          </p>
          <p className="mb-2">
            <strong>URL Gambar:</strong> {product.image}
          </p>
          <p className="mb-2">
            <strong>ID Kategori:</strong> {product.category_id}
          </p>
          <p className="mb-2">
            <strong>Nama Kategori:</strong> {product.category_name}
          </p>
        </div>
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="max-w-xs h-auto"
          />
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-5 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        KEMBALI
      </button>
    </div>
  );
};

export default DetailProduct;
