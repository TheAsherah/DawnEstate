"use client";

import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import {
  addToCart,
  increaseQty,
  decreaseQty,
} from "@/redux/slices/cartSlice";

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();

  // Get item from cart
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product._id)
  );

  const handleAdd = () => {
    dispatch(
      addToCart({
        id: product._id,
        title: product.title,
        price: product.discountPrice || product.price,
        image: product.mainImage?.url,
        slug: product.slug,
      })
    );
  };

  const increase = () => dispatch(increaseQty(product._id));
  const decrease = () => dispatch(decreaseQty(product._id));

  /* ================= UI ================= */
  if (cartItem) {
    return (
      <div className="w-full bg-gray-100 rounded-xl p-4 flex items-center justify-between">
        
        {/* Minus */}
        <button
          onClick={decrease}
          className="w-12 h-12 rounded-full bg-white border
            flex items-center justify-center hover:bg-gray-50"
        >
          <Minus />
        </button>

        {/* Quantity */}
        <div className="text-center">
          <div className="text-xl font-bold">
            {cartItem.quantity} Liter
          </div>
          <div className="text-sm text-gray-500">
            In your cart
          </div>
        </div>

        {/* Plus */}
        <button
          onClick={increase}
          className="w-12 h-12 rounded-full bg-[#FF6B35] text-white
            flex items-center justify-center hover:bg-[#e65a1f]"
        >
          <Plus />
        </button>
      </div>
    );
  }

  /* ================= Add To Cart Button ================= */
  return (
    <button
      onClick={handleAdd}
      disabled={product.stock !== "in_stock"}
      className="w-full bg-[#FF6B35] disabled:opacity-50 disabled:cursor-not-allowed
        text-white py-4 px-8 rounded-xl font-bold text-lg
        shadow-lg shadow-orange-200 hover:bg-[#e65a1f]
        transition-all flex items-center justify-center gap-3"
    >
      <ShoppingCart size={20} />
      Add 1 Liter to Cart
    </button>
  );
}
