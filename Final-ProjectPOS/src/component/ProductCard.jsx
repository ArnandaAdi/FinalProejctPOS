import { useDispatch, useSelector } from "react-redux";
import { addToOrder } from "../features/productSlice";
import { formatCurrency } from "../utils/FormatCurrency";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.products.order);

  const orderItem = order.find((item) => item.id === product.id);
  const quantityInOrder = orderItem ? orderItem.quantity : 0;

  const isProductInOrder = quantityInOrder > 0;

  const handleAddToOrder = () => {
    dispatch(addToOrder(product.id));
  };

  return (
    <div
      className={`border p-4 rounded-lg bg-white ${
        isProductInOrder ? "border-blue-300" : ""
      }`}
      onClick={handleAddToOrder}
      style={{ cursor: "pointer" }}
    >
      <div className="relative">
        {isProductInOrder && (
          <div className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
            {quantityInOrder}
          </div>
        )}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover mb-2 rounded-lg"
          style={{ maxHeight: "180px" }}
        />
      </div>
      <h4 className="text-lg font-semibold text-center text-gray-900">
        {product.title}
      </h4>
      <p className="text-gray-700 text-center text-xl font-bold">
        {formatCurrency(product.price)}
      </p>
    </div>
  );
};

export default ProductCard;
