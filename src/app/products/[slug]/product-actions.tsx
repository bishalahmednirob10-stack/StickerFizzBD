"use client";

import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/store";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product)}
      aria-label={`Add ${product.title} to cart`}
      className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#161412] px-6 text-sm font-black text-white transition hover:bg-[#e63b2e]"
    >
      <ShoppingBag size={18} />
      Add to cart
    </button>
  );
}
