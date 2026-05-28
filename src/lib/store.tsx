"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "./products";

export type CartItem = {
  id: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, variant?: string) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function cartKey(id: string, variant?: string) {
  return `${id}:${variant ?? "default"}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedCart = window.localStorage.getItem("stickerfizz-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    window.localStorage.setItem("stickerfizz-cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product, variant?: string) => {
      setItems((current) => {
        const key = cartKey(product.id, variant);
        const existing = current.find(
          (item) => cartKey(item.id, item.variant) === key,
        );

        if (existing) {
          return current.map((item) =>
            cartKey(item.id, item.variant) === key
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }

        return [
          ...current,
          {
            id: product.id,
            title: product.title,
            slug: product.slug,
            image: product.image,
            price: product.price,
            quantity: 1,
            variant,
          },
        ];
      });
    };

    const removeItem = (id: string, variant?: string) => {
      setItems((current) =>
        current.filter(
          (item) => cartKey(item.id, item.variant) !== cartKey(id, variant),
        ),
      );
    };

    const updateQuantity = (id: string, quantity: number, variant?: string) => {
      if (quantity < 1) {
        removeItem(id, variant);
        return;
      }

      setItems((current) =>
        current.map((item) =>
          cartKey(item.id, item.variant) === cartKey(id, variant)
            ? { ...item, quantity }
            : item,
        ),
      );
    };

    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart: () => setItems([]),
      count,
      subtotal,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
