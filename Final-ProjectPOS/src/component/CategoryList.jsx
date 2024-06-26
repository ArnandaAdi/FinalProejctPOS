import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../features/productSlice";

const CategoryList = ({ selectedCategory, setSelectedCategory }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const categoryStatus = useSelector((state) => state.products.status);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/pos/api/listcategory"
        );
        const data = await response.json();
        dispatch(setCategories(data));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (categoryStatus === "idle") {
      fetchCategories();
    }
  }, [categoryStatus, dispatch]);

  return (
    <div className="category-list flex justify-around mt-4">
      <button
        onClick={() => setSelectedCategory(0)}
        className={`py-2 px-4 ${
          selectedCategory === 0 ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Semua
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`py-2 px-4 ${
            selectedCategory === category.id
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
