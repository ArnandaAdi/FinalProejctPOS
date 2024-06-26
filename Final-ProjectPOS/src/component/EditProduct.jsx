import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/pos/api/detailproduct/${id}`
        );
        const product = response.data;
        setName(product.title);
        setCategoryId(product.category_id);
        setCategoryName(product.category_name);
        setPrice(product.price);
        setImageUrl(product.image);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/pos/api/listcategory"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/pos/api/updateproduct/${id}`, {
        title: name,
        category_id: categoryId,
        price,
        image: imageUrl,
      });
    } catch (error) {
      console.error("Error updating product:", error.response.data);
    }
  };

  return (
    <div className="p-5 font-sans">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleEditProduct} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Category:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Edit Product
        </button>
      </form>
      <button
        onClick={() => navigate(-1)}
        className="mt-5 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        &lt; KEMBALI
      </button>
    </div>
  );
};

export default ProductEdit;
